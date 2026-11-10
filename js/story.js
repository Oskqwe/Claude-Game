/* The Member — story runner.
   Walks a camp's act, resolves choices (with hidden dice and mortality),
   runs multi-course lunches, files period documents, and ends the act or the life. */
(function () {
  'use strict';
  const TM = window.TM;

  TM.act = function (s) {
    s = s || TM.state;
    const camp = TM.ACTS[s.camp];
    return camp ? camp[s.act] : null;
  };
  TM.scene = function (s) {
    s = s || TM.state;
    const act = TM.act(s);
    return act ? act.scenes.find((x) => x.id === s.sceneId) : null;
  };

  function firstEligible(s, scenes, from) {
    for (let i = from; i < scenes.length; i++) {
      if (TM.check(s, scenes[i].if)) return scenes[i];
    }
    return null;
  }

  TM.startAct = function (s, actNo) {
    const act = TM.ACTS[s.camp][actNo];
    s.act = actNo;
    s.course = 0;
    s.pending = null;
    if (act.start) {
      TM.applyEffects(s, act.start.effects);
      if (act.start.rel) {
        for (const [k, r] of Object.entries(act.start.rel)) {
          s.rel[k] = { score: r.score, status: TM.fill(r.status, s), name: r.name, role: r.role };
        }
      }
      if (act.start.year) s.year = act.start.year;
      if (act.start.born) s.born = act.start.born;
    }
    const first = firstEligible(s, act.scenes, 0);
    s.sceneId = first ? first.id : null;
    if (first && first.year) s.year = first.year;
    if (first && first.onEnter) TM.applyEffects(s, first.onEnter);
    if (first && first.doc) fileDoc(s, first.doc, first);
    s.phase = 'intro';
  };

  // Scenes played in several rounds: lunches (courses) and Question Time (questions).
  TM.isMulti = (sc) => !!sc && (sc.kind === 'lunch' || sc.kind === 'qt');

  // The choices a player sees for the current scene or lunch course.
  TM.choices = function (s) {
    s = s || TM.state;
    const sc = TM.scene(s);
    if (!sc) return [];
    const list = TM.isMulti(sc) ? sc.courses[s.course].choices : sc.choices;
    return list
      .map((c, i) => ({ c, i, ok: TM.check(s, c.requires) }))
      .filter((x) => x.ok || x.c.showLocked);
  };

  function fileDoc(s, doc, sc) {
    if (!doc) return null;
    const d = JSON.parse(JSON.stringify(doc));
    for (const k of Object.keys(d)) if (typeof d[k] === 'string') d[k] = TM.fill(d[k], s);
    d.id = 'p' + (s.papers.length + 1);
    d.year = d.year || s.year;
    d.scene = sc ? sc.id : null;
    s.papers.push(d);
    return d.id;
  }

  // Resolve a choice. Returns nothing; the outcome is held in s.pending so a reload shows it again.
  TM.choose = function (s, index) {
    const sc = TM.scene(s);
    const list = TM.isMulti(sc) ? sc.courses[s.course].choices : sc.choices;
    // index -1: the clock ran out on a quick-fire question (Question Time).
    const c = index === -1
      ? Object.assign({ label: 'Lost for words', effects: 'cap-2 press-2 rep-1', result: 'You hesitate a moment too long. The House notices, and the Speaker moves on.' }, sc.timeout, sc.courses[s.course].timeout)
      : list[index];
    if (!c || !TM.check(s, c.requires)) return;

    const delta = TM.applyEffects(s, c.effects);
    TM.applyStatus(s, c.status);
    let result = c.result || '';
    let diary = c.diary || '';
    const docs = [];
    let gotoId = c.goto || null;
    let passed = null;

    if (c.roll) {
      passed = TM.roll(s, c.roll.stat, c.roll.diff);
      const o = passed ? c.roll.pass : c.roll.fail;
      if (o) {
        TM.applyEffects(s, o.effects, delta);
        TM.applyStatus(s, o.status);
        result = [result, o.result].filter(Boolean).join(' ');
        if (o.diary) diary = o.diary;
        if (o.doc) docs.push(fileDoc(s, o.doc, sc));
        if (o.goto) gotoId = o.goto;
      }
    }
    if (c.doc) docs.push(fileDoc(s, c.doc, sc));

    let died = false;
    if (c.death && TM.deathRoll(s, c.death.chance)) died = true;
    if (s.stats.health <= 0) died = true;

    if (diary) s.diary.push({ year: s.year, text: TM.fill(diary, s) });
    s.log.push({
      scene: sc.id,
      course: TM.isMulti(sc) ? sc.courses[s.course].course : null,
      title: sc.title,
      year: s.year,
      label: TM.fill(c.label, s),
      result: TM.fill(result, s),
      historical: !!c.historical,
      passed,
    });

    if (died) {
      const dt = (c.death && c.death.text) || 'Your health, long abused, gives out.';
      s.dead = true;
      s.death = { year: s.year, age: s.year - s.born, text: TM.fill(dt, s), scene: sc.title };
      s.diary.push({ year: s.year, text: '(The diary ends here.)' });
      docs.push(fileDoc(s, TM.obituary(s, c.death), sc));
    }

    s.lastDelta = delta;
    s.pending = { result: TM.fill(result, s), docs: docs.filter(Boolean), goto: gotoId, died, end: !!c.end };
    TM.save();
  };

  // Move on after the player has read an outcome.
  TM.advance = function (s) {
    const p = s.pending;
    s.pending = null;
    s.lastDelta = null;
    if (!p) return;
    if (p.died) { s.phase = 'dead'; TM.save(); return; }
    const sc = TM.scene(s);
    const act = TM.act(s);

    if (TM.isMulti(sc) && !p.goto && !p.end && s.course < sc.courses.length - 1) {
      s.course++;
      TM.save();
      return;
    }
    s.course = 0;
    let next = null;
    if (p.end) next = null;
    else if (p.goto) {
      const i = act.scenes.findIndex((x) => x.id === p.goto);
      next = i >= 0 ? firstEligible(s, act.scenes, i) : null;
    } else {
      const i = act.scenes.findIndex((x) => x.id === sc.id);
      next = firstEligible(s, act.scenes, i + 1);
    }
    if (next) {
      if (act.regen) s.stats.health = Math.min(100, s.stats.health + act.regen);
      s.sceneId = next.id;
      if (next.year && next.year > s.year) s.year = next.year;
      if (next.onEnter) TM.applyEffects(s, next.onEnter);
      if (next.doc) fileDoc(s, next.doc, next);
      s.phase = 'scene';
    } else {
      s.sceneId = null;
      s.phase = 'actEnd';
    }
    TM.save();
  };

  TM.obituary = function (s, death) {
    const age = s.year - s.born;
    return {
      type: 'paper',
      masthead: 'The Daily Courier',
      date: String(s.year),
      headline: (death && death.headline) || 'Death of Mr {first} {last}',
      standfirst: 'A career that had scarcely begun. Aged ' + age + '.',
      body: (death && death.obit) || '{first} {last}, whose name was beginning to be known, died this week. ' +
        'Those who knew him spoke of a restless spirit who never waited to be asked. His friends say he was certain he would one day sit in the House.',
    };
  };
})();
