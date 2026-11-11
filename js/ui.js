/* The Member — screens, dossier panel and documents. */
(function () {
  'use strict';
  const TM = window.TM;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const KEYS = ['a', 'b', 'c', 'd', 'e'];
  const ui = { quiz: null };

  /* ───────── Shell ───────── */

  function setSheet(html, solo) {
    const sheet = $('#sheet');
    sheet.innerHTML = html;
    sheet.classList.remove('sheet-enter'); void sheet.offsetWidth; sheet.classList.add('sheet-enter');
    $('#desk').classList.toggle('solo', !!solo);
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }
  function rail() {
    const s = TM.state;
    const meta = $('#rail-meta');
    const inLife = s && s.camp && s.act;
    $('#btn-diary').hidden = !inLife;
    $('#btn-papers').hidden = !inLife;
    $('#btn-file').hidden = !inLife;
    $('#btn-new').hidden = !s;
    meta.textContent = inLife ? `${TM.act(s).title.split('·')[0].trim()} · ${s.year} · aged ${s.year - s.born}` : '';
  }

  /* ───────── Documents ───────── */

  TM.renderDoc = function (d) {
    if (!d) return '';
    if (d.type === 'letter') return `<div class="doc letter"><div class="lh"><span>${esc(d.from)}</span><span>${esc(d.date)}</span></div><p>${esc(d.to)},</p><p style="margin-top:.5em">${esc(d.body)}</p><p class="sign">${esc(d.sign || '')}</p>${d.note ? `<p class="note">${esc(d.note)}</p>` : ''}</div>`;
    if (d.type === 'telegram') return `<div class="doc telegram"><div class="th"><span>Post Office Telegraphs</span><span>From ${esc(d.from)}</span><span>${esc(d.date)}</span></div><div class="th" style="border:0;margin:0"><span>To ${esc(d.to)}</span></div><div class="tb">${esc(d.body)}</div></div>`;
    if (d.type === 'paper') return `<div class="doc paper"><div class="mast">${esc(d.masthead || 'The Daily Courier')}</div><div class="dl"><span>London</span><span>${esc(d.date || '')}</span><span>One Penny</span></div><div class="hl">${esc(d.headline)}</div>${d.standfirst ? `<div class="sf">${esc(d.standfirst)}</div>` : ''}<div class="bd">${esc(d.body)}</div></div>`;
    if (d.type === 'division') {
      const list = (a) => (a || []).map(esc).join(', ');
      return `<div class="doc paper"><div class="dl"><span>Hansard</span><span>${esc(d.date || '')}</span><span>Division No. ${esc(d.no || '')}</span></div><div class="sf">${esc(d.motion)}</div><p><b>Ayes ${esc(d.ayes)}</b> · <b>Noes ${esc(d.noes)}</b></p>${d.rebels ? `<p class="note">Voting against the Whip: ${list(d.rebels)}</p>` : ''}${d.tellers ? `<p class="note">Tellers: ${list(d.tellers)}</p>` : ''}</div>`;
    }
    return '';
  };
  const paperById = (id) => TM.state.papers.find((p) => p.id === id);

  /* ───────── Dossier ───────── */

  function deltaChip(n) {
    if (!n) return '';
    return `<span class="delta ${n > 0 ? 'up' : 'down'}">${n > 0 ? '+' : ''}${n}</span>`;
  }
  const STAT_LABEL = { capital: 'Capital', seat: 'Seat', favour: 'Favour', press: 'Press', reputation: 'Reputation', money: 'Money', health: 'Health' };

  TM.renderDossier = function () {
    const s = TM.state;
    const box = $('#dossier');
    if (!s || !s.camp) { box.innerHTML = ''; return; }
    const d = s.lastDelta || { stats: {}, axes: {}, nation: {}, rel: {}, traits: [] };
    const camp = TM.campById(s.camp);
    const ranked = TM.rankCamps(s.axes);
    const now = ranked[0].camp;

    const meters = TM.STATS.map((k) => `<div class="meter ${k === 'health' ? 'health' : k === 'reputation' ? 'rep' : ''}"><span>${STAT_LABEL[k]}</span><span class="track"><span class="fill" style="width:${s.stats[k]}%"></span></span><span class="num">${s.stats[k]}${deltaChip(d.stats[k])}</span></div>`).join('');

    const axes = TM.AXES.map((k) => {
      const v = s.axes[k], q = s.axesQuiz ? s.axesQuiz[k] : v;
      return `<div class="d-ax" title="${esc(TM.AXIS_INFO[k].low)} ↔ ${esc(TM.AXIS_INFO[k].high)}"><span>${TM.AXIS_INFO[k].name}</span><span class="track"><span class="ghost" style="left:${(q + 10) * 5}%"></span><span class="dot" style="left:${(v + 10) * 5}%"></span></span><span class="num">${v > 0 ? '+' : ''}${v}${deltaChip(d.axes[k])}</span></div>`;
    }).join('');

    const rels = Object.entries(s.rel)
      .sort((a, b) => Math.abs(b[1].score) - Math.abs(a[1].score))
      .map(([k, r]) => {
        const p = (TM.PEOPLE && TM.PEOPLE[k]) || {};
        const name = TM.fill(r.name || p.name || k, s);
        const role = r.role || p.role || '';
        return `<div class="rel"><div class="rt"><span class="rn">${esc(name)}</span><span class="rv ${r.score >= 0 ? 'pos' : 'neg'}">${r.score > 0 ? '+' : ''}${r.score}${deltaChip(d.rel[k])}</span></div>${role ? `<div class="rs">${esc(role)}</div>` : ''}${r.status ? `<div class="rs"><i>${esc(r.status)}</i></div>` : ''}</div>`;
      }).join('') || '<div class="rs">No one of consequence yet.</div>';

    const tags = s.traits.map((t) => `<span class="tag ${d.traits.includes(t) ? 'new' : ''}">${esc(t.replace(/-/g, ' '))}</span>`).join('') || '<span class="rs">None yet.</span>';

    box.innerHTML = `
      <div class="who">${esc(s.first)} ${esc(s.last)}</div>
      <dl class="kv" style="margin:8px 0 0">
        <dt>Camp</dt><dd>${esc(camp.name)}</dd>
        <dt>Born</dt><dd>${s.born}</dd>
        <dt>Year</dt><dd>${s.year} (aged ${s.year - s.born})</dd>
        <dt>Office</dt><dd>${esc(s.office)}${d.office ? ' <span class="delta up">new</span>' : ''}</dd>
      </dl>
      <h5>Standing</h5>${meters}
      <h5>Convictions</h5>${axes}
      <div class="drift">${now.id === s.camp ? 'You are still true to type.' : `You now most resemble <b>${esc(now.name)}</b>.`} <span class="rs">Ring: where the quiz placed you.</span></div>
      <h5>Connections</h5>${rels}
      <h5>Traits</h5><div class="tags">${tags}</div>
      <h5>The Nation</h5>
      <div class="meter"><span>War</span><span class="track"><span class="fill" style="width:${s.nation.war}%"></span></span><span class="num">${s.nation.war}${deltaChip(d.nation.war)}</span></div>
      <div class="meter"><span>Reform</span><span class="track"><span class="fill" style="width:${s.nation.reform}%"></span></span><span class="num">${s.nation.reform}${deltaChip(d.nation.reform)}</span></div>
      ${s.diary.length ? `<h5>Last entry</h5><div class="drift">${esc(s.diary[s.diary.length - 1].text)}</div>` : ''}`;
  };

  /* ───────── Title ───────── */

  function title() {
    const saved = TM.load();
    TM.state = null;
    rail();
    setSheet(`
      <div class="title-page">
        ${TM.plate('embankment', 'The Embankment by night, Westminster')}
        <p class="eyebrow">A life in politics · 1874 to 1951</p>
        <h1>The Member</h1>
        <p class="sub">Live a whole political life, from the nursery to the despatch box, and bend history as you go.</p>
        <div class="ornament">❦</div>
        <form class="name-form" id="name-form">
          <div class="field"><label for="first">Christian name</label><input id="first" name="first" autocomplete="off" required maxlength="20" value="Edward"></div>
          <div class="field"><label for="last">Surname</label><input id="last" name="last" autocomplete="off" required maxlength="24" value="Ashcombe"></div>
          <button class="btn" type="submit">Begin a life</button>
        </form>
        ${saved && saved.camp && !saved.ended ? `<p class="muted">Or carry on as <b>${esc(saved.first)} ${esc(saved.last)}</b>, ${saved.year}. <button class="btn ghost" id="btn-continue" type="button">Continue</button></p>` : ''}
        <details style="max-width:520px;width:100%"><summary class="muted" style="cursor:pointer">Bring a life from another browser</summary>
          <div class="field" style="margin-top:8px"><label for="import-code">Save code</label><textarea id="import-code" placeholder="Paste the code from 'Save code'"></textarea></div>
          <div class="row" style="margin-top:8px"><button class="btn ghost" id="btn-import" type="button">Load this life</button><span class="muted" id="import-msg"></span></div>
        </details>
      </div>`, true);
    $('#name-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const first = $('#first').value.trim() || 'Edward', last = $('#last').value.trim() || 'Ashcombe';
      TM.state = TM.newState(first, last);
      ui.quiz = { i: 0, answers: [] };
      quiz();
    });
    const c = $('#btn-continue');
    if (c) c.addEventListener('click', () => { TM.state = saved; render(); });
    $('#btn-import').addEventListener('click', () => {
      try { TM.state = TM.importCode($('#import-code').value); TM.save(); render(); }
      catch (err) { $('#import-msg').textContent = 'That code could not be read. Copy the whole code and try again.'; }
    });
  }

  /* ───────── Quiz ───────── */

  function quiz() {
    rail();
    const q = ui.quiz, item = TM.QUIZ[q.i];
    const ticks = TM.QUIZ.map((_, i) => `<span class="${i < q.i ? 'on' : i === q.i ? 'now' : ''}"></span>`).join('');
    setSheet(`
      <div class="stack">
        <div class="row" style="justify-content:space-between"><span class="eyebrow">The examination · Question ${q.i + 1} of ${TM.QUIZ.length}</span><span class="stamp">Confidential</span></div>
        <div class="ticks" aria-hidden="true">${ticks}</div>
        <h2>${esc(item.q)}</h2>
        <div class="choices">${item.a.map((o, i) => `<button class="choice" data-key="${KEYS[i]}" data-i="${i}">${esc(o[0])}</button>`).join('')}</div>
        <div class="row">${q.i > 0 ? '<button class="btn ghost" id="q-back" type="button">Back</button>' : ''}<span class="muted">Answer as yourself. There are no right answers, only kinds of politician.</span></div>
      </div>`, true);
    document.querySelectorAll('.choice').forEach((b) => b.addEventListener('click', () => {
      q.answers[q.i] = +b.dataset.i;
      if (q.i < TM.QUIZ.length - 1) { q.i++; quiz(); } else results();
    }));
    const back = $('#q-back');
    if (back) back.addEventListener('click', () => { q.i--; quiz(); });
  }

  function axesChart(axes) {
    return `<div class="axes">${TM.AXES.map((k) => {
      const i = TM.AXIS_INFO[k], v = axes[k];
      return `<div class="axis"><div class="name">${i.name}<b>${v > 0 ? '+' : ''}${v}</b></div><span class="lo">${esc(i.low)}</span><span class="bar"><span class="mark" style="left:${(v + 10) * 5}%"></span></span><span class="hi">${esc(i.high)}</span></div>`;
    }).join('')}</div>`;
  }

  function results() {
    const axes = TM.scoreQuiz(ui.quiz.answers);
    const ranked = TM.rankCamps(axes);
    const best = ranked[0].camp;
    const nearestBuilt = ranked.find((r) => r.camp.built).camp;
    let pick = nearestBuilt.id;
    const top = ranked.slice(0, 3).map((r, i) => `<div class="p"><span class="n">${i + 1}</span><span class="t">${esc(r.camp.name)} ${r.camp.built ? '' : '<span class="pill no">In preparation</span>'}</span><span class="d">distance ${r.d.toFixed(1)}</span><span class="w">${esc(TM.why(axes, r.camp))}</span></div>`).join('');
    const cards = () => ranked.map((r, i) => `<button class="camp ${r.camp.id === pick ? 'sel' : ''}" data-id="${r.camp.id}" ${r.camp.built ? '' : 'disabled'}>
        <span class="badge">${r.camp.built ? '<span class="pill ok">Playable</span>' : '<span class="pill no">In preparation</span>'}</span>
        <span class="pill rank" style="align-self:flex-start">No. ${i + 1}</span>
        <span class="cname">${esc(r.camp.name)}</span><span class="cline">${esc(r.camp.line)}</span>
        <span class="cfig">${r.camp.figures.map(esc).join(' · ')}</span><span class="cfig">History bends: ${esc(r.camp.divergence)}</span></button>`).join('');
    setSheet(`
      <div class="stack">
        <span class="eyebrow">Report of the examiners</span>
        <h2>${esc(TM.state.first)} ${esc(TM.state.last)}, you are by temperament <i>${esc(best.name)}</i>.</h2>
        ${axesChart(axes)}
        <hr class="rule">
        <h3>The three nearest camps</h3>
        <div class="podium">${top}</div>
        ${best.built ? '' : `<p class="prose muted">${esc(best.name)} is still being written. The nearest life you can play today is <b>${esc(nearestBuilt.name)}</b>. Every camp will open in time.</p>`}
        <hr class="rule">
        <h3>Choose your life</h3>
        <p class="muted">The examiners recommend; you decide. Pick any camp that is ready to play.</p>
        <div class="camps" id="camps">${cards()}</div>
        <div class="row"><button class="btn" id="go">Live this life</button><button class="btn ghost" id="redo">Retake the examination</button></div>
      </div>`, true);
    const wire = () => document.querySelectorAll('.camp').forEach((b) => b.addEventListener('click', () => { pick = b.dataset.id; $('#camps').innerHTML = cards(); wire(); }));
    wire();
    $('#redo').addEventListener('click', () => { ui.quiz = { i: 0, answers: [] }; quiz(); });
    $('#go').addEventListener('click', () => {
      const s = TM.state;
      s.camp = pick;
      s.axes = Object.assign({}, axes);
      s.axesQuiz = Object.assign({}, axes);
      TM.startAct(s, 1);
      TM.save();
      render();
    });
  }

  /* ───────── Act intro ───────── */

  function actIntro() {
    const s = TM.state, act = TM.act(s), sc = TM.scene(s);
    setSheet(`
      <div class="stack">
        ${TM.plate(sc ? sc.venue.plate : 'city', '')}
        <span class="eyebrow">${esc(TM.campById(s.camp).name)} · ${esc(act.span)}</span>
        <h1>${esc(act.title)}</h1>
        <div class="prose"><p class="drop">${esc(TM.fill(act.intro, s))}</p></div>
        <div class="row"><button class="btn" id="begin">Begin</button></div>
      </div>`);
    $('#begin').addEventListener('click', () => { s.phase = 'scene'; TM.save(); render(); });
  }

  /* ───────── Scene, lunch and outcome ───────── */

  function sceneHead(sc, s) {
    return `${TM.plate(sc.venue.plate, sc.venue.label)}
      <div class="scene-head"><span class="year">${s.year}</span><h2>${esc(sc.title)}</h2></div>`;
  }

  function lunchCard(sc, s) {
    const menu = sc.menu || sc.courses.map((c) => c.course);
    return `<div class="table-card">
      <div class="placecard"><h4>${sc.menu ? 'At table' : 'Present'}</h4><ul>${sc.guests.map((g) => `<li>${esc(TM.fill(g, s))}</li>`).join('')}<li>${esc(s.first)} ${esc(s.last)}</li></ul></div>
      <div class="menu"><h4>${sc.menu ? 'Menu' : 'Order of business'}</h4><ol>${menu.map((m, i) => `<li class="${i === s.course ? 'now' : i < s.course ? 'done' : ''}">${esc(m)}</li>`).join('')}</ol></div>
    </div>`;
  }

  // Question Time: one question at a time, against the clock.
  let qtTimer = null;
  function clearQt() { if (qtTimer) { clearTimeout(qtTimer); qtTimer = null; } }

  function qtCard(sc, s) {
    const q = sc.courses[s.course];
    const secs = q.seconds || sc.seconds || 15;
    return `<div class="qt">
        <div class="qt-top"><span class="qt-no">Question ${s.course + 1} of ${sc.courses.length}</span>
          <span class="qt-from">${esc(TM.fill(q.course, s))}</span></div>
        <ol class="qt-pips">${sc.courses.map((_, i) => `<li class="${i < s.course ? 'done' : i === s.course ? 'now' : ''}"></li>`).join('')}</ol>
        <p class="qt-q">${esc(TM.fill(q.text, s))}</p>
        <div class="qt-fuse" aria-hidden="true"><span style="animation-duration:${secs}s"></span></div>
        <p class="qt-hint muted">The House will not wait: ${secs} seconds.</p>
      </div>`;
  }

  // The House is called to order before the first question, so the clock never runs while you read.
  let qtCalled = null;
  function qtIntro(sc, s) {
    setSheet(`<div class="stack">${sceneHead(sc, s)}
      <div class="prose"><p class="drop">${esc(TM.fill(sc.text, s))}</p></div>
      <div class="table-card"><div class="placecard"><h4>In the Chamber</h4><ul>${(sc.guests || []).map((g) => `<li>${esc(TM.fill(g, s))}</li>`).join('')}<li>${esc(s.first)} ${esc(s.last)}</li></ul></div>
        <div class="menu"><h4>Order Paper</h4><ol>${sc.courses.map((c) => `<li>${esc(TM.fill(c.course, s))}</li>`).join('')}</ol></div></div>
      <p class="muted">${sc.courses.length} questions, one after another. Each has a clock; if it runs out, the House moves on without you.</p>
      <div class="row"><button class="btn" id="rise">Rise in your place</button></div></div>`);
    $('#rise').addEventListener('click', () => { qtCalled = s.sceneId; render(); });
  }

  // A walkable 3D place (kind 'lobby' or 'walk'): the page shows the setting, and the place
  // opens over everything. A companion (the first whose `if` holds) walks with you and brings
  // their own conversation beats.
  function lobbyScene(sc, s) {
    const people = (sc.npcs || []).filter((n) => TM.check(s, n.if));
    const spots = (sc.spots || []).filter((n) => TM.check(s, n.if));
    const mate = (sc.companions || []).find((c) => TM.check(s, c.if)) || null;
    const who = (mate ? [mate.name] : []).concat(people.map((n) => n.name));
    setSheet(`<div class="stack">${sceneHead(sc, s)}
      <div class="prose"><p class="drop">${esc(TM.fill(sc.text, s))}</p></div>
      <div class="lobby-gate"><div style="flex:1;min-width:200px"><span class="eyebrow">${mate ? 'Walking with you' : spots.length && !people.length ? 'Choose your place' : 'Here now'}</span>
        <p style="margin:4px 0 0">${who.length ? who.map(esc).join(', ') : spots.map((x) => esc(x.name)).join(' · ')}</p></div>
        <button class="btn" id="walk">${esc(sc.enter || 'Walk in')}</button></div>
      <p class="muted" style="font-size:.95rem">You walk your Member in 3D. On a computer use WASD or the arrow keys and drag to look round; on a phone use the thumb-stick. ${mate ? 'Follow the lit markers on the path, and your companion will talk as you go.' : 'Go up to anyone to talk to them, or tap a name.'}</p>
      <div class="row"><button class="btn ghost" id="pass">${esc(sc.skip || 'Pass by')}</button></div></div>`);
    const done = () => { TM.lobbyLeave(s, sc); render(); };
    $('#pass').addEventListener('click', done);
    $('#walk').addEventListener('click', () => TM.Walk.open({
      place: sc.place || 'lobby', title: sc.venue.label, leaveLabel: sc.leaveLabel || 'Leave',
      npcs: people, spots, companion: mate, beats: mate ? mate.beats : [],
      talked: s.lobbyTalked || [],
      onTalk: (it, i) => { const r = TM.lobbyTalk(s, sc, it, i); TM.renderDossier(); return r; },
      onLeave: done,
    }));
  }

  function scene() {
    clearQt();
    const s = TM.state, sc = TM.scene(s);
    const isLunch = sc.kind === 'lunch', isQt = sc.kind === 'qt';
    if (isQt && s.course === 0 && qtCalled !== s.sceneId) return qtIntro(sc, s);
    if (sc.kind === 'lobby' || sc.kind === 'walk') return lobbyScene(sc, s);
    const opts = TM.choices(s);
    const entryDoc = sc.doc && s.course === 0 ? TM.renderDoc(Object.fromEntries(Object.entries(sc.doc).map(([k, v]) => [k, typeof v === 'string' ? TM.fill(v, s) : v]))) : '';
    const body = isQt ? qtCard(sc, s) : isLunch
      ? `${s.course === 0 ? `<div class="prose"><p class="drop">${esc(TM.fill(sc.text, s))}</p></div>` : ''}${lunchCard(sc, s)}
         <p class="course-label">${esc(sc.courses[s.course].course)}</p><div class="prose"><p>${esc(TM.fill(sc.courses[s.course].text, s))}</p></div>`
      : `<div class="prose"><p class="drop">${esc(TM.fill(sc.text, s))}</p></div>${entryDoc}`;
    const choices = opts.map((o, n) => {
      const locked = !o.ok;
      const hint = locked ? `<span class="lock">Needs: ${esc(String(o.c.requires).replace(/[#!~]/g, '').replace(/-/g, ' '))}</span>` : '';
      return `<button class="choice" data-key="${KEYS[n]}" data-i="${o.i}" ${locked ? 'disabled' : ''}>${esc(TM.fill(o.c.label, s))}${hint}</button>`;
    }).join('');
    const own = TM.Live && TM.Live.offered(sc, s) ? `<details class="own-move"><summary>Or do something of your own</summary>
      <label class="muted" for="own-text">Write what you do, in a sentence or two. Claude writes what happens; the dice stay hidden. ${TM.Live.left(s)} of ${TM.Live.PER_ACT} left in this act.</label>
      <textarea id="own-text" maxlength="240" placeholder="For example: I ride to Downing Street and demand to see the Prime Minister tonight."></textarea>
      <div class="row"><button class="btn" id="own-go" type="button">Do it</button><span class="muted" id="own-msg"></span></div></details>` : '';
    setSheet(`<div class="stack">${sceneHead(sc, s)}${body}<div class="choices">${choices}</div>${own}</div>`);
    document.querySelectorAll('.choice:not([disabled])').forEach((b) => b.addEventListener('click', () => {
      if (TM.Live && TM.Live.busy) return;
      clearQt();
      TM.choose(s, +b.dataset.i);
      render();
    }));
    if (own) $('#own-go').addEventListener('click', () => {
      const t = $('#own-text').value.trim();
      if (!t || TM.Live.busy) return;
      $('#own-go').disabled = true; $('#own-text').disabled = true;
      $('#own-msg').textContent = 'Claude is writing what happens…';
      TM.Live.choose(s, t, (err) => {
        if (err === null) return render();
        const go = $('#own-go'), tx = $('#own-text'), msg = $('#own-msg');
        if (go) go.disabled = false; if (tx) tx.disabled = false;
        if (msg) msg.textContent = err || '';
        if (TM.Live.off) render();
      });
    });
    if (isQt) {
      const secs = sc.courses[s.course].seconds || sc.seconds || 15;
      const card = document.querySelector('.qt');
      if (card && card.getBoundingClientRect().top > innerHeight * 0.4) card.scrollIntoView({ block: 'start' });
      qtTimer = setTimeout(() => { qtTimer = null; if (TM.state === s && s.phase === 'scene' && !s.pending) { TM.choose(s, -1); render(); } }, secs * 1000);
    }
  }

  function outcome() {
    const s = TM.state, sc = TM.scene(s), p = s.pending;
    const lastDiary = s.diary.length ? s.diary[s.diary.length - (p.died ? 2 : 1)] : null;
    const docs = p.docs.map((id) => TM.renderDoc(paperById(id))).join('');
    clearQt();
    const isLunch = TM.isMulti(sc);
    const more = isLunch && !p.died && !p.goto && !p.end && s.course < sc.courses.length - 1;
    const label = p.died ? 'Read the notice' : more ? (sc.kind === 'qt' ? 'Next question' : sc.menu ? 'The next course' : 'Go on') : 'Continue';
    setSheet(`<div class="stack">${sceneHead(sc, s)}
      ${isLunch ? `<p class="course-label">${esc(sc.courses[s.course].course)}</p>` : ''}
      ${p.live ? '<p class="muted" style="font-size:.85rem">Your own move, written live by Claude. Not from the record.</p>' : ''}
      ${p.fork && TM.Live.forkDef(s, p.fork) ? `<div class="fork-note"><span class="stamp">History bends here</span><p>${esc(TM.Live.forkDef(s, p.fork).title)}. From this moment your life is no longer the one in the record books. The great events of the age will still come, but you will meet them from somewhere else.</p></div>` : ''}
      <div class="outcome prose"><p>${esc(p.result)}</p></div>
      ${docs}
      ${lastDiary && !p.died ? `<p class="diary-line">${esc(lastDiary.text)}</p>` : ''}
      <div class="row"><button class="btn" id="next">${label}</button></div></div>`);
    $('#next').addEventListener('click', () => { TM.advance(s); render(); });
  }

  /* ───────── Endings ───────── */

  function comparison(s) {
    const acts = Object.values(TM.ACTS[s.camp] || {});
    const rows = [];
    const seen = new Set();
    s.log.forEach((l) => {
      let sc = null;
      for (const a of acts) { sc = a.scenes.find((x) => x.id === l.scene); if (sc) break; }
      if (!sc) return;
      const first = !seen.has(sc.id); seen.add(sc.id);
      const facts = (sc.facts || []).map((f) => TM.FACTS[f]).filter(Boolean);
      const status = facts.some((f) => f.status === 'unchecked') ? 'unchecked' : facts.some((f) => f.status === 'conflicting') ? 'conflicting' : sc.check || 'research';
      const statusLabel = { unchecked: 'Not yet verified', conflicting: 'Sources disagree', corroborated: 'Checked: two sources', research: 'Source: Wikipedia' }[status] || status;
      rows.push(`<tr><td>${l.year}</td>
        <td><div class="lbl">${esc(sc.title)}${l.course ? ` · <i>${esc(l.course)}</i>` : ''}</div>${esc(l.label)} <span class="${l.historical ? 'tag-hist' : l.live ? 'tag-live' : 'tag-off'}">${l.historical ? 'as in history' : l.live ? (l.fork ? 'your own move · history bends here' : 'your own move, written live') : l.fork ? 'history bends here' : 'your own path'}</span><div class="muted" style="margin-top:4px">${esc(l.result)}</div></td>
        <td>${first ? `${esc(sc.real)}<div class="src">Basis: ${esc(sc.basis)} <span class="vstatus ${status}">${statusLabel}</span></div>` : '<span class="muted">(same occasion)</span>'}</td></tr>`);
    });
    return `<div class="compare-wrap"><table class="compare"><thead><tr><th>Year</th><th>Your life</th><th>What really happened</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
  }

  // The alternate history a rogue choice made: shown in the epilogue beside the real one.
  function forkHistory(s) {
    const forks = (s.forks || []).map((f) => Object.assign({ year: f.year }, TM.Live.forkDef(s, f.id))).filter((f) => f.title);
    if (!forks.length) return '';
    return `<hr class="rule"><h3>The history you made</h3>
      <p class="muted">At these moments your life left the record. What follows is invented: a counterfactual history, set against what really happened.</p>
      ${forks.map((f) => `<div class="fork-card"><span class="eyebrow">${f.year} · history bends${f.live ? ' · written live' : ''}</span><h4>${esc(f.title)}</h4>
        <div class="prose"><p>${esc(TM.fill([f.history].concat((f.more || []).filter((m) => TM.check(s, m.if)).map((m) => m.text)).join(' '), s))}</p></div>
        <p class="muted" style="margin-top:6px"><b>What really happened.</b> ${esc(f.real)}</p></div>`).join('')}`;
  }

  function diaryBook(s) {
    return `<div class="diary-book">${s.diary.map((e) => `<div class="e"><b>${e.year}</b><span>${esc(e.text)}</span></div>`).join('')}</div>`;
  }

  function summary(s) {
    const ranked = TM.rankCamps(s.axes);
    const hist = s.log.filter((l) => l.historical).length;
    return `<dl class="kv" style="display:grid;grid-template-columns:auto 1fr;gap:4px 16px;font-family:var(--f-type);font-size:.9rem">
      <dt class="muted">Office</dt><dd style="margin:0">${esc(s.office)}</dd>
      <dt class="muted">Choices made</dt><dd style="margin:0">${s.log.length}, of which ${hist} as history went</dd>
      <dt class="muted">Traits</dt><dd style="margin:0">${s.traits.map((t) => t.replace(/-/g, ' ')).join(', ') || 'none'}</dd>
      <dt class="muted">Now most like</dt><dd style="margin:0">${esc(ranked[0].camp.name)}, then ${esc(ranked[1].camp.name)}</dd>
    </dl>`;
  }

  TM.ECHO = [['Winstan Churchward', 'Winston Churchill'], ['Lord Randal (your father)', 'Lord Randolph Churchill'], ['Mrs Everleigh, "Woom"', 'Mrs Elizabeth Everest'], ['Lord Salisbourne', 'Lord Salisbury'], ['Joseph Chambers', 'Joseph Chamberlain'], ['Mr Gladwyn', 'W. E. Gladstone'], ['Robert Ascroft-Hale', 'Robert Ascroft'], ['James Maudsley', 'James Mawdsley'], ['Captain Middleham', 'Captain R. W. E. Middleton'], ['Leo Emery', 'Leo Amery'], ['Lord Milnerton', 'Alfred Milner'], ['Mr Garroway', 'J. L. Garvin'], ['Mr St John Brodwell', 'St John Brodrick'], ['Sir William Walbrook', 'Sir William Walrond'], ['Lord Hugo Seyton', 'Lord Hugh Cecil'], ['Mr Lloyd Gwynne', 'David Lloyd George'], ['Mr Arthur Belford', 'Arthur Balfour'], ['Ivor Gest', 'Ivor Guest'], ['Mr H. H. Askwith', 'H. H. Asquith'], ['Miss Clemency Hosier', 'Clementine Hozier'], ['Brendan Bracknell', 'Brendan Bracken'], ['the Prof, Professor Lindqvist', 'Frederick Lindemann'], ['Major Desmond Martyn', 'Desmond Morton'], ['Roger Keys', 'Roger Keyes'], ['Duff Cowper', 'Duff Cooper'], ['Mr Stanley Baldock', 'Stanley Baldwin'], ['Mr Maynard Kaine', 'John Maynard Keynes'], ['Mr Antony Edgerton', 'Anthony Eden'], ['Mr MacDougal', 'Ramsay MacDonald'], ['Sir John Simmons', 'Sir John Simon'], ['Sir Herbert Samuels', 'Sir Herbert Samuel'], ['Sir Henry Tisdale', 'Sir Henry Tizard'], ['Lord Beaverhulme', 'Lord Beaverbrook'], ['Mr Nevil Chambers', 'Neville Chamberlain'], ['Viscount Hallifield', 'Lord Halifax'], ['Captain David Margrave', 'David Margesson'], ['Mr Clement Astley', 'Clement Attlee'], ['Mr Arthur Greenhalgh', 'Arthur Greenwood'], ['Sir William Beverley', 'Sir William Beveridge'], ['Nye Bowen', 'Aneurin Bevan']];

  function realNames() {
    const pairs = TM.ECHO;
    return `<p class="muted" style="font-size:.95rem">Names in play and the real people behind them: ${pairs.map(([a, b]) => `${esc(a)} = <b>${esc(b)}</b>`).join('; ')}.</p>`;
  }

  function actEnd() {
    const s = TM.state, act = TM.ACTS[s.camp][s.act];
    const next = TM.ACTS[s.camp][s.act + 1];
    const playable = next && next.scenes && next.scenes.length && !s.flags.includes('life-over');
    const mp = s.flags.includes('mp');
    const age = s.year - s.born;
    let head = s.act === 1
      ? (mp ? 'The Member for the Borough' : 'Still outside the House')
      : s.act === 2 ? (mp ? 'On the eve of the storm' : 'Outside, as the storm comes')
      : (s.flags.includes('pm') ? 'Prime Minister, at the end' : s.flags.includes('was-pm') ? 'The old lion' : mp ? 'A Member to the last' : 'The life outside');
    let body = s.act === 1
      ? (mp ? `${esc(s.first)} ${esc(s.last)} sits in the new Parliament, aged ${age}, with a famous name, a small income from books and lectures, and no patience at all.`
            : `${esc(s.first)} ${esc(s.last)} reaches the new century outside Parliament, aged ${age}, and means to be inside it before long.`)
      : s.act === 2 ? `${esc(s.first)} ${esc(s.last)} is ${age}, ${mp ? 'a Member of Parliament' : 'out of Parliament'}, ${esc(s.office || 'without office')}, and watching Germany.`
      : `October 1951. ${esc(s.first)} ${esc(s.last)} is ${age}${s.office && s.office !== 'None' ? ', ' + esc(s.office) : ''}. ${s.flags.includes('long-peace') ? 'Britain kept the peace of 1940, and Europe paid for it.' : s.flags.includes('peace-ends') ? 'Britain made peace in 1940 and went back to war in 1942.' : 'The war is won, the Empire is going, and the world is divided by a curtain of iron.'} Here the story of this life ends.`;
    // A life that has left the record ends each act in its own words.
    const fk = (s.forks || []).slice().reverse().map((f) => TM.FORKS && TM.FORKS[f.id]).find((f) => f && f.ends && f.ends[s.act] && TM.check(s, f.ends[s.act].if));
    if (fk) { head = fk.ends[s.act].head; body = esc(TM.fill(fk.ends[s.act].text, s)); }
    const tail = playable ? `${esc(next.title)} begins in ${esc(next.span.split('–')[0])}.` : '';
    if (!playable) { s.ended = true; TM.save(); }
    setSheet(`<div class="stack">
      ${TM.plate('gallery', 'The Palace of Westminster')}
      <span class="eyebrow">${esc(act.title)} · complete</span>
      <h1>${head}</h1>
      <div class="prose"><p class="drop">${body} ${tail}</p></div>
      ${summary(s)}
      ${playable ? `<div class="row"><button class="btn" id="nextAct">Go on to ${esc(next.title.split('·')[0].trim())}</button></div>` : ''}
      ${playable ? '' : forkHistory(s)}
      ${playable ? '' : `<hr class="rule"><h3>Your life against the real one</h3>
      <p class="muted">Every scene is drawn from the real life its camp is built on. Notes marked "Not yet verified" still need a second source.</p>
      ${comparison(s)}
      ${realNames()}`}
      <hr class="rule"><h3>The diary</h3>${diaryBook(s)}
      <div class="row"><button class="btn ghost" id="again">Begin another life</button></div></div>`);
    if (playable) $('#nextAct').addEventListener('click', () => { TM.startAct(s, s.act + 1); TM.save(); render(); });
    $('#again').addEventListener('click', () => { TM.clearSave(); title(); });
  }

  function deathScreen() {
    const s = TM.state;
    s.ended = true; TM.save();
    const obit = s.papers[s.papers.length - 1];
    setSheet(`<div class="stack">
      <span class="eyebrow">${s.death.year} · aged ${s.death.age}</span>
      ${TM.renderDoc(obit)}
      <div class="prose"><p>${esc(s.death.text)}</p></div>
      ${summary(s)}
      ${forkHistory(s)}
      <hr class="rule"><h3>Your life against the real one</h3>
      ${comparison(s)}
      ${realNames()}
      <hr class="rule"><h3>The diary</h3>${diaryBook(s)}
      <div class="row"><button class="btn" id="again">Begin another life</button></div></div>`);
    $('#again').addEventListener('click', () => { TM.clearSave(); title(); });
  }

  /* ───────── Overlays ───────── */

  function overlay(html) {
    const o = document.createElement('div');
    o.className = 'overlay';
    o.innerHTML = `<div class="sheet" style="position:relative">${html}<button class="btn ghost close" type="button">Close</button></div>`;
    o.addEventListener('click', (e) => { if (e.target === o || e.target.classList.contains('close')) o.remove(); });
    document.addEventListener('keydown', function k(e) { if (e.key === 'Escape') { o.remove(); document.removeEventListener('keydown', k); } });
    document.body.appendChild(o);
    return o;
  }

  /* ───────── Router ───────── */

  function render() {
    clearQt();
    const s = TM.state;
    rail();
    TM.renderDossier();
    if (!s) return title();
    if (!s.camp) return title();
    if (s.dead) return deathScreen();
    if (s.pending) return outcome();
    if (s.phase === 'intro') return actIntro();
    if (s.phase === 'actEnd' || !s.sceneId) return actEnd();
    return scene();
  }
  TM.render = render;

  function boot() {
    $('#btn-diary').addEventListener('click', () => overlay(`<span class="eyebrow">The private diary of ${esc(TM.state.first)} ${esc(TM.state.last)}</span><h2 style="margin:6px 0 16px">Diary</h2>${TM.state.diary.length ? diaryBook(TM.state) : '<p class="muted">Nothing written yet.</p>'}`));
    $('#btn-papers').addEventListener('click', () => overlay(`<span class="eyebrow">Letters, telegrams and cuttings</span><h2 style="margin:6px 0 16px">Papers</h2><div class="stack">${TM.state.papers.length ? TM.state.papers.slice().reverse().map(TM.renderDoc).join('') : '<p class="muted">No papers yet.</p>'}</div>`));
    $('#btn-file').addEventListener('click', () => $('#dossier').classList.toggle('open'));
    $('#btn-new').addEventListener('click', () => {
      const o = overlay(`<h2>Begin a new life?</h2><p class="prose" style="margin:12px 0">This life will be closed. Copy its save code first if you want to keep it.</p>
        <div class="field"><label for="export-code">Save code for this life</label><textarea id="export-code" readonly>${esc(TM.exportCode())}</textarea></div>
        <div class="row" style="margin-top:12px"><button class="btn ghost" id="copy-code" type="button">Copy save code</button><button class="btn" id="confirm-new" type="button">Close this life and begin again</button><span class="muted" id="copy-msg"></span></div>`);
      o.querySelector('#copy-code').addEventListener('click', () => {
        const ta = o.querySelector('#export-code');
        const fallback = () => { ta.select(); o.querySelector('#copy-msg').textContent = 'Selected. Copy it with your keyboard.'; };
        try { navigator.clipboard.writeText(ta.value).then(() => { o.querySelector('#copy-msg').textContent = 'Copied.'; }, fallback); } catch (e) { fallback(); }
      });
      o.querySelector('#confirm-new').addEventListener('click', () => { o.remove(); TM.clearSave(); title(); });
    });
    const saved = TM.load();
    if (saved && saved.camp && !saved.ended) { TM.state = saved; render(); } else title();
  }
  document.addEventListener('DOMContentLoaded', boot);
})();
