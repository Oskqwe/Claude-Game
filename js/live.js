/* The Member — "your own move": the player types an action, Claude writes the outcome live.
   Works only where the page can reach Claude (the claude.ai artifact, through the `sample`
   capability). Anywhere else, TM.Live.ready stays false and the box never appears.
   The engine stays in charge: it rolls the hidden dice, caps every score change, decides death,
   and records any branch of history the move opens. */
(function () {
  'use strict';
  const TM = window.TM;
  const Live = (TM.Live = { ready: false, off: false, busy: false, sample: null });

  // Capability lookup resolves later (never during first run). Absent: the feature stays hidden.
  try {
    if (window.claude && typeof window.claude.use === 'function') {
      window.claude.use('sample').then((fn) => {
        if (!fn) return;
        Live.sample = fn;
        Live.ready = true;
        if (TM.state && TM.state.phase === 'scene' && !TM.state.pending && TM.render) TM.render();
      }, () => {});
    }
  } catch (e) { /* no runtime: nothing to do */ }

  // Scenes where a typed move makes sense: ordinary scenes, not lunches, Question Time or walks.
  Live.PER_ACT = 3; // owner's limit: three typed moves per act
  Live.left = (s) => Live.PER_ACT - (((s && s.liveUsed) || {})[s && s.act] || 0);
  Live.offered = (sc, s) => Live.ready && !Live.off && sc && !sc.kind && Live.left(s || TM.state) > 0;

  const STAT_KEYS = { capital: 'cap', seat: 'seat', favour: 'fav', press: 'press', reputation: 'rep', money: 'money', health: 'health' };
  const AXIS_KEYS = ['order', 'empire', 'state', 'steel', 'loyalty', 'temper'];
  const LIMITS = { stat: 6, axis: 3, nation: 5 };
  const DEATH = { none: 0, low: 0.02, high: 0.06, mortal: 0.15 };

  const clampInt = (v, lim) => Math.max(-lim, Math.min(lim, Math.round(+v || 0)));
  function effectString(obj) {
    if (!obj || typeof obj !== 'object') return '';
    const out = [];
    for (const [k, v] of Object.entries(obj)) {
      let tok = null, n;
      if (STAT_KEYS[k]) { n = clampInt(v, LIMITS.stat); tok = STAT_KEYS[k]; }
      else if (AXIS_KEYS.includes(k)) { n = clampInt(v, LIMITS.axis); tok = k; }
      else if (k === 'war' || k === 'reform') { n = clampInt(v, LIMITS.nation); tok = k; }
      if (tok && n) out.push(tok + (n > 0 ? '+' : '') + n);
    }
    return out.join(' ');
  }
  const clip = (t, n) => String(t || '').replace(/\s+/g, ' ').trim().slice(0, n);

  function prompt(s, sc, move) {
    const offered = (sc.choices || []).map((c) => '- ' + TM.fill(c.label, s)).join('\n');
    const recent = s.log.slice(-6).map((l) => `${l.year}: ${l.title}: ${l.label}`).join('\n');
    const forks = (s.forks || []).map((f) => {
      const d = (TM.FORKS && TM.FORKS[f.id]) || (s.liveForks || {})[f.id];
      return d ? `${f.year}: ${d.title}. ${TM.fill(d.history, s)}` : '';
    }).filter(Boolean).join('\n');
    const echoes = (TM.ECHO || []).map(([a, b]) => `${b} -> ${a}`).join('; ');
    return `You are the narrator of "The Member", a serious historical strategy game about a British politician's life, ${s.born}–1951. The player has ignored the offered choices and typed their own move. Write what happens.

RULES
- Second person, plain period-flavoured English, sober and specific. No anachronisms.
- Never use the real name of any British politician, minister or official. Use these echo names: ${echoes}. For anyone else British in public life, invent a similar-sounding echo name. Foreign leaders, generals, admirals, writers and royalty keep their real names.
- Never invent a quotation and attribute it to a real person. Paraphrase.
- Great external events (wars, invasions, crashes, elections on their real dates) still happen. One person cannot stop them alone, though a bold move can bend how Britain responds.
- Hard subjects are written soberly, with real costs.
- If the move is impossible for this character, write the attempt and how it fails.
- If the move is reckless or rogue enough to take this life off its historical course for good, set "fork" and write the alternate history it opens. Otherwise "fork" is null.

THE CHARACTER
${s.first} ${s.last}, aged ${s.year - s.born}, ${s.office && s.office !== 'None' ? s.office : 'no office'}${s.flags.includes('mp') ? ', a Member of Parliament' : ', not in Parliament'}.
Standing (0–100): ${Object.entries(s.stats).map(([k, v]) => k + ' ' + v).join(', ')}.
Convictions (−10 to 10): ${Object.entries(s.axes).map(([k, v]) => k + ' ' + v).join(', ')}.
Traits: ${s.traits.join(', ') || 'none'}.
Recent choices:
${recent || '(none yet)'}
${forks ? 'History has already bent in this life:\n' + forks : ''}

THE SCENE (${s.year}): ${sc.title}, at ${sc.venue ? sc.venue.label : 'an unnamed place'}
${TM.fill(sc.text, s)}
The choices offered were:
${offered}

THE PLAYER'S OWN MOVE
"${move}"

Answer with JSON only, in this shape:
{
  "risk": "none" | "low" | "high" | "mortal",
  "roll": null or {"stat": "capital"|"seat"|"favour"|"press"|"reputation"|"money"|"health", "difficulty": 20 to 80},
  "result": "60 to 90 words: what happens (if there is a roll, what happens when it goes well)",
  "result_fail": "60 to 90 words: what happens when the roll goes badly, or empty if no roll",
  "effects": {"capital": -6..6, "favour": ..., "press": ..., "reputation": ..., "money": ..., "health": ..., "seat": ..., "order": -3..3, "empire": ..., "state": ..., "steel": ..., "loyalty": ..., "temper": ..., "war": -5..5, "reform": ...},
  "effects_fail": { same keys, for a bad roll },
  "diary": "one first-person diary line, under 20 words",
  "death": "if risk is high or mortal: one sentence on how the character died, in the second person, with their age",
  "fork": null or {"title": "under 8 words", "history": "60 to 90 words: how history runs differently from here, as a historian would summarise it"}
}
Include only the effects that change. Keep numbers small; most moves change two to four scores.`;
  }

  // Resolve a typed move. Calls back with an error message for the player, or null on success.
  Live.choose = async function (s, move, done) {
    const sc = TM.scene(s);
    move = clip(move, 240);
    if (!move || !Live.offered(sc, s) || Live.busy) return done('');
    Live.busy = true;
    let r;
    try {
      r = await Live.sample.json(prompt(s, sc, move), { modelTier: 'default', cache: false });
    } catch (e) {
      Live.busy = false;
      const code = e && e.code;
      if (code === 'not_granted') { Live.off = true; return done('Claude is switched off for this page, so only the written choices are available.'); }
      if (code === 'rate_limited') return done('Claude is busy. Try again in a minute, or take one of the written choices.');
      if (code === 'cancelled') return done('');
      return done('Claude could not write that move just now. Take one of the written choices, or try again.');
    }
    Live.busy = false;
    if (!r || typeof r !== 'object' || !r.result) return done('Claude\'s answer could not be read. Try again, or take one of the written choices.');
    if (TM.state !== s || TM.scene(s) !== sc || s.pending) return done('');

    s.liveUsed = s.liveUsed || {};
    s.liveUsed[s.act] = (s.liveUsed[s.act] || 0) + 1;
    // Apply it through the engine, with every number capped.
    const delta = TM.applyEffects(s, effectString(r.effects));
    let result = clip(r.result, 900), passed = null;
    if (r.roll && STAT_KEYS[r.roll.stat]) {
      const diff = Math.max(20, Math.min(80, Math.round(+r.roll.difficulty || 50)));
      passed = TM.roll(s, r.roll.stat, diff);
      if (!passed) {
        TM.applyEffects(s, effectString(r.effects_fail), delta);
        if (r.result_fail) result = clip(r.result_fail, 900);
      }
    }
    let forkId = null;
    if (r.fork && r.fork.title && r.fork.history) {
      forkId = 'live-' + ((s.forks || []).length + 1);
      s.liveForks = s.liveForks || {};
      s.liveForks[forkId] = { title: clip(r.fork.title, 80), history: clip(r.fork.history, 900), live: true,
        real: 'Written live from your own move. Nothing like this is in the record; see the scene\'s own note below for what really happened.' };
      s.forks = (s.forks || []).concat({ id: forkId, year: s.year });
      if (!s.flags.includes('live-fork')) s.flags.push('live-fork');
    }
    const chance = DEATH[r.risk] || 0;
    let died = chance > 0 && TM.deathRoll(s, chance);
    if (s.stats.health <= 0) died = true;
    const diary = clip(r.diary, 160);
    if (diary) s.diary.push({ year: s.year, text: diary });
    s.log.push({ scene: sc.id, course: null, title: sc.title, year: s.year, label: move, result,
      historical: false, passed, fork: forkId, live: true });
    const docs = [];
    if (died) {
      s.dead = true;
      s.death = { year: s.year, age: s.year - s.born, text: clip(r.death, 300) || 'Your own move was your last.', scene: sc.title };
      s.diary.push({ year: s.year, text: '(The diary ends here.)' });
      s.papers.push(Object.assign(TM.obituary(s, { headline: 'Death of Mr {first} {last}' }), { id: 'p' + (s.papers.length + 1), year: s.year, scene: sc.id }));
      docs.push('p' + s.papers.length);
      for (const k of Object.keys(s.papers[s.papers.length - 1])) if (typeof s.papers[s.papers.length - 1][k] === 'string') s.papers[s.papers.length - 1][k] = TM.fill(s.papers[s.papers.length - 1][k], s);
    }
    s.lastDelta = delta;
    s.pending = { result, docs, goto: null, died, end: false, fork: forkId, live: true };
    TM.save();
    done(null);
  };

  Live.forkDef = (s, id) => (TM.FORKS && TM.FORKS[id]) || (s.liveForks || {})[id] || null;
})();
