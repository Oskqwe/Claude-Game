/* Walkable places in 3D: the engine. A third-person camera follows your Member about a place
   built by js/places.js (the Members' Lobby, the Commons Chamber, the Carlton Club, the
   Embankment at night). Uses three.js r128 (js/vendor/three.min.js, a classic script).

   TM.Walk.open({
     place: 'lobby' | 'commons' | 'carlton' | 'embankment', title,
     npcs:  [{ id, name, role, at: [x, z], face, look, sit, talk: { text, choices }, after }],
     spots: [{ id, name, role, at: [x, z], group, talk: { text, choices: [{ label, sit: [x, y, z, heading], stay }] } }],
     companion: { name, role, look },            // walks beside you
     beats: [{ at: [x, z], text, choices }],     // reached in order; the companion speaks
     talked: [ids], onTalk(item, choiceIndex) -> result text, onLeave(),
   })
   Controls: WASD / arrows to walk, drag to look, E or Enter to act, Esc to close a conversation.
   Touch: thumb-stick bottom left, drag elsewhere to look, tap a name or the prompt. */
(function () {
  const TM = window.TM;
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const coarse = () => window.matchMedia && matchMedia('(pointer: coarse)').matches;

  function webglOk() {
    try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); }
    catch (e) { return false; }
  }

  /* ───────── The kit: shared helpers for building places ───────── */

  const kit = {};

  kit.tex = function (size, draw, repeat, linear) {
    const c = document.createElement('canvas'); c.width = c.height = size;
    draw(c.getContext('2d'), size);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (repeat) t.repeat.set(repeat[0], repeat[1]);
    if (!linear) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  };

  // A grey-scale copy of a drawing, for bump maps (dark joints sink, light faces stand proud).
  kit.bump = function (size, draw, repeat) { return kit.tex(size, (g, n) => { draw(g, n); g.globalCompositeOperation = 'saturation'; g.fillStyle = '#000'; g.fillRect(0, 0, n, n); }, repeat, true); };

  kit.mat = (o) => new THREE.MeshStandardMaterial(Object.assign({ roughness: .8 }, o));
  kit.box = function (w, h, d, mat, x, y, z, parent) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x || 0, y || 0, z || 0);
    m.castShadow = m.receiveShadow = true;
    if (parent) parent.add(m);
    return m;
  };
  kit.cyl = function (rt, rb, h, mat, x, y, z, parent, seg) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 12), mat);
    m.position.set(x || 0, y || 0, z || 0);
    m.castShadow = m.receiveShadow = true;
    if (parent) parent.add(m);
    return m;
  };

  // A soft radial glow, drawn once, for gas globes, lamps and windows.
  let glowTexture = null;
  kit.glow = function (color, size, opacity) {
    if (!glowTexture) glowTexture = kit.tex(128, (g, n) => {
      const r = g.createRadialGradient(n / 2, n / 2, 0, n / 2, n / 2, n / 2);
      r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.18, 'rgba(255,255,255,.55)');
      r.addColorStop(.45, 'rgba(255,255,255,.14)'); r.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = r; g.fillRect(0, 0, n, n);
    }, null, true);
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color, transparent: true, opacity: opacity == null ? .8 : opacity, blending: THREE.AdditiveBlending, depthWrite: false, fog: true }));
    s.scale.set(size, size, 1);
    return s;
  };

  kit.glowMap = function () { if (!glowTexture) kit.glow(0xffffff, 1); return glowTexture; };

  // A gas flame in a glass globe: the globe, its halo, and (optionally) real light.
  kit.globe = function (scene, x, y, z, o) {
    o = o || {};
    const g = new THREE.Mesh(new THREE.SphereGeometry(o.r || .12, 12, 10), new THREE.MeshBasicMaterial({ color: o.color || 0xffd79a, toneMapped: false }));
    g.position.set(x, y, z); scene.add(g);
    const halo = kit.glow(o.glow || 0xffb860, o.halo || 1.4, o.opacity); halo.position.copy(g.position); scene.add(halo);
    if (o.light) { const l = new THREE.PointLight(o.glow || 0xffc27a, o.light, o.range || 9, 2); l.position.copy(g.position); scene.add(l); return { globe: g, halo, light: l }; }
    return { globe: g, halo };
  };

  // A wall with a pointed (Gothic) doorway or window cut through it.
  kit.archWall = function (width, height, doorW, doorH, mat, depth, sill) {
    const s = new THREE.Shape();
    s.moveTo(-width / 2, 0); s.lineTo(width / 2, 0); s.lineTo(width / 2, height); s.lineTo(-width / 2, height); s.lineTo(-width / 2, 0);
    if (doorW) s.holes.push(archPath(doorW, doorH, sill || 0));
    const geo = new THREE.ExtrudeGeometry(s, { depth: depth || 0.6, bevelEnabled: false });
    const uv = geo.attributes.uv, pos = geo.attributes.position;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getX(i) / 6, pos.getY(i) / 4.5);
    const m = new THREE.Mesh(geo, mat); m.receiveShadow = true; m.castShadow = true;
    return m;
  };
  function archPath(w, h, y0) {
    const p = new THREE.Path(), spring = y0 + (h - w * 0.62);
    p.moveTo(-w / 2, y0); p.lineTo(-w / 2, spring);
    p.quadraticCurveTo(-w / 2, y0 + h - w * .12, 0, y0 + h);
    p.quadraticCurveTo(w / 2, y0 + h - w * .12, w / 2, spring);
    p.lineTo(w / 2, y0); p.lineTo(-w / 2, y0);
    return p;
  }
  kit.archShape = function (w, h) { const s = new THREE.Shape(); s.curves = archPath(w, h, 0).curves; return s; };

  // The moulding round a doorway: a pointed arch traced up one jamb and down the other.
  kit.archMoulding = function (doorW, doorH, mat, r) {
    const spring = doorH - doorW * 0.62, cy = doorH - doorW * .12, hw = doorW / 2;
    const q = (a, b, c, u) => (1 - u) * (1 - u) * a + 2 * (1 - u) * u * b + u * u * c;
    const pts = [new THREE.Vector3(-hw, 0, 0), new THREE.Vector3(-hw, spring, 0)];
    for (let i = 1; i <= 10; i++) { const u = i / 10; pts.push(new THREE.Vector3(q(-hw, -hw, 0, u), q(spring, cy, doorH, u), 0)); }
    for (let i = 1; i <= 10; i++) { const u = i / 10; pts.push(new THREE.Vector3(q(0, hw, hw, u), q(doorH, cy, spring, u), 0)); }
    pts.push(new THREE.Vector3(hw, 0, 0));
    const path = new THREE.CurvePath();
    for (let i = 0; i < pts.length - 1; i++) path.add(new THREE.LineCurve3(pts[i], pts[i + 1]));
    return new THREE.Mesh(new THREE.TubeGeometry(path, 96, r || 0.14, 8, false), mat);
  };

  // An oil portrait in a gilt frame: a dark ground, a lit face, a white collar.
  kit.portrait = function (w, h, seed) {
    const g = new THREE.Group();
    const gilt = kit.mat({ color: 0xb48a3c, roughness: .35, metalness: .8 });
    kit.box(w + .24, h + .24, .08, gilt, 0, 0, 0, g);
    const canvas = kit.tex(256, (c, n) => {
      const hue = [24, 200, 120, 340][seed % 4];
      const bg = c.createRadialGradient(n * .5, n * .4, 10, n * .5, n * .5, n * .8);
      bg.addColorStop(0, `hsl(${hue},20%,22%)`); bg.addColorStop(1, `hsl(${hue},25%,6%)`);
      c.fillStyle = bg; c.fillRect(0, 0, n, n);
      c.fillStyle = '#121014'; c.beginPath(); c.ellipse(n * .5, n * .95, n * .36, n * .42, 0, 0, Math.PI * 2); c.fill();   // coat
      c.fillStyle = '#e9e1cf'; c.beginPath(); c.moveTo(n * .42, n * .58); c.lineTo(n * .58, n * .58); c.lineTo(n * .5, n * .74); c.fill(); // stock
      const face = c.createRadialGradient(n * .47, n * .4, 4, n * .5, n * .44, n * .15);
      face.addColorStop(0, '#e6c2a0'); face.addColorStop(1, '#7a5a40');
      c.fillStyle = face; c.beginPath(); c.ellipse(n * .5, n * .44, n * .11, n * .14, 0, 0, Math.PI * 2); c.fill();
      c.fillStyle = seed % 3 ? '#cfcac0' : '#3a2a1c'; c.beginPath(); c.ellipse(n * .5, n * .33, n * .12, n * .06, 0, Math.PI, 0); c.fill();  // hair
      for (let i = 0; i < 900; i++) { c.fillStyle = `rgba(255,230,180,${Math.random() * .04})`; c.fillRect(Math.random() * n, Math.random() * n, 2, 2); }  // craquelure
    });
    const pic = new THREE.Mesh(new THREE.PlaneGeometry(w, h), kit.mat({ map: canvas, roughness: .5 }));
    pic.position.z = .045; g.add(pic);
    return g;
  };

  /* ───────── People ───────── */

  // A figure in frock coat (or lounge suit), drawn on a lathe; seated or standing.
  kit.person = function (o) {
    o = o || {};
    const g = new THREE.Group();
    const coat = kit.mat({ color: o.coat == null ? 0x1b1b22 : o.coat, roughness: .82 });
    const trouser = kit.mat({ color: o.trousers || 0x2b2b30, roughness: .85 });
    const skin = kit.mat({ color: o.skin || 0xe0b896, roughness: .65 });
    const linen = kit.mat({ color: 0xf2ece0, roughness: .6 });
    const silk = kit.mat({ color: 0x0c0c0e, roughness: .55, metalness: .05 });
    const add = (m) => { m.castShadow = true; g.add(m); return m; };

    const legs = [], knees = [];
    for (const side of [-1, 1]) {
      const hip = new THREE.Group(); hip.position.set(side * .1, .92, 0);
      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(.075, .065, .46, 10), trouser); thigh.position.y = -.23; thigh.castShadow = true; hip.add(thigh);
      const knee = new THREE.Group(); knee.position.y = -.45; hip.add(knee);
      const shin = new THREE.Mesh(new THREE.CylinderGeometry(.064, .056, .44, 10), trouser); shin.position.y = -.22; shin.castShadow = true; knee.add(shin);
      const shoe = new THREE.Mesh(new THREE.BoxGeometry(.11, .07, .27), silk); shoe.position.set(0, -.43, .05); shoe.castShadow = true; knee.add(shoe);
      g.add(hip); legs.push(hip); knees.push(knee);
    }
    // the coat, turned on a lathe: tails, waist, chest, shoulders
    const prof = [[0.001, .58], [.3, .6], [.29, .86], [.235, 1.06], [.225, 1.2], [.255, 1.42], [.27, 1.5], [.21, 1.58], [.07, 1.61], [0.001, 1.61]]
      .map(([r, y]) => new THREE.Vector2(r, y));
    const body = add(new THREE.Mesh(new THREE.LatheGeometry(prof, 20), coat)); body.scale.z = .78;
    // shirt front, cravat, collar
    const shirt = add(new THREE.Mesh(new THREE.PlaneGeometry(.11, .26), linen)); shirt.position.set(0, 1.43, .19);
    const tie = add(new THREE.Mesh(new THREE.BoxGeometry(.07, .05, .02), new THREE.MeshStandardMaterial({ color: o.tie || 0x3a1418, roughness: .5 }))); tie.position.set(0, 1.55, .19);
    add(new THREE.Mesh(new THREE.CylinderGeometry(.068, .078, .08, 12), linen)).position.y = 1.62;
    // lapels
    for (const side of [-1, 1]) { const l = add(new THREE.Mesh(new THREE.BoxGeometry(.06, .3, .02), coat)); l.position.set(side * .07, 1.42, .2); l.rotation.z = side * .25; }
    const arms = [];
    for (const side of [-1, 1]) {
      const pivot = new THREE.Group(); pivot.position.set(side * .27, 1.5, 0);
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(.058, .052, .6, 10), coat); arm.position.y = -.3; arm.castShadow = true; pivot.add(arm);
      const cuff = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, .03, 10), linen); cuff.position.y = -.6; pivot.add(cuff);
      const hand = new THREE.Mesh(new THREE.SphereGeometry(.048, 10, 8), skin); hand.position.y = -.65; pivot.add(hand);
      pivot.rotation.z = side * .06;
      g.add(pivot); arms.push(pivot);
    }
    const headG = new THREE.Group(); headG.position.y = 1.78; g.add(headG);
    const head = new THREE.Mesh(new THREE.SphereGeometry(.125, 18, 14), skin); head.scale.set(.9, 1.1, .98); head.castShadow = true; headG.add(head);
    const nose = new THREE.Mesh(new THREE.ConeGeometry(.022, .06, 8), skin); nose.rotation.x = Math.PI / 2; nose.position.set(0, -.01, .125); headG.add(nose);
    for (const side of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(.03, 8, 6), skin); ear.scale.set(.5, 1, .8); ear.position.set(side * .115, 0, 0); headG.add(ear);
      const eye = new THREE.Mesh(new THREE.SphereGeometry(.012, 6, 5), new THREE.MeshBasicMaterial({ color: 0x1a1210 })); eye.position.set(side * .042, .025, .112); headG.add(eye);
    }
    if (o.whiskers) { const w = new THREE.Mesh(new THREE.SphereGeometry(.09, 12, 8), kit.mat({ color: o.whiskers, roughness: 1 })); w.scale.set(1.15, .55, .7); w.position.set(0, -.08, .06); headG.add(w); }
    if (o.moustache) { const m = new THREE.Mesh(new THREE.BoxGeometry(.09, .02, .02), kit.mat({ color: o.moustache, roughness: 1 })); m.position.set(0, -.045, .12); headG.add(m); }
    const hair = new THREE.Mesh(new THREE.SphereGeometry(.13, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2.1), kit.mat({ color: o.hair || 0x3a2a1c, roughness: 1 }));
    hair.position.y = .015; headG.add(hair);
    if (o.hat === 'top' || o.hat === undefined) {
      const brim = new THREE.Mesh(new THREE.CylinderGeometry(.19, .19, .014, 24), silk); brim.position.y = .11; brim.scale.z = .88; headG.add(brim);
      const crown = new THREE.Mesh(new THREE.CylinderGeometry(.118, .11, .24, 24), silk); crown.position.y = .235; crown.castShadow = true; headG.add(crown);
      const band = new THREE.Mesh(new THREE.CylinderGeometry(.113, .113, .045, 24), kit.mat({ color: 0x222226, roughness: .9 })); band.position.y = .14; headG.add(band);
    } else if (o.hat === 'bowler') {
      const brim = new THREE.Mesh(new THREE.CylinderGeometry(.17, .17, .012, 24), silk); brim.position.y = .1; headG.add(brim);
      const dome = new THREE.Mesh(new THREE.SphereGeometry(.125, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), silk); dome.position.y = .1; headG.add(dome);
    }
    g.userData = { legs, knees, arms, head: headG, phase: Math.random() * 6, seated: false };
    if (o.sit) kit.sit(g);
    return g;
  };

  kit.sit = function (p, on) {
    const u = p.userData;
    u.seated = on !== false;
    u.legs.forEach((l) => { l.rotation.x = u.seated ? -1.5 : 0; });
    u.knees.forEach((k) => { k.rotation.x = u.seated ? 1.5 : 0; });
    u.arms.forEach((a) => { a.rotation.x = u.seated ? -.45 : 0; });
  };

  kit.animate = function (p, speed, dt, t) {
    const u = p.userData;
    if (u.seated) { u.head.rotation.y = Math.sin(t / 1700 + u.phase) * .25; return; }
    u.phase += dt * (speed > .01 ? 9 : 1.2);
    const swing = speed > .01 ? Math.sin(u.phase) * .5 : 0;
    u.legs[0].rotation.x = swing; u.legs[1].rotation.x = -swing;
    u.knees[0].rotation.x = Math.max(0, -Math.sin(u.phase - .6)) * (speed > .01 ? .7 : 0);
    u.knees[1].rotation.x = Math.max(0, Math.sin(u.phase - .6)) * (speed > .01 ? .7 : 0);
    u.arms[0].rotation.x = -swing * .7; u.arms[1].rotation.x = swing * .7;
    if (speed <= .01) u.arms[1].rotation.x = Math.sin(t / 900 + u.phase) * .12 - .12;
  };

  // A crowd of seated or standing extras with no names, for atmosphere.
  kit.extras = function (scene, list) {
    const palette = [0x15151a, 0x1d1b22, 0x221f1c, 0x26231f, 0x18181d];
    const hairs = [0x2a1d12, 0x55473a, 0x8c8278, 0xc9c2b6, 0x3a2a1c];
    return list.map(([x, y, z, face, sit], i) => {
      const p = kit.person({ coat: palette[i % 5], hair: hairs[(i * 3) % 5], hat: i % 3 ? 'top' : 'none', whiskers: i % 4 === 0 ? hairs[(i + 2) % 5] : null, sit });
      p.position.set(x, y, z); p.rotation.y = face || 0;
      scene.add(p);
      return p;
    });
  };

  /* ───────── Open a place ───────── */

  function open(o) {
    const builder = TM.Places && TM.Places[o.place || 'lobby'];
    const root = document.createElement('div');
    root.className = 'lobby';
    root.innerHTML = `
      <div class="lobby-bar"><span class="lobby-title">${esc(o.title || '')}</span>
        <button class="btn" data-act="leave">${esc(o.leaveLabel || 'Leave')}</button></div>
      <div class="lobby-tags"></div>
      <div class="lobby-prompt" hidden></div>
      <div class="lobby-help">${'ontouchstart' in window ? 'Thumb-stick to walk · drag to look round · tap a name to talk' : 'WASD or arrow keys to walk · drag to look round · E to talk'}</div>
      <div class="lobby-stick" aria-hidden="true"><span></span></div>
      <div class="lobby-dialog" hidden></div>`;
    document.body.appendChild(root);
    document.body.classList.add('in-lobby');
    const $ = (q) => root.querySelector(q);
    const talked = new Set(o.talked || []);
    const npcs = o.npcs || [], spots = o.spots || [], beats = (o.beats || []).map((b, i) => Object.assign({ id: 'beat-' + i, name: o.companion ? o.companion.name : '', role: o.companion ? o.companion.role : '', talk: { text: b.text, choices: b.choices } }, b));
    const items = npcs.concat(spots);

    let closed = false, raf = 0, renderer = null;
    const cleanups = [];
    const on = (el, ev, fn, opt) => { el.addEventListener(ev, fn, opt); cleanups.push(() => el.removeEventListener(ev, fn, opt)); };

    function leave() {
      if (closed) return;
      closed = true;
      cancelAnimationFrame(raf);
      cleanups.forEach((f) => f());
      if (renderer) { renderer.dispose(); renderer.forceContextLoss && renderer.forceContextLoss(); }
      root.remove();
      document.body.classList.remove('in-lobby');
      o.onLeave && o.onLeave();
    }
    on($('[data-act="leave"]'), 'click', leave);

    /* the conversation panel */
    let refreshTags = () => {};
    let onSit = () => {};
    const markDone = (it) => { talked.add(it.id); if (it.group) items.forEach((x) => { if (x.group === it.group) talked.add(x.id); }); };
    function talkTo(it) {
      if (talked.has(it.id)) {
        showDialog(`<h3>${esc(it.name)}</h3><p class="muted">${esc(it.role || '')}</p><p>${esc(it.after || (it.group ? 'You have made your choice.' : 'You have had your conversation.'))}</p>
          <div class="row"><button class="btn" data-act="close">Walk on</button></div>`);
        return;
      }
      showDialog(`<h3>${esc(it.name)}</h3>${it.role ? `<p class="muted">${esc(it.role)}</p>` : ''}<p>${esc(TM.fill(it.talk.text, TM.state))}</p>
        <div class="choices">${it.talk.choices.map((c, i) => `<button class="choice" data-key="${'abcd'[i]}" data-i="${i}">${esc(TM.fill(c.label, TM.state))}</button>`).join('')}</div>`);
      root.querySelectorAll('.lobby-dialog .choice').forEach((b) => b.addEventListener('click', () => {
        const c = it.talk.choices[+b.dataset.i];
        if (c.stay) { closeDialog(); return; }
        const res = o.onTalk(it, +b.dataset.i);
        markDone(it);
        if (c.sit) onSit(c.sit);
        showDialog(`<h3>${esc(it.name)}</h3><p>${esc(res || '')}</p><div class="row"><button class="btn" data-act="close">${it.group ? 'Very well' : 'Walk on'}</button></div>`);
        refreshTags();
      }));
    }
    function showDialog(html) {
      const d = $('.lobby-dialog'); d.innerHTML = html; d.hidden = false;
      const c = d.querySelector('[data-act="close"]'); if (c) c.addEventListener('click', closeDialog);
      const first = d.querySelector('button'); if (first) first.focus({ preventScroll: true });
    }
    function closeDialog() { $('.lobby-dialog').hidden = true; }
    const dialogOpen = () => !$('.lobby-dialog').hidden;

    if (!window.THREE || !webglOk() || !builder) {
      // No 3D here: the same conversations as a list, in order.
      $('.lobby-help').textContent = 'This device cannot draw the scene in 3D, so here is everything in it.';
      $('.lobby-stick').remove();
      const list = document.createElement('div'); list.className = 'lobby-list';
      const all = beats.concat(items);
      const draw = () => {
        const firstBeat = beats.find((b) => !talked.has(b.id));
        list.innerHTML = all.filter((n) => !n.id.startsWith('beat-') || n === firstBeat || talked.has(n.id))
          .map((n) => `<button class="choice" data-id="${esc(n.id)}">${esc(n.name)} <span class="lock">${esc(n.role || '')}${talked.has(n.id) ? ' · done' : ''}</span></button>`).join('');
        list.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => talkTo(all.find((n) => n.id === b.dataset.id))));
      };
      draw(); root.appendChild(list);
      refreshTags = draw;
      return { leave };
    }

    /* three.js */
    const canvas = document.createElement('canvas'); canvas.className = 'lobby-canvas'; root.prepend(canvas);
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse() ? 1.5 : 1.75));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, 1, .1, 600);
    const place = builder(scene, kit, { coarse: coarse() });
    renderer.toneMappingExposure = place.exposure || .95;
    const obstacles = place.obstacles || [];

    // dust in the lamplight
    if (place.dust) {
      const [x0, x1, y0, y1, z0, z1] = place.dust, N = coarse() ? 220 : 500;
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) { pos[i * 3] = x0 + Math.random() * (x1 - x0); pos[i * 3 + 1] = y0 + Math.random() * (y1 - y0); pos[i * 3 + 2] = z0 + Math.random() * (z1 - z0); }
      const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const motes = new THREE.Points(geo, new THREE.PointsMaterial({ color: place.dustColor || 0xffe0a8, size: .035, transparent: true, opacity: .55, blending: THREE.AdditiveBlending, depthWrite: false }));
      motes.userData.span = place.dust; scene.add(motes); place.motes = motes;
    }

    // your Member
    const me = kit.person({ coat: 0x16161c, trousers: 0x3a3a40, tie: 0x5a1a1a });
    const st = place.start || { x: 0, z: 0, heading: Math.PI };
    me.position.set(st.x, 0, st.z); scene.add(me);
    let heading = st.heading;
    let camYaw = heading + Math.PI, camPitch = .3;

    // the companion, walking at your shoulder
    let mate = null;
    if (o.companion) { mate = kit.person(o.companion.look || {}); mate.position.set(st.x + 1, 0, st.z + .4); scene.add(mate); }

    // the people standing about
    const figures = items.map((n) => {
      let f = null;
      if (!n.group) {
        f = kit.person(Object.assign({ sit: !!n.sit }, n.look || {}));
        f.position.set(n.at[0], n.sitY || 0, n.at[1]); f.rotation.y = n.face || 0;
        scene.add(f);
        obstacles.push({ x: n.at[0], z: n.at[1], r: .5 });
      } else {
        f = ring(n.at, 0xe9c46a); scene.add(f);
      }
      const tag = document.createElement('button'); tag.className = 'lobby-tag' + (n.group ? ' spot' : ''); tag.type = 'button';
      tag.innerHTML = `<b>${esc(n.name)}</b>${n.role ? `<i>${esc(n.role)}</i>` : ''}`;
      tag.addEventListener('click', () => { if (dist(n.at) < 3) talkTo(n); else target = n; });
      $('.lobby-tags').appendChild(tag);
      return { n, f, tag, y: n.group ? .6 : (n.sit ? 1.95 : 2.35) };
    });
    let mateTag = null;
    if (mate) {
      mateTag = document.createElement('div'); mateTag.className = 'lobby-tag mate';
      mateTag.innerHTML = `<b>${esc(o.companion.name)}</b><i>${esc(o.companion.role || 'walking with you')}</i>`;
      $('.lobby-tags').appendChild(mateTag);
    }
    // markers on the path for the conversation as you walk
    const beatRings = beats.map((b) => { const r = ring(b.at, 0xffd28a, 1.3); r.visible = false; scene.add(r); return r; });
    refreshTags = () => figures.forEach(({ n, tag }) => tag.classList.toggle('done', talked.has(n.id)));
    refreshTags();
    let target = null;

    function ring(at, color, r) {
      const g = new THREE.Group();
      const m = new THREE.Mesh(new THREE.RingGeometry((r || .9) * .78, r || .9, 40), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .55, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }));
      m.rotation.x = -Math.PI / 2; m.position.y = .02; g.add(m);
      const halo = kit.glow(color, (r || .9) * 2.4, .35); halo.position.y = .25; g.add(halo);
      g.position.set(at[0], at[2] || 0, at[1]);
      g.userData.pulse = m;
      return g;
    }

    // sitting down in a chosen seat; any movement gets you up again
    let seatedAt = null;
    onSit = (s) => { seatedAt = s; me.position.set(s[0], s[1], s[2]); heading = s[3]; me.rotation.y = heading; kit.sit(me, true); };
    function standUp() { if (!seatedAt) return; kit.sit(me, false); me.position.y = 0; me.position.x = Math.max(-1.9, Math.min(1.9, me.position.x)); seatedAt = null; }

    /* input */
    const keys = new Set();
    const stick = { x: 0, y: 0, id: null };
    let near = null;
    on(window, 'keydown', (e) => {
      if (dialogOpen()) { if (e.key === 'Escape') closeDialog(); return; }
      if (e.key === 'Escape') return leave();
      keys.add(e.key.toLowerCase());
      if ((e.key === 'e' || e.key === 'E' || e.key === 'Enter') && near) { e.preventDefault(); act(); }
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(e.key.toLowerCase())) e.preventDefault();
    });
    on(window, 'keyup', (e) => keys.delete(e.key.toLowerCase()));
    on(window, 'blur', () => keys.clear());

    let drag = null;
    on(canvas, 'pointerdown', (e) => { if (e.pointerId === stick.id) return; drag = { id: e.pointerId, x: e.clientX, y: e.clientY }; canvas.setPointerCapture(e.pointerId); });
    on(canvas, 'pointermove', (e) => {
      if (!drag || drag.id !== e.pointerId) return;
      camYaw -= (e.clientX - drag.x) * .006; camPitch = Math.max(.04, Math.min(.85, camPitch + (e.clientY - drag.y) * .004));
      drag.x = e.clientX; drag.y = e.clientY;
    });
    on(canvas, 'pointerup', () => { drag = null; });
    on(canvas, 'pointercancel', () => { drag = null; });

    const stickEl = $('.lobby-stick'), knob = stickEl.querySelector('span');
    on(stickEl, 'pointerdown', (e) => { stick.id = e.pointerId; stickEl.setPointerCapture(e.pointerId); moveStick(e); e.preventDefault(); });
    on(stickEl, 'pointermove', (e) => { if (e.pointerId === stick.id) moveStick(e); });
    const endStick = (e) => { if (e.pointerId !== stick.id) return; stick.id = null; stick.x = stick.y = 0; knob.style.transform = ''; };
    on(stickEl, 'pointerup', endStick); on(stickEl, 'pointercancel', endStick);
    function moveStick(e) {
      const r = stickEl.getBoundingClientRect(), R = r.width / 2;
      let dx = e.clientX - (r.left + R), dy = e.clientY - (r.top + R);
      const m = Math.hypot(dx, dy); if (m > R) { dx *= R / m; dy *= R / m; }
      stick.x = dx / R; stick.y = dy / R;
      knob.style.transform = `translate(${dx}px, ${dy}px)`;
    }

    const dist = (at) => Math.hypot(me.position.x - at[0], me.position.z - at[1]);
    const exit = place.exit;
    const beatsDone = () => beats.every((b) => talked.has(b.id));
    function act() { if (near === 'exit') leave(); else if (near) talkTo(near); }
    on($('.lobby-prompt'), 'click', act);

    function resize() {
      const w = root.clientWidth, h = root.clientHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w < h ? 72 : 58; camera.updateProjectionMatrix();
    }
    on(window, 'resize', resize); resize();

    /* the frame */
    const tmp = new THREE.Vector3();
    let last = performance.now();
    function frame(now) {
      if (closed) return;
      const dt = Math.min(.1, (now - last) / 1000); last = now;

      let fx = 0, fz = 0;
      if (!dialogOpen()) {
        if (keys.has('w') || keys.has('arrowup')) fz += 1;
        if (keys.has('s') || keys.has('arrowdown')) fz -= 1;
        if (keys.has('a') || keys.has('arrowleft')) fx -= 1;
        if (keys.has('d') || keys.has('arrowright')) fx += 1;
        fx += stick.x; fz -= stick.y;
      }
      let speed = 0;
      if ((fx || fz) && seatedAt) standUp();
      if (fx || fz) {
        target = null;
        const m = Math.min(1, Math.hypot(fx, fz));
        const cfx = -Math.sin(camYaw), cfz = -Math.cos(camYaw);
        const crx = -cfz, crz = cfx;
        let dx = cfx * fz - crx * fx, dz = cfz * fz - crz * fx;
        const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l;
        let diff = Math.atan2(dx, dz) - heading; diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        heading += diff * Math.min(1, dt * 12);
        speed = moveAlong(dx, dz, dt, m);
      } else if (target && !dialogOpen()) {
        if (seatedAt) standUp();
        const tx = target.at[0] - me.position.x, tz = target.at[1] - me.position.z;
        if (Math.hypot(tx, tz) < (target.group ? .6 : 1.9)) { const t = target; target = null; talkTo(t); }
        else { heading = Math.atan2(tx, tz); speed = moveAlong(Math.sin(heading), Math.cos(heading), dt, 1); }
      }
      me.rotation.y = heading;
      kit.animate(me, speed, dt, now);
      figures.forEach(({ f, n }) => {
        if (n.group) { f.userData.pulse.material.opacity = talked.has(n.id) ? .12 : .35 + Math.sin(now / 400) * .2; f.visible = !talked.has(n.id) || !n.group; }
        else kit.animate(f, 0, dt, now);
      });

      // the companion keeps pace at your right shoulder
      if (mate) {
        const rx = -Math.cos(heading), rz = Math.sin(heading);
        const tx = me.position.x + rx * .95 - Math.sin(heading) * .25, tz = me.position.z + rz * .95 - Math.cos(heading) * .25;
        const [cx, cz] = place.clamp ? place.clamp(tx, tz) : [tx, tz];
        const mv = Math.hypot(cx - mate.position.x, cz - mate.position.z);
        mate.position.x += (cx - mate.position.x) * Math.min(1, dt * 5);
        mate.position.z += (cz - mate.position.z) * Math.min(1, dt * 5);
        if (mv > .05) mate.rotation.y = heading;
        else if (dialogOpen()) { let d = Math.atan2(me.position.x - mate.position.x, me.position.z - mate.position.z) - mate.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d)); mate.rotation.y += d * Math.min(1, dt * 4); }
        kit.animate(mate, mv > .08 ? 1 : 0, dt, now);
      }

      // beats: the next marker on the path lights up; walk into it and the companion speaks
      const next = beats.findIndex((b) => !talked.has(b.id));
      beatRings.forEach((r, i) => { r.visible = i === next; if (r.visible) r.userData.pulse.material.opacity = .4 + Math.sin(now / 350) * .2; });
      if (next >= 0 && !dialogOpen() && dist(beats[next].at) < 1.6) talkTo(beats[next]);

      // camera: behind and above, easing round to follow when you walk
      if (speed > .1 && !drag) { let d = (heading + Math.PI) - camYaw; d = Math.atan2(Math.sin(d), Math.cos(d)); camYaw += d * Math.min(1, dt * 1.6); }
      const D3 = place.camDist || 4.4;
      let cx = me.position.x + Math.sin(camYaw) * D3 * Math.cos(camPitch);
      let cz = me.position.z + Math.cos(camYaw) * D3 * Math.cos(camPitch);
      const cy = me.position.y + 1.7 + Math.sin(camPitch) * D3;
      if (place.camClamp) [cx, cz] = place.camClamp(cx, cz);
      camera.position.lerp(tmp.set(cx, cy, cz), Math.min(1, dt * 8));
      camera.lookAt(me.position.x, me.position.y + 1.5, me.position.z);

      // what is within reach
      near = null; let best = 2.3;
      for (const { n } of figures) { if (n.group && talked.has(n.id)) continue; const d = dist(n.at); if (d < (n.group ? 1.2 : best)) { best = d; near = n; } }
      if (!near && exit && exit.test(me.position.x, me.position.z) && (!beats.length || beatsDone() || exit.always)) near = 'exit';
      const prompt = $('.lobby-prompt');
      if (near && !dialogOpen()) {
        prompt.hidden = false;
        prompt.textContent = near === 'exit' ? exit.label : near.group ? (near.verb || 'Sit here') : `${talked.has(near.id) ? 'Nod to' : 'Talk to'} ${near.name}`;
      } else prompt.hidden = true;

      // name tags
      const w = root.clientWidth, h = root.clientHeight;
      const placeTag = (tag, x, y, z, max) => {
        tmp.set(x, y, z).project(camera);
        if (tmp.z > 1 || Math.hypot(me.position.x - x, me.position.z - z) > max) { tag.style.display = 'none'; return false; }
        tag.style.display = '';
        tag.style.transform = `translate(-50%, -100%) translate(${(tmp.x + 1) / 2 * w}px, ${(1 - tmp.y) / 2 * h}px)`;
        return true;
      };
      for (const { n, f, tag, y } of figures) {
        if (n.group && talked.has(n.id)) { tag.style.display = 'none'; continue; }
        placeTag(tag, n.at[0], (n.sitY || n.at[2] || 0) + y, n.at[1], n.group ? 9 : 15);
        tag.classList.toggle('near', near === n);
      }
      if (mateTag) placeTag(mateTag, mate.position.x, 2.35, mate.position.z, 20);

      if (place.update) place.update(dt, now, me.position);
      if (place.motes) { const p = place.motes.geometry.attributes.position, sp = place.motes.userData.span; for (let i = 0; i < p.count; i++) { let y = p.getY(i) + dt * .05 * Math.sin(i + now / 3000); if (y > sp[3]) y = sp[2]; p.setY(i, y); p.setX(i, p.getX(i) + Math.sin(now / 2000 + i) * dt * .03); } p.needsUpdate = true; }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }

    function moveAlong(dx, dz, dt, m) {
      const v = (place.speed || 3.1) * m * dt;
      let nx = me.position.x + dx * v, nz = me.position.z + dz * v;
      if (place.clamp) [nx, nz] = place.clamp(nx, nz);
      for (const ob of obstacles) {
        const ox = nx - ob.x, oz = nz - ob.z, d = Math.hypot(ox, oz), min = ob.r + .3;
        if (d < min && d > 0) { nx = ob.x + ox / d * min; nz = ob.z + oz / d * min; }
      }
      me.position.x = nx; me.position.z = nz;
      return m;
    }

    raf = requestAnimationFrame(frame);
    return { leave };
  }

  TM.Walk = { open, kit };
  TM.Places = TM.Places || {};
  // The older name, kept so existing scenes still open the Members' Lobby.
  TM.Lobby = { open: (o) => open(Object.assign({ place: 'lobby', leaveLabel: 'Leave the Lobby' }, o)) };
})();
