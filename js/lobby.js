/* The Members' Lobby in 3D: walk your Member about with a third-person camera and talk to
   whoever is standing there. Uses three.js r128 (js/vendor/three.min.js, a classic script).

   TM.Lobby.open({ title, npcs, talked, onTalk(npc, choiceIndex) -> result text, onLeave() })
   npc: { id, name, role, at: [x, z], face (radians), coat, hat, talk: { text, choices: [{ label }] } }
   Controls: WASD / arrow keys to walk, drag to look round, E or Enter to talk, Esc to close a
   conversation. On a touch screen: the thumb-stick bottom left, drag elsewhere to look, tap the prompt. */
(function () {
  const TM = window.TM;
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const W = 10, D = 13, H = 9;             // half-width, half-depth, height of the room (metres)
  const DOOR = { w: 3.2, h: 5.6 };          // the Chamber door, north wall

  function webglOk() {
    try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); }
    catch (e) { return false; }
  }

  /* ───────── Procedural textures (canvas) ───────── */

  function tex(size, draw, repeat) {
    const c = document.createElement('canvas'); c.width = c.height = size;
    draw(c.getContext('2d'), size);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (repeat) t.repeat.set(repeat[0], repeat[1]);
    t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }

  // Encaustic Minton-style tiles: buff, red and black, with a quatrefoil.
  const floorTex = () => tex(512, (g, n) => {
    const k = n / 4;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
      const x = i * k, y = j * k;
      g.fillStyle = (i + j) % 2 ? '#6e3426' : '#cdb894'; g.fillRect(x, y, k, k);
      g.fillStyle = (i + j) % 2 ? '#bfa97f' : '#55291e';
      g.beginPath();
      for (let a = 0; a < 4; a++) { const ang = a * Math.PI / 2; g.moveTo(x + k / 2, y + k / 2); g.arc(x + k / 2 + Math.cos(ang) * k * .16, y + k / 2 + Math.sin(ang) * k * .16, k * .14, 0, Math.PI * 2); }
      g.fill();
      g.fillStyle = '#1d1712'; g.beginPath(); g.arc(x + k / 2, y + k / 2, k * .07, 0, Math.PI * 2); g.fill();
      g.strokeStyle = 'rgba(30,20,12,.55)'; g.lineWidth = 3; g.strokeRect(x + 1.5, y + 1.5, k - 3, k - 3);
    }
    // a little wear
    for (let i = 0; i < 1400; i++) { g.fillStyle = `rgba(${Math.random() < .5 ? '255,240,210' : '20,10,5'},${Math.random() * .06})`; g.fillRect(Math.random() * n, Math.random() * n, 2, 2); }
  }, [9, 11.7]);

  // Ashlar stone in courses.
  const stoneTex = () => tex(512, (g, n) => {
    g.fillStyle = '#b8a47d'; g.fillRect(0, 0, n, n);
    const rowH = n / 8;
    for (let r = 0; r < 8; r++) {
      const off = r % 2 ? n / 6 : 0;
      for (let x = -off; x < n; x += n / 3) {
        const shade = 168 + Math.floor(Math.random() * 26);
        g.fillStyle = `rgb(${shade + 14},${shade},${shade - 30})`;
        g.fillRect(x + 2, r * rowH + 2, n / 3 - 4, rowH - 4);
      }
    }
    for (let i = 0; i < 2500; i++) { g.fillStyle = `rgba(60,40,20,${Math.random() * .08})`; g.fillRect(Math.random() * n, Math.random() * n, 1.5, 1.5); }
  }, [3, 1.6]);

  // Dark oak linenfold panelling for the lower walls.
  const oakTex = () => tex(256, (g, n) => {
    g.fillStyle = '#3b2615'; g.fillRect(0, 0, n, n);
    for (let i = 0; i < 4; i++) {
      const x = i * n / 4;
      g.fillStyle = '#4a311c'; g.fillRect(x + 6, 10, n / 4 - 12, n - 20);
      for (let f = 0; f < 4; f++) { g.fillStyle = f % 2 ? '#563a22' : '#35210f'; g.fillRect(x + 12 + f * ((n / 4 - 24) / 4), 18, (n / 4 - 24) / 4, n - 36); }
    }
    for (let i = 0; i < 300; i++) { g.strokeStyle = `rgba(0,0,0,${Math.random() * .15})`; g.beginPath(); const y = Math.random() * n; g.moveTo(0, y); g.lineTo(n, y + Math.random() * 4); g.stroke(); }
  }, [10, 1]);

  /* ───────── Pieces of architecture ───────── */

  // A wall with a pointed (Gothic) doorway cut through it.
  function archWall(width, height, doorW, doorH, mat, depth) {
    const s = new THREE.Shape();
    s.moveTo(-width / 2, 0); s.lineTo(width / 2, 0); s.lineTo(width / 2, height); s.lineTo(-width / 2, height); s.lineTo(-width / 2, 0);
    if (doorW) {
      const hole = new THREE.Path();
      const spring = doorH - doorW * 0.62;
      hole.moveTo(-doorW / 2, 0); hole.lineTo(-doorW / 2, spring);
      hole.quadraticCurveTo(-doorW / 2, doorH - doorW * .12, 0, doorH);
      hole.quadraticCurveTo(doorW / 2, doorH - doorW * .12, doorW / 2, spring);
      hole.lineTo(doorW / 2, 0); hole.lineTo(-doorW / 2, 0);
      s.holes.push(hole);
    }
    const geo = new THREE.ExtrudeGeometry(s, { depth: depth || 0.6, bevelEnabled: false });
    // planar UVs scaled to metres so the stone texture is the same size everywhere
    const uv = geo.attributes.uv, pos = geo.attributes.position;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getX(i) / 6, pos.getY(i) / 4.5);
    return new THREE.Mesh(geo, mat);
  }

  // The moulding round a doorway: a pointed arch in stone, traced up one jamb and down the other.
  function archMoulding(doorW, doorH, mat) {
    const spring = doorH - doorW * 0.62, cy = doorH - doorW * .12, hw = doorW / 2;
    const q = (a, b, c, u) => (1 - u) * (1 - u) * a + 2 * (1 - u) * u * b + u * u * c;
    const pts = [new THREE.Vector3(-hw, 0, 0), new THREE.Vector3(-hw, spring, 0)];
    for (let i = 1; i <= 10; i++) { const u = i / 10; pts.push(new THREE.Vector3(q(-hw, -hw, 0, u), q(spring, cy, doorH, u), 0)); }
    for (let i = 1; i <= 10; i++) { const u = i / 10; pts.push(new THREE.Vector3(q(0, hw, hw, u), q(doorH, cy, spring, u), 0)); }
    pts.push(new THREE.Vector3(hw, 0, 0));
    const path = new THREE.CurvePath();
    for (let i = 0; i < pts.length - 1; i++) path.add(new THREE.LineCurve3(pts[i], pts[i + 1]));
    return new THREE.Mesh(new THREE.TubeGeometry(path, 96, 0.14, 8, false), mat);
  }

  /* ───────── People ───────── */

  function person(o) {
    const g = new THREE.Group();
    const coat = new THREE.MeshStandardMaterial({ color: o.coat || 0x1b1b22, roughness: .8 });
    const trouser = new THREE.MeshStandardMaterial({ color: o.trousers || 0x2b2b30, roughness: .85 });
    const skin = new THREE.MeshStandardMaterial({ color: o.skin || 0xe0b896, roughness: .7 });
    const linen = new THREE.MeshStandardMaterial({ color: 0xf2ece0, roughness: .6 });
    const silk = new THREE.MeshStandardMaterial({ color: 0x0c0c0e, roughness: .62, metalness: .05 });

    const legs = [];
    for (const side of [-1, 1]) {
      const pivot = new THREE.Group(); pivot.position.set(side * .11, .92, 0);
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(.075, .065, .88, 8), trouser); leg.position.y = -.44; pivot.add(leg);
      const shoe = new THREE.Mesh(new THREE.BoxGeometry(.12, .07, .26), silk); shoe.position.set(0, -.87, .05); pivot.add(shoe);
      g.add(pivot); legs.push(pivot);
    }
    // frock coat, flaring below the waist
    const body = new THREE.Mesh(new THREE.CylinderGeometry(.2, .27, .62, 12), coat); body.position.y = 1.25; g.add(body);
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(.27, .33, .42, 12, 1, true), coat); skirt.position.y = .78; g.add(skirt);
    const shoulders = new THREE.Mesh(new THREE.SphereGeometry(.23, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), coat); shoulders.scale.set(1.15, .5, .85); shoulders.position.y = 1.54; g.add(shoulders);
    const shirt = new THREE.Mesh(new THREE.BoxGeometry(.12, .3, .02), linen); shirt.position.set(0, 1.42, .185); g.add(shirt);
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(.075, .085, .08, 10), linen); collar.position.y = 1.6; g.add(collar);
    const arms = [];
    for (const side of [-1, 1]) {
      const pivot = new THREE.Group(); pivot.position.set(side * .27, 1.5, 0);
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(.06, .055, .6, 8), coat); arm.position.y = -.3; pivot.add(arm);
      const hand = new THREE.Mesh(new THREE.SphereGeometry(.05, 8, 6), skin); hand.position.y = -.63; pivot.add(hand);
      pivot.rotation.z = side * .06;
      g.add(pivot); arms.push(pivot);
    }
    const head = new THREE.Mesh(new THREE.SphereGeometry(.13, 16, 12), skin); head.scale.set(.92, 1.08, .98); head.position.y = 1.77; g.add(head);
    if (o.whiskers) { const w = new THREE.Mesh(new THREE.SphereGeometry(.1, 10, 8), new THREE.MeshStandardMaterial({ color: o.whiskers, roughness: 1 })); w.scale.set(1.1, .6, .7); w.position.set(0, 1.69, .06); g.add(w); }
    if (o.hat !== 'none') {
      const brim = new THREE.Mesh(new THREE.CylinderGeometry(.2, .2, .015, 20), silk); brim.position.y = 1.88; g.add(brim);
      const crown = new THREE.Mesh(new THREE.CylinderGeometry(.12, .115, .24, 20), silk); crown.position.y = 2.0; g.add(crown);
    } else {
      const hair = new THREE.Mesh(new THREE.SphereGeometry(.135, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2.2), new THREE.MeshStandardMaterial({ color: o.hair || 0x3a2a1c, roughness: 1 })); hair.position.y = 1.79; g.add(hair);
    }
    g.userData = { legs, arms, phase: Math.random() * 6 };
    return g;
  }

  function animateWalk(p, speed, dt) {
    const u = p.userData;
    u.phase += dt * (speed > .01 ? 9 : 1.2);
    const swing = speed > .01 ? Math.sin(u.phase) * .55 : 0;
    u.legs[0].rotation.x = swing; u.legs[1].rotation.x = -swing;
    u.arms[0].rotation.x = -swing * .7; u.arms[1].rotation.x = swing * .7;
  }

  /* ───────── The Lobby ───────── */

  function buildRoom(scene) {
    const stone = new THREE.MeshStandardMaterial({ map: stoneTex(), roughness: .92 });
    const stoneDark = new THREE.MeshStandardMaterial({ color: 0x8c7a58, roughness: .9 });
    const oak = new THREE.MeshStandardMaterial({ map: oakTex(), roughness: .7 });
    const brass = new THREE.MeshStandardMaterial({ color: 0xc9a050, roughness: .35, metalness: .85 });
    const marble = new THREE.MeshStandardMaterial({ color: 0xece6da, roughness: .45 });
    const leather = new THREE.MeshStandardMaterial({ color: 0x23432f, roughness: .65 });

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, D * 2), new THREE.MeshStandardMaterial({ map: floorTex(), roughness: .55 }));
    floor.rotation.x = -Math.PI / 2; scene.add(floor);

    // Four walls; north has the Chamber door, south the way to the Central Lobby, east and west the division lobbies.
    const walls = [
      { z: -D, ry: 0, w: W * 2, door: [DOOR.w, DOOR.h] },
      { z: D, ry: Math.PI, w: W * 2, door: [3, 5] },
      { x: -W, ry: Math.PI / 2, w: D * 2, door: [2.4, 4.4] },
      { x: W, ry: -Math.PI / 2, w: D * 2, door: [2.4, 4.4] },
    ];
    for (const wl of walls) {
      const g = new THREE.Group();
      const wall = archWall(wl.w, H, wl.door[0], wl.door[1], stone, .6); wall.position.z = -.6; g.add(wall);
      const mould = archMoulding(wl.door[0] + .3, wl.door[1] + .2, stoneDark); mould.position.z = .02; g.add(mould);
      // oak panelling to dado height, either side of the door
      const half = (wl.w - wl.door[0]) / 2 - .3;
      for (const side of [-1, 1]) {
        const panel = new THREE.Mesh(new THREE.BoxGeometry(half, 1.6, .08), oak);
        panel.position.set(side * (wl.door[0] / 2 + .3 + half / 2), .8, .04); g.add(panel);
        const rail = new THREE.Mesh(new THREE.BoxGeometry(half, .08, .14), oak); rail.position.set(panel.position.x, 1.62, .06); g.add(rail);
      }
      // blind Gothic arcading above: mullions and a cornice
      for (let x = -wl.w / 2 + 1.2; x < wl.w / 2 - .6; x += 1.6) {
        if (Math.abs(x) < wl.door[0] / 2 + .6) continue;
        const m = new THREE.Mesh(new THREE.BoxGeometry(.12, H - 2.6, .14), stoneDark); m.position.set(x, 1.6 + (H - 2.6) / 2, .07); g.add(m);
      }
      const cornice = new THREE.Mesh(new THREE.BoxGeometry(wl.w, .3, .4), stoneDark); cornice.position.set(0, H - .9, .1); g.add(cornice);
      const string = new THREE.Mesh(new THREE.BoxGeometry(wl.w, .16, .22), stoneDark); string.position.set(0, 5.9, .08); g.add(string);
      g.rotation.y = wl.ry;
      g.position.set(wl.x || 0, 0, wl.z || 0);
      scene.add(g);
    }

    // Beyond the doors: the lit Chamber to the north, dim corridors elsewhere.
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(DOOR.w + .4, DOOR.h + .4), new THREE.MeshBasicMaterial({ color: 0xffd08a, toneMapped: false }));
    glow.position.set(0, DOOR.h / 2, -D - 1.4); scene.add(glow);
    const chamberGreen = new THREE.Mesh(new THREE.BoxGeometry(DOOR.w, .9, .6), new THREE.MeshStandardMaterial({ color: 0x2f5a3c, roughness: .7 }));
    chamberGreen.position.set(0, .45, -D - 1.1); scene.add(chamberGreen);
    for (const [x, z, ry] of [[0, D + 1.4, 0], [-W - 1.4, 0, Math.PI / 2], [W + 1.4, 0, Math.PI / 2]]) {
      const dark = new THREE.Mesh(new THREE.PlaneGeometry(4, 6), new THREE.MeshBasicMaterial({ color: 0x2a1d12 }));
      dark.position.set(x, 3, z); dark.rotation.y = ry; scene.add(dark);
    }
    // brass gates folded back either side of the Chamber door
    for (const side of [-1, 1]) {
      const gate = new THREE.Group();
      for (let i = 0; i < 7; i++) { const bar = new THREE.Mesh(new THREE.CylinderGeometry(.02, .02, 2.4, 6), brass); bar.position.set(i * .1, 1.2, 0); gate.add(bar); }
      const top = new THREE.Mesh(new THREE.BoxGeometry(.7, .05, .05), brass); top.position.set(.3, 2.4, 0); gate.add(top);
      gate.position.set(side * (DOOR.w / 2 + .15) - (side > 0 ? 0 : .6), 0, -D + .15);
      scene.add(gate);
    }

    // Ceiling: dark oak with ribs, and a gasolier in the middle.
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, D * 2), new THREE.MeshStandardMaterial({ color: 0x2a1c10, roughness: .9 }));
    ceil.rotation.x = Math.PI / 2; ceil.position.y = H; scene.add(ceil);
    for (let x = -W + 2.5; x < W; x += 2.5) { const r = new THREE.Mesh(new THREE.BoxGeometry(.25, .35, D * 2), oak); r.position.set(x, H - .17, 0); scene.add(r); }
    for (let z = -D + 2.6; z < D; z += 2.6) { const r = new THREE.Mesh(new THREE.BoxGeometry(W * 2, .3, .2), oak); r.position.set(0, H - .15, z); scene.add(r); }

    const flame = new THREE.MeshBasicMaterial({ color: 0xffd38a });
    function gasolier(x, z, r, n) {
      const g = new THREE.Group();
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(.03, .03, 2.4, 6), brass); rod.position.y = H - 1.2; g.add(rod);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, .04, 6, 32), brass); ring.rotation.x = Math.PI / 2; ring.position.y = H - 2.4; g.add(ring);
      for (let i = 0; i < n; i++) {
        const a = i / n * Math.PI * 2;
        const globe = new THREE.Mesh(new THREE.SphereGeometry(.11, 10, 8), flame);
        globe.position.set(Math.cos(a) * r, H - 2.25, Math.sin(a) * r); g.add(globe);
      }
      g.position.set(x, 0, z);
      scene.add(g);
    }
    gasolier(0, 0, 1.1, 8); gasolier(0, -8, .7, 6); gasolier(0, 8, .7, 6);
    // wall brackets
    for (const [x, z] of [[-W + .3, -6], [-W + .3, 6], [W - .3, -6], [W - .3, 6], [-2.6, -D + .3], [2.6, -D + .3]]) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(.12, 10, 8), flame); b.position.set(x, 3.4, z); scene.add(b);
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(.025, .025, .5, 6), brass); arm.rotation.z = Math.PI / 2; arm.position.set(x + (x < 0 ? -.2 : x > 0 && Math.abs(x) > 5 ? .2 : 0), 3.3, z + (Math.abs(x) < 5 ? -.2 : 0)); scene.add(arm);
    }

    // Statues of past statesmen on plinths in the corners (anonymous, in marble).
    const obstacles = [];
    for (const [x, z] of [[-7.5, -10.2], [7.5, -10.2], [-7.5, 10.2], [7.5, 10.2]]) {
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.5, 1.4), stoneDark); plinth.position.set(x, .75, z); scene.add(plinth);
      const st = person({ coat: 0xece6da, trousers: 0xe4ddcf, skin: 0xefe9de, hat: 'none', hair: 0xe6dfd2 });
      st.traverse((m) => { if (m.isMesh) m.material = marble; });
      st.scale.setScalar(1.3); st.position.set(x, 1.5, z); st.rotation.y = z < 0 ? 0 : Math.PI;
      st.userData.arms[1].rotation.x = -.9;
      scene.add(st);
      obstacles.push({ x, z, r: 1.1 });
    }
    // Leather benches along the side walls, and the doorkeeper's chair by the Chamber door.
    for (const x of [-W + .7, W - .7]) for (const z of [-3.5, 3.5]) {
      const bench = new THREE.Mesh(new THREE.BoxGeometry(.8, .5, 3.4), leather); bench.position.set(x, .25, z); scene.add(bench);
      const back = new THREE.Mesh(new THREE.BoxGeometry(.15, .7, 3.4), leather); back.position.set(x + (x < 0 ? -.35 : .35), .8, z); scene.add(back);
      obstacles.push({ x, z: z - 1.2, r: .6 }, { x, z, r: .6 }, { x, z: z + 1.2, r: .6 });
    }
    const chair = new THREE.Group();
    const seat = new THREE.Mesh(new THREE.BoxGeometry(.9, .55, .8), oak); seat.position.y = .28; chair.add(seat);
    const cback = new THREE.Mesh(new THREE.BoxGeometry(.9, 1.7, .12), oak); cback.position.set(0, 1.1, -.35); chair.add(cback);
    chair.position.set(3.4, 0, -D + 1.2); scene.add(chair);
    obstacles.push({ x: 3.4, z: -D + 1.2, r: .7 });
    // a letter board on the west wall
    const board = new THREE.Mesh(new THREE.BoxGeometry(.08, 1.6, 2.4), oak); board.position.set(-W + .1, 2.6, -9); scene.add(board);
    const notices = new THREE.Mesh(new THREE.BoxGeometry(.02, 1.2, 2), new THREE.MeshStandardMaterial({ color: 0xe9dfc6, roughness: .9 })); notices.position.set(-W + .16, 2.6, -9); scene.add(notices);

    return obstacles;
  }

  function lights(scene) {
    scene.add(new THREE.HemisphereLight(0xffe2b8, 0x2e2012, .42));
    const key = new THREE.PointLight(0xffc27a, 1.25, 26, 1.6); key.position.set(0, H - 2.4, 0); scene.add(key);
    const north = new THREE.PointLight(0xffc27a, .9, 18, 1.6); north.position.set(0, H - 2.4, -8); scene.add(north);
    const south = new THREE.PointLight(0xffc27a, .7, 18, 1.6); south.position.set(0, H - 2.4, 8); scene.add(south);
    const chamber = new THREE.PointLight(0xffd9a0, 1.1, 10, 2); chamber.position.set(0, 3, -D - .6); scene.add(chamber);
  }

  /* ───────── Open the Lobby ───────── */

  function open(o) {
    const root = document.createElement('div');
    root.className = 'lobby';
    root.innerHTML = `
      <div class="lobby-bar"><span class="lobby-title">${esc(o.title || "The Members' Lobby")}</span>
        <button class="btn" data-act="leave">Leave the Lobby</button></div>
      <div class="lobby-tags"></div>
      <div class="lobby-prompt" hidden></div>
      <div class="lobby-help">${'ontouchstart' in window ? 'Thumb-stick to walk · drag to look round · tap a name to talk' : 'WASD or arrow keys to walk · drag to look round · E to talk'}</div>
      <div class="lobby-stick" aria-hidden="true"><span></span></div>
      <div class="lobby-dialog" hidden></div>`;
    document.body.appendChild(root);
    document.body.classList.add('in-lobby');
    const $ = (q) => root.querySelector(q);
    const talked = new Set(o.talked || []);
    const npcs = o.npcs;

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

    // The conversation panel, shared by the 3D view and the fallback list.
    let talking = null;
    let refreshTags = () => {};
    function talkTo(npc) {
      if (talked.has(npc.id)) {
        showDialog(`<h3>${esc(npc.name)}</h3><p class="muted">${esc(npc.role)}</p><p>${esc(npc.after || 'You have had your conversation. He nods to you, and goes on talking to someone else.')}</p>
          <div class="row"><button class="btn" data-act="close">Walk on</button></div>`);
        return;
      }
      talking = npc;
      showDialog(`<h3>${esc(npc.name)}</h3><p class="muted">${esc(npc.role)}</p><p>${esc(TM.fill(npc.talk.text, TM.state))}</p>
        <div class="choices">${npc.talk.choices.map((c, i) => `<button class="choice" data-key="${'abcd'[i]}" data-i="${i}">${esc(TM.fill(c.label, TM.state))}</button>`).join('')}</div>`);
      root.querySelectorAll('.lobby-dialog .choice').forEach((b) => b.addEventListener('click', () => {
        const res = o.onTalk(npc, +b.dataset.i);
        talked.add(npc.id);
        talking = null;
        showDialog(`<h3>${esc(npc.name)}</h3><p>${esc(res || '')}</p><div class="row"><button class="btn" data-act="close">Walk on</button></div>`);
        refreshTags();
      }));
    }
    function showDialog(html) {
      const d = $('.lobby-dialog'); d.innerHTML = html; d.hidden = false;
      const c = d.querySelector('[data-act="close"]'); if (c) c.addEventListener('click', closeDialog);
      const first = d.querySelector('button'); if (first) first.focus({ preventScroll: true });
    }
    function closeDialog() { $('.lobby-dialog').hidden = true; talking = null; }

    if (!window.THREE || !webglOk()) {
      // No 3D on this device: the same conversations as a list.
      $('.lobby-help').textContent = 'This device cannot draw the Lobby in 3D, so here is who is in it.';
      $('.lobby-stick').remove();
      const list = document.createElement('div'); list.className = 'lobby-list';
      const draw = () => { list.innerHTML = npcs.map((n) => `<button class="choice" data-id="${esc(n.id)}">${esc(n.name)} <span class="lock">${esc(n.role)}${talked.has(n.id) ? ' · spoken to' : ''}</span></button>`).join(''); list.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => talkTo(npcs.find((n) => n.id === b.dataset.id)))); };
      draw(); root.appendChild(list);
      refreshTags = draw;
      return { leave };
    }

    /* three.js scene */
    const canvas = document.createElement('canvas'); canvas.className = 'lobby-canvas'; root.prepend(canvas);
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = .92;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x140e09);
    scene.fog = new THREE.Fog(0x1a120b, 16, 42);
    const camera = new THREE.PerspectiveCamera(58, 1, .1, 120);
    const obstacles = buildRoom(scene);
    lights(scene);

    // the player's Member
    const me = person({ coat: 0x16161c, trousers: 0x3a3a40, whiskers: null });
    me.position.set(0, 0, 9); me.rotation.y = Math.PI; scene.add(me);
    let heading = Math.PI;                      // the way the Member faces (0 = towards +z)

    // everyone else
    const figures = npcs.map((n) => {
      const f = person(n.look || {});
      f.position.set(n.at[0], 0, n.at[1]); f.rotation.y = n.face || 0;
      scene.add(f);
      const tag = document.createElement('button'); tag.className = 'lobby-tag'; tag.type = 'button';
      tag.innerHTML = `<b>${esc(n.name)}</b><i>${esc(n.role)}</i>`;
      tag.addEventListener('click', () => { if (dist(n) < 3.2) talkTo(n); else { target = n; } });
      $('.lobby-tags').appendChild(tag);
      obstacles.push({ x: n.at[0], z: n.at[1], r: .55 });
      return { n, f, tag };
    });
    refreshTags = () => figures.forEach(({ n, tag }) => tag.classList.toggle('done', talked.has(n.id)));
    refreshTags();
    let target = null;                          // a figure tapped from afar: walk towards them

    // camera orbit
    let camYaw = 0, camPitch = .3;            // camYaw 0: camera south of the Member, looking north
    const keys = new Set();
    const stick = { x: 0, y: 0, id: null };

    on(window, 'keydown', (e) => {
      if (!$('.lobby-dialog').hidden) { if (e.key === 'Escape') closeDialog(); return; }
      if (e.key === 'Escape') return leave();
      keys.add(e.key.toLowerCase());
      if ((e.key === 'e' || e.key === 'E' || e.key === 'Enter') && near) { e.preventDefault(); act(); }
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(e.key.toLowerCase())) e.preventDefault();
    });
    on(window, 'keyup', (e) => keys.delete(e.key.toLowerCase()));
    on(window, 'blur', () => keys.clear());

    // drag to look (mouse or a touch that is not on the stick)
    let drag = null;
    on(canvas, 'pointerdown', (e) => { if (e.pointerId === stick.id) return; drag = { id: e.pointerId, x: e.clientX, y: e.clientY }; canvas.setPointerCapture(e.pointerId); });
    on(canvas, 'pointermove', (e) => {
      if (!drag || drag.id !== e.pointerId) return;
      camYaw -= (e.clientX - drag.x) * .006; camPitch = Math.max(.08, Math.min(.85, camPitch + (e.clientY - drag.y) * .004));
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

    // what is within reach
    let near = null;
    const dist = (n) => Math.hypot(me.position.x - n.at[0], me.position.z - n.at[1]);
    const atDoor = () => me.position.z < -D + 1.4 && Math.abs(me.position.x) < DOOR.w / 2;
    function act() { if (near === 'door') leave(); else if (near) talkTo(near); }
    on($('.lobby-prompt'), 'click', act);

    function resize() {
      const w = root.clientWidth, h = root.clientHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w < h ? 72 : 58; camera.updateProjectionMatrix();
    }
    on(window, 'resize', resize); resize();

    const tmp = new THREE.Vector3();
    let last = performance.now();
    function frame(now) {
      if (closed) return;
      const dt = Math.min(.05, (now - last) / 1000); last = now;

      // input → a direction relative to the camera
      let fx = 0, fz = 0;
      if ($('.lobby-dialog').hidden) {
        if (keys.has('w') || keys.has('arrowup')) fz += 1;
        if (keys.has('s') || keys.has('arrowdown')) fz -= 1;
        if (keys.has('a') || keys.has('arrowleft')) fx -= 1;
        if (keys.has('d') || keys.has('arrowright')) fx += 1;
        fx += stick.x; fz -= stick.y;
        if (target && !fx && !fz) {
          const tx = target.at[0] - me.position.x, tz = target.at[1] - me.position.z;
          if (Math.hypot(tx, tz) < 2.2) { const t = target; target = null; talkTo(t); }
          else { heading = Math.atan2(tx, tz); fx = 0; fz = 0; moveAlong(Math.sin(heading), Math.cos(heading), dt, 1); }
        } else if (fx || fz) target = null;
      }
      let speed = 0;
      if (fx || fz) {
        const m = Math.min(1, Math.hypot(fx, fz));
        // camera forward on the floor
        const cfx = -Math.sin(camYaw), cfz = -Math.cos(camYaw);
        const crx = -cfz, crz = cfx;
        let dx = cfx * fz - crx * fx, dz = cfz * fz - crz * fx;
        const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l;
        const want = Math.atan2(dx, dz);
        let diff = want - heading; diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        heading += diff * Math.min(1, dt * 12);
        speed = moveAlong(dx, dz, dt, m);
      } else if (target) speed = 1;
      me.rotation.y = heading;
      animateWalk(me, speed, dt);
      figures.forEach(({ f }, i) => {
        animateWalk(f, 0, dt);
        f.userData.arms[1].rotation.x = Math.sin(now / 900 + i) * .12 - .15;   // idle gesturing
      });

      // camera trails behind and above, and eases round to follow the Member when walking
      if (speed > .1 && !drag) { let d = (heading + Math.PI) - camYaw; d = Math.atan2(Math.sin(d), Math.cos(d)); camYaw += d * Math.min(1, dt * 1.6); }
      const dist3 = 4.4;
      const cx = me.position.x + Math.sin(camYaw) * dist3 * Math.cos(camPitch);
      const cz = me.position.z + Math.cos(camYaw) * dist3 * Math.cos(camPitch);
      const cy = 1.7 + Math.sin(camPitch) * dist3;
      camera.position.lerp(tmp.set(Math.max(-W + .4, Math.min(W - .4, cx)), cy, Math.max(-D + .4, Math.min(D - .4, cz))), Math.min(1, dt * 8));
      camera.lookAt(me.position.x, 1.55, me.position.z);

      // who is in reach
      near = null; let best = 2.4;
      for (const { n } of figures) { const d = dist(n); if (d < best) { best = d; near = n; } }
      if (!near && atDoor()) near = 'door';
      const prompt = $('.lobby-prompt');
      if (near && $('.lobby-dialog').hidden) {
        prompt.hidden = false;
        prompt.textContent = near === 'door' ? 'Go back into the Chamber' : `${talked.has(near.id) ? 'Nod to' : 'Talk to'} ${near.name}`;
      } else prompt.hidden = true;

      // name tags over heads
      const w = root.clientWidth, h = root.clientHeight;
      for (const { n, f, tag } of figures) {
        tmp.set(f.position.x, 2.35, f.position.z).project(camera);
        const far = dist(n) > 14;
        if (tmp.z > 1 || far) { tag.style.display = 'none'; continue; }
        tag.style.display = '';
        tag.style.transform = `translate(-50%, -100%) translate(${(tmp.x + 1) / 2 * w}px, ${(1 - tmp.y) / 2 * h}px)`;
        tag.classList.toggle('near', near === n);
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }

    function moveAlong(dx, dz, dt, m) {
      const v = 3.1 * m * dt;
      let nx = me.position.x + dx * v, nz = me.position.z + dz * v;
      // stay inside the room, except through the Chamber door a little way
      const inDoor = Math.abs(nx) < DOOR.w / 2 - .3;
      nx = Math.max(-W + .5, Math.min(W - .5, nx));
      nz = Math.max(inDoor ? -D - .4 : -D + .5, Math.min(D - .5, nz));
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

  TM.Lobby = { open };
})();
