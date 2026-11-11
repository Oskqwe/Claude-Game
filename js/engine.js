/* The Member — core engine.
   State, effects parser, conditions, hidden dice, mortality, save and resume.
   Classic script (no modules) so index.html runs straight from disk. */
(function () {
  'use strict';
  const TM = (window.TM = window.TM || {});

  const AXES = ['order', 'empire', 'state', 'steel', 'loyalty', 'temper'];
  const STATS = ['capital', 'seat', 'favour', 'press', 'reputation', 'money', 'health'];
  const NATION = ['war', 'reform'];
  const ALIAS = {
    cap: 'capital', fav: 'favour', rep: 'reputation', hp: 'health',
    capital: 'capital', seat: 'seat', favour: 'favour', press: 'press',
    reputation: 'reputation', money: 'money', health: 'health',
  };
  const SAVE_KEY = 'the-member.save.v1';

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  TM.clamp = clamp;
  TM.AXES = AXES;
  TM.STATS = STATS;

  /* ---------- State ---------- */

  TM.newState = function (first, last) {
    const s = {
      v: 1,
      first: first || 'John',
      last: last || 'Doe',
      camp: null,
      act: 0,
      sceneId: null,
      course: 0,
      year: 1874,
      born: 1874,
      axes: Object.fromEntries(AXES.map((a) => [a, 0])),
      axesQuiz: null,
      stats: { capital: 5, seat: 0, favour: 10, press: 10, reputation: 20, money: 50, health: 60 },
      office: 'None',
      nation: { war: 50, reform: 30 },
      rel: {},
      traits: [],
      flags: [],
      diary: [],
      log: [],
      papers: [],
      forks: [],
      dead: false,
      death: null,
      ended: false,
      lastDelta: null,
    };
    return s;
  };

  /* ---------- Text templating ---------- */

  TM.fill = function (str, s) {
    if (!str) return '';
    s = s || TM.state;
    return String(str)
      .replace(/\{first\}/g, s ? s.first : '')
      .replace(/\{last\}/g, s ? s.last : '')
      .replace(/\{full\}/g, s ? s.first + ' ' + s.last : '')
      .replace(/\{age\}/g, s ? String(s.year - s.born) : '')
      // Life-specific words a route sets with set:key=Value (e.g. {seat}, {borough}, {wife}),
      // falling back to the camp's defaults in TM.VARDEF.
      .replace(/\{(\w+)\}/g, (all, k) => {
        const v = (s && s.vars && s.vars[k]) || (s && TM.VARDEF && TM.VARDEF[s.camp] && TM.VARDEF[s.camp][k]);
        return v == null ? all : v;
      });
  };

  /* ---------- Reading values ---------- */

  // Returns a 0–100 style number for dice, or a raw value for conditions.
  TM.value = function (s, key, forDice) {
    if (key[0] === '@') {
      const r = s.rel[key.slice(1)];
      const v = r ? r.score : 0;
      return forDice ? (v + 100) / 2 : v;
    }
    if (ALIAS[key]) return s.stats[ALIAS[key]];
    if (AXES.includes(key)) return forDice ? s.axes[key] * 5 + 50 : s.axes[key];
    if (NATION.includes(key)) return s.nation[key];
    if (key === 'age') return s.year - s.born;
    if (key === 'year') return s.year;
    return 0;
  };

  /* ---------- Effects ----------
     Compact string, space separated:
       cap+5 seat-3 rep+2 money-10 health-5   standing stats (0–100)
       order+2 steel-1                         convictions (−10…+10)
       war+3 reform-2                          nation meters
       @woom+10                                relationship (−100…+100)
       #trench-veteran   -#shy                 add / remove trait
       !crossed-floor    -!crossed-floor       set / clear flag
       office=Second_Lieutenant                office (underscores become spaces; {vars} filled)
       set:seat=Sheffield_Hillsborough         a life-specific word, read in text as {seat}
       year=1895                               move the calendar
  */
  TM.applyEffects = function (s, str, delta) {
    delta = delta || { stats: {}, axes: {}, nation: {}, rel: {}, traits: [], lost: [], office: null };
    if (!str) return delta;
    const tokens = String(str).trim().split(/\s+/);
    for (const tok of tokens) {
      let m;
      if ((m = tok.match(/^-#(.+)$/))) {
        const i = s.traits.indexOf(m[1]);
        if (i >= 0) { s.traits.splice(i, 1); delta.lost.push(m[1]); }
      } else if ((m = tok.match(/^#(.+)$/))) {
        if (!s.traits.includes(m[1])) { s.traits.push(m[1]); delta.traits.push(m[1]); }
      } else if ((m = tok.match(/^-!(.+)$/))) {
        s.flags = s.flags.filter((f) => f !== m[1]);
      } else if ((m = tok.match(/^!(.+)$/))) {
        if (!s.flags.includes(m[1])) s.flags.push(m[1]);
      } else if ((m = tok.match(/^world=([\w-]+)$/))) {
        // History bends around the character, who stays on the record (e.g. the Peace of 1940).
        s.forks = s.forks || [];
        if (!s.forks.some((f) => f.id === m[1])) { s.forks.push({ id: m[1], year: s.year, world: true }); delta.fork = m[1]; }
        if (!s.flags.includes('fork-' + m[1])) s.flags.push('fork-' + m[1]);
      } else if ((m = tok.match(/^fork=([\w-]+)$/))) {
        // A rogue choice: the life leaves recorded history. Recorded once; marks the life off the map.
        s.forks = s.forks || [];
        if (!s.forks.some((f) => f.id === m[1])) {
          s.forks.push({ id: m[1], year: s.year });
          delta.fork = m[1];
        }
        for (const f of ['offmap', 'fork-' + m[1]]) if (!s.flags.includes(f)) s.flags.push(f);
      } else if ((m = tok.match(/^set:(\w+)=(.+)$/))) {
        s.vars = s.vars || {};
        s.vars[m[1]] = m[2].replace(/_/g, ' ');
      } else if ((m = tok.match(/^office=(.+)$/))) {
        s.office = TM.fill(m[1].replace(/_/g, ' '), s);
        delta.office = s.office;
      } else if ((m = tok.match(/^year=(\d{4})$/))) {
        s.year = +m[1];
      } else if ((m = tok.match(/^@([\w-]+)([+-]\d+)$/))) {
        const k = m[1], n = +m[2];
        if (!s.rel[k]) s.rel[k] = { score: 0, status: '' };
        s.rel[k].score = clamp(s.rel[k].score + n, -100, 100);
        delta.rel[k] = (delta.rel[k] || 0) + n;
      } else if ((m = tok.match(/^([a-z]+)([+-]\d+)$/))) {
        const k = m[1], n = +m[2];
        if (ALIAS[k]) {
          const key = ALIAS[k];
          s.stats[key] = clamp(s.stats[key] + n, 0, 100);
          delta.stats[key] = (delta.stats[key] || 0) + n;
        } else if (AXES.includes(k)) {
          s.axes[k] = clamp(s.axes[k] + n, -10, 10);
          delta.axes[k] = (delta.axes[k] || 0) + n;
        } else if (NATION.includes(k)) {
          s.nation[k] = clamp(s.nation[k] + n, 0, 100);
          delta.nation[k] = (delta.nation[k] || 0) + n;
        } else console.warn('Unknown effect key', tok);
      } else console.warn('Unparsed effect', tok);
    }
    // Winning a seat brings an off-record life back onto the record.
    if (s.flags.includes('offmap') && s.flags.includes('mp')) {
      s.flags = s.flags.filter((f) => f !== 'offmap');
      if (!s.flags.includes('returned')) s.flags.push('returned');
    }
    return delta;
  };

  TM.applyStatus = function (s, status) {
    if (!status) return;
    for (const [k, v] of Object.entries(status)) {
      if (!s.rel[k]) s.rel[k] = { score: 0, status: '' };
      s.rel[k].status = TM.fill(v, s);
    }
  };

  /* ---------- Conditions ----------
     Space separated terms, all must hold. A term may be "a|b" (either).
       #trait  ~#trait  !flag  ~!flag  health>30  @woom>=20  order<0  age>=20
  */
  function term(s, t) {
    let neg = false;
    if (t[0] === '~') { neg = true; t = t.slice(1); }
    let ok;
    let m;
    if (t[0] === '#') ok = s.traits.includes(t.slice(1));
    else if (t[0] === '!') ok = s.flags.includes(t.slice(1));
    else if ((m = t.match(/^(@?[\w-]+)(>=|<=|>|<|=)(-?\d+)$/))) {
      const v = TM.value(s, m[1], false), n = +m[3];
      ok = m[2] === '>=' ? v >= n : m[2] === '<=' ? v <= n : m[2] === '>' ? v > n : m[2] === '<' ? v < n : v === n;
    } else if (t === 'camp:' + s.camp) ok = true;
    else ok = false;
    return neg ? !ok : ok;
  }
  TM.check = function (s, cond) {
    if (!cond) return true;
    return String(cond).trim().split(/\s+/).every((part) => part.split('|').some((t) => term(s, t)));
  };

  /* ---------- Hidden dice ----------
     Chance = clamp((stat − difficulty + 50) / 100, 5%, 95%). Never shown. */
  TM.chance = function (s, stat, diff) {
    return clamp((TM.value(s, stat, true) - diff + 50) / 100, 0.05, 0.95);
  };
  TM.roll = function (s, stat, diff) {
    return Math.random() < TM.chance(s, stat, diff);
  };
  // Mortality: base chance scaled up when health is poor.
  TM.DEATH_SCALE = 1.35;
  TM.deathRoll = function (s, chance) {
    const h = s.stats.health;
    // DEATH_SCALE tunes the whole game toward DESIGN §1: roughly one life in three or four ends before 1951.
    const p = clamp(chance * TM.DEATH_SCALE * (1 + (50 - h) / 100), 0, 0.9);
    return Math.random() < p;
  };

  /* ---------- Camps ---------- */

  TM.distance = function (a, b) {
    return Math.sqrt(AXES.reduce((t, k) => t + Math.pow((a[k] || 0) - (b[k] || 0), 2), 0));
  };
  TM.rankCamps = function (axes) {
    return TM.CAMPS.map((c) => ({ camp: c, d: TM.distance(axes, c.vector) })).sort((x, y) => x.d - y.d);
  };
  TM.campById = (id) => TM.CAMPS.find((c) => c.id === id);
  // True when any quiz answer tagged in data/quiz.js (q.w) was chosen: a reading, never asked outright.
  TM.readsAsWoman = (answers) => TM.QUIZ.some((q, i) => q.w && answers && q.w.includes(answers[i]));

  /* ---------- Save and resume ---------- */

  TM.save = function () {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(TM.state)); } catch (e) { /* storage blocked */ }
  };
  TM.load = function () {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  };
  TM.clearSave = function () {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ }
  };
  // Portable save code, for moving a life between browsers.
  TM.exportCode = function () {
    return btoa(unescape(encodeURIComponent(JSON.stringify(TM.state))));
  };
  TM.importCode = function (code) {
    const s = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    if (!s || s.v !== 1) throw new Error('This is not a save code from The Member.');
    return s;
  };
})();
