/* Walkable places, built for js/walk.js. Each builder adds its room or street to the scene and
   returns { start, clamp, camClamp, exit, obstacles, dust, exposure, update }.
   Units are metres; y is up; a heading of 0 faces +z and π faces −z (north on these plans). */
(function () {
  const TM = window.TM;
  TM.Places = TM.Places || {};
  const P = TM.Places;
  const clampTo = (x0, x1, z0, z1) => (x, z) => [Math.max(x0, Math.min(x1, x)), Math.max(z0, Math.min(z1, z))];

  /* ───────── Shared textures ───────── */

  const T = {};
  // Encaustic Minton tiles: buff, red and black, with a quatrefoil.
  T.minton = (k) => k.tex(512, (g, n) => {
    const s = n / 4;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
      const x = i * s, y = j * s;
      g.fillStyle = (i + j) % 2 ? '#6e3426' : '#cdb894'; g.fillRect(x, y, s, s);
      g.fillStyle = (i + j) % 2 ? '#bfa97f' : '#55291e';
      g.beginPath();
      for (let a = 0; a < 4; a++) { const ang = a * Math.PI / 2; g.moveTo(x + s / 2, y + s / 2); g.arc(x + s / 2 + Math.cos(ang) * s * .16, y + s / 2 + Math.sin(ang) * s * .16, s * .14, 0, Math.PI * 2); }
      g.fill();
      g.fillStyle = '#1d1712'; g.beginPath(); g.arc(x + s / 2, y + s / 2, s * .07, 0, Math.PI * 2); g.fill();
      g.strokeStyle = 'rgba(30,20,12,.6)'; g.lineWidth = 3; g.strokeRect(x + 1.5, y + 1.5, s - 3, s - 3);
    }
    for (let i = 0; i < 1400; i++) { g.fillStyle = `rgba(${Math.random() < .5 ? '255,240,210' : '20,10,5'},${Math.random() * .06})`; g.fillRect(Math.random() * n, Math.random() * n, 2, 2); }
  });
  // Ashlar stone in courses.
  T.ashlar = (g, n) => {
    g.fillStyle = '#6a5a40'; g.fillRect(0, 0, n, n);
    const rowH = n / 8;
    for (let r = 0; r < 8; r++) {
      const off = r % 2 ? n / 6 : 0;
      for (let x = -off; x < n; x += n / 3) {
        const shade = 168 + Math.floor(Math.random() * 26);
        g.fillStyle = `rgb(${shade + 14},${shade},${shade - 30})`;
        g.fillRect(x + 3, r * rowH + 3, n / 3 - 6, rowH - 6);
      }
    }
    for (let i = 0; i < 2500; i++) { g.fillStyle = `rgba(60,40,20,${Math.random() * .08})`; g.fillRect(Math.random() * n, Math.random() * n, 1.5, 1.5); }
  };
  // Dark oak linenfold panelling.
  T.linenfold = (g, n) => {
    g.fillStyle = '#2e1d10'; g.fillRect(0, 0, n, n);
    for (let i = 0; i < 4; i++) {
      const x = i * n / 4;
      g.fillStyle = '#4a311c'; g.fillRect(x + 6, 10, n / 4 - 12, n - 20);
      for (let f = 0; f < 4; f++) { g.fillStyle = f % 2 ? '#5a3d24' : '#35210f'; g.fillRect(x + 12 + f * ((n / 4 - 24) / 4), 18, (n / 4 - 24) / 4, n - 36); }
    }
    for (let i = 0; i < 300; i++) { g.strokeStyle = `rgba(0,0,0,${Math.random() * .15})`; g.beginPath(); const y = Math.random() * n; g.moveTo(0, y); g.lineTo(n, y + Math.random() * 4); g.stroke(); }
  };
  // Leaded stained glass in jewel colours.
  T.stained = (k) => k.tex(256, (g, n) => {
    const cols = ['#7a1f2b', '#1f3f7a', '#b08a2a', '#2c6a3f', '#5a2a6a', '#c9b48a'];
    const s = n / 8;
    for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { g.fillStyle = cols[(i * 3 + j * 5 + (i * j) % 3) % cols.length]; g.fillRect(i * s, j * s, s, s); }
    g.strokeStyle = '#0d0b0a'; g.lineWidth = 4;
    for (let i = 0; i <= 8; i++) { g.beginPath(); g.moveTo(i * s, 0); g.lineTo(i * s, n); g.stroke(); g.beginPath(); g.moveTo(0, i * s); g.lineTo(n, i * s); g.stroke(); }
    g.lineWidth = 2; for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { g.beginPath(); g.arc(i * s + s / 2, j * s + s / 2, s * .3, 0, Math.PI * 2); g.stroke(); }
  });
  // Windows lit from inside, in rows, for distant façades.
  T.windows = (k, cols, rows, lit, base) => k.tex(256, (g, n) => {
    g.fillStyle = base || '#1a1714'; g.fillRect(0, 0, n, n);
    const w = n / cols, h = n / rows;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const on = Math.random() < lit;
      g.fillStyle = on ? `rgba(255,${190 + Math.random() * 40 | 0},${110 + Math.random() * 40 | 0},${.75 + Math.random() * .25})` : 'rgba(10,10,14,.9)';
      g.fillRect(i * w + w * .3, j * h + h * .2, w * .4, h * .55);
    }
  });

  /* ───────── The Members' Lobby ───────── */

  P.lobby = function (scene, k, opt) {
    const W = 10, D = 13, H = 9, DOOR = { w: 3.2, h: 5.6 };
    scene.background = new THREE.Color(0x140e09);
    scene.fog = new THREE.Fog(0x1a120b, 18, 44);
    const stoneMap = k.tex(512, T.ashlar, [3, 1.6]);
    const stone = k.mat({ map: stoneMap, bumpMap: k.bump(512, T.ashlar, [3, 1.6]), bumpScale: .03, roughness: .92 });
    const stoneDark = k.mat({ color: 0x8c7a58, roughness: .9 });
    const oak = k.mat({ map: k.tex(256, T.linenfold, [10, 1]), bumpMap: k.bump(256, T.linenfold, [10, 1]), bumpScale: .02, roughness: .6 });
    const brass = k.mat({ color: 0xc9a050, roughness: .3, metalness: .9 });
    const marble = k.mat({ color: 0xece6da, roughness: .4 });
    const leather = k.mat({ color: 0x23432f, roughness: .55 });

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, D * 2), k.mat({ map: (() => { const t = T.minton(k); t.repeat.set(9, 11.7); return t; })(), roughness: .35, metalness: .05 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);

    const walls = [
      { z: -D, ry: 0, w: W * 2, door: [DOOR.w, DOOR.h] },
      { z: D, ry: Math.PI, w: W * 2, door: [3, 5] },
      { x: -W, ry: Math.PI / 2, w: D * 2, door: [2.4, 4.4] },
      { x: W, ry: -Math.PI / 2, w: D * 2, door: [2.4, 4.4] },
    ];
    for (const wl of walls) {
      const g = new THREE.Group();
      const wall = k.archWall(wl.w, H, wl.door[0], wl.door[1], stone, .6); wall.position.z = -.6; g.add(wall);
      const mould = k.archMoulding(wl.door[0] + .3, wl.door[1] + .2, stoneDark); mould.position.z = .02; g.add(mould);
      const half = (wl.w - wl.door[0]) / 2 - .3;
      for (const side of [-1, 1]) {
        const px = side * (wl.door[0] / 2 + .3 + half / 2);
        k.box(half, 1.8, .08, oak, px, .9, .04, g);
        k.box(half, .08, .16, oak, px, 1.84, .07, g);
      }
      for (let x = -wl.w / 2 + 1.2; x < wl.w / 2 - .6; x += 1.6) {
        if (Math.abs(x) < wl.door[0] / 2 + .6) continue;
        k.box(.12, H - 2.8, .14, stoneDark, x, 1.9 + (H - 2.8) / 2, .07, g);
        // a pointed arch heading each bay of blind arcading
        const a = k.archMoulding(1.4, 1.3, stoneDark, .05); a.position.set(x + .8, H - 2.4, .1); g.add(a);
      }
      k.box(wl.w, .3, .4, stoneDark, 0, H - .9, .1, g);
      k.box(wl.w, .16, .22, stoneDark, 0, 5.9, .08, g);
      g.rotation.y = wl.ry; g.position.set(wl.x || 0, 0, wl.z || 0);
      scene.add(g);
    }
    // the lit Chamber beyond the north door
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(DOOR.w + .4, DOOR.h + .4), new THREE.MeshBasicMaterial({ color: 0xffd08a, toneMapped: false }));
    glow.position.set(0, DOOR.h / 2, -D - 1.4); scene.add(glow);
    k.box(DOOR.w, .9, .6, k.mat({ color: 0x2f5a3c }), 0, .45, -D - 1.1, scene);
    for (const [x, z, ry] of [[0, D + 1.4, 0], [-W - 1.4, 0, Math.PI / 2], [W + 1.4, 0, Math.PI / 2]]) {
      const dark = new THREE.Mesh(new THREE.PlaneGeometry(4, 6), new THREE.MeshBasicMaterial({ color: 0x2a1d12 })); dark.position.set(x, 3, z); dark.rotation.y = ry; scene.add(dark);
    }
    for (const side of [-1, 1]) {
      const gate = new THREE.Group();
      for (let i = 0; i < 7; i++) k.cyl(.02, .02, 2.4, brass, i * .1, 1.2, 0, gate, 6);
      k.box(.7, .05, .05, brass, .3, 2.4, 0, gate);
      gate.position.set(side * (DOOR.w / 2 + .15) - (side > 0 ? 0 : .6), 0, -D + .15);
      scene.add(gate);
    }
    // ceiling: dark oak ribs
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, D * 2), k.mat({ color: 0x2a1c10, roughness: .9 })); ceil.rotation.x = Math.PI / 2; ceil.position.y = H; scene.add(ceil);
    for (let x = -W + 2.5; x < W; x += 2.5) k.box(.25, .35, D * 2, oak, x, H - .17, 0, scene);
    for (let z = -D + 2.6; z < D; z += 2.6) k.box(W * 2, .3, .2, oak, 0, H - .15, z, scene);

    // gasoliers and wall brackets, each globe with a halo
    function gasolier(x, z, r, n) {
      k.cyl(.03, .03, 2.4, brass, x, H - 1.2, z, scene, 6);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, .04, 6, 32), brass); ring.rotation.x = Math.PI / 2; ring.position.set(x, H - 2.4, z); scene.add(ring);
      for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; k.globe(scene, x + Math.cos(a) * r, H - 2.25, z + Math.sin(a) * r, { halo: 1.1, opacity: .55 }); }
    }
    gasolier(0, 0, 1.1, 8); gasolier(0, -8, .7, 6); gasolier(0, 8, .7, 6);
    for (const [x, z] of [[-W + .35, -6], [-W + .35, 6], [W - .35, -6], [W - .35, 6], [-2.6, -D + .35], [2.6, -D + .35]]) k.globe(scene, x, 3.4, z, { halo: 1.6, opacity: .7 });

    const obstacles = [];
    for (const [x, z] of [[-7.5, -10.2], [7.5, -10.2], [-7.5, 10.2], [7.5, 10.2]]) {
      k.box(1.4, 1.5, 1.4, stoneDark, x, .75, z, scene);
      const st = k.person({ hat: 'none' });
      st.traverse((m) => { if (m.isMesh) m.material = marble; });
      st.scale.setScalar(1.3); st.position.set(x, 1.5, z); st.rotation.y = z < 0 ? 0 : Math.PI;
      st.userData.arms[1].rotation.x = -.9;
      scene.add(st);
      obstacles.push({ x, z, r: 1.1 });
    }
    for (const x of [-W + .7, W - .7]) for (const z of [-3.5, 3.5]) {
      k.box(.8, .5, 3.4, leather, x, .25, z, scene);
      k.box(.15, .7, 3.4, leather, x + (x < 0 ? -.35 : .35), .8, z, scene);
      obstacles.push({ x, z: z - 1.2, r: .6 }, { x, z, r: .6 }, { x, z: z + 1.2, r: .6 });
    }
    const chair = new THREE.Group();
    k.box(.9, .55, .8, oak, 0, .28, 0, chair); k.box(.9, 1.7, .12, oak, 0, 1.1, -.35, chair);
    chair.position.set(3.4, 0, -D + 1.2); scene.add(chair);
    obstacles.push({ x: 3.4, z: -D + 1.2, r: .7 });
    k.box(.08, 1.6, 2.4, oak, -W + .1, 2.6, -9, scene);
    k.box(.02, 1.2, 2, k.mat({ color: 0xe9dfc6 }), -W + .16, 2.6, -9, scene);
    // a few Members about their business
    k.extras(scene, [[-6.2, 0, 8.6, 2.4], [-5.6, 0, 8.1, -.6], [8.4, 0, -1.2, -1.6], [-8.4, 0, 3.5, 1.57, false]]);

    // light: warm fill, and one key light under the great gasolier that throws soft shadows
    scene.add(new THREE.HemisphereLight(0xffe2b8, 0x2e2012, .38));
    const key = new THREE.SpotLight(0xffc27a, 2.4, 40, Math.PI / 2.6, .7, 1.2);
    key.position.set(0, H - 2.6, 0); key.target.position.set(0, 0, 0);
    key.castShadow = true; key.shadow.mapSize.set(opt.coarse ? 512 : 1024, opt.coarse ? 512 : 1024); key.shadow.bias = -.0006; key.shadow.radius = 4;
    scene.add(key, key.target);
    for (const z of [-8, 8]) { const l = new THREE.PointLight(0xffc27a, .8, 18, 1.6); l.position.set(0, H - 2.4, z); scene.add(l); }
    const ch = new THREE.PointLight(0xffd9a0, 1.1, 10, 2); ch.position.set(0, 3, -D - .6); scene.add(ch);

    return {
      start: { x: 0, z: 9, heading: Math.PI },
      clamp: (x, z) => { const inDoor = Math.abs(x) < DOOR.w / 2 - .3; return [Math.max(-W + .5, Math.min(W - .5, x)), Math.max(inDoor ? -D - .4 : -D + .5, Math.min(D - .5, z))]; },
      camClamp: clampTo(-W + .4, W - .4, -D + .4, D - .4),
      exit: { test: (x, z) => z < -D + 1.4 && Math.abs(x) < DOOR.w / 2, label: 'Go back into the Chamber', always: true },
      obstacles, dust: [-W, W, .5, H - 1, -D, D], exposure: .95,
    };
  };

  /* ───────── The House of Commons ───────── */
  // Barry's Chamber as it was before 1941: green benches in tiers either side of the floor,
  // the Speaker's chair at the north end, the Table with the mace, galleries all round.

  P.commons = function (scene, k, opt) {
    const W = 7.6, D = 16, H = 13;
    scene.background = new THREE.Color(0x0f0b08);
    scene.fog = new THREE.Fog(0x1a1209, 20, 48);
    const oakMap = k.tex(256, T.linenfold, [6, 1]);
    const oak = k.mat({ map: oakMap, bumpMap: k.bump(256, T.linenfold, [6, 1]), bumpScale: .02, roughness: .55 });
    const oakPlain = k.mat({ color: 0x3a2412, roughness: .6 });
    const green = k.mat({ color: 0x1f4a30, roughness: .5 });
    const greenDark = k.mat({ color: 0x173a25, roughness: .55 });
    const brass = k.mat({ color: 0xc9a050, roughness: .3, metalness: .9 });
    const gold = k.mat({ color: 0xd8b04a, roughness: .25, metalness: 1 });
    const stone = k.mat({ map: k.tex(512, T.ashlar, [3, 1.4]), roughness: .9 });

    // the floor: a dark carpet with the red lines a sword's length apart
    const carpet = k.tex(256, (g, n) => {
      g.fillStyle = '#2c2a1c'; g.fillRect(0, 0, n, n);
      for (let i = 0; i < 2000; i++) { g.fillStyle = `rgba(${Math.random() < .5 ? '80,70,40' : '10,10,6'},.25)`; g.fillRect(Math.random() * n, Math.random() * n, 2, 2); }
    }, [4, 8]);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, D * 2), k.mat({ map: carpet, roughness: .95 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
    for (const x of [-1.95, 1.95]) { const line = new THREE.Mesh(new THREE.PlaneGeometry(.08, 24), k.mat({ color: 0x8a1c1c })); line.rotation.x = -Math.PI / 2; line.position.set(x, .01, 0); scene.add(line); }
    const bar = new THREE.Mesh(new THREE.PlaneGeometry(4.6, .08), k.mat({ color: 0xd9d2c0 })); bar.rotation.x = -Math.PI / 2; bar.position.set(0, .01, 12.6); scene.add(bar);

    // benches: five tiers each side, broken by the gangway
    const tiers = 5, step = .4, depth = .9, x0 = 2.4;
    const segs = [[-11.2, 1.5], [2.7, 11.6]];
    for (const side of [-1, 1]) for (let i = 0; i < tiers; i++) for (const [za, zb] of segs) {
      const L = zb - za, zc = (za + zb) / 2, x = side * (x0 + i * depth + depth / 2);
      if (i) k.box(depth, i * step, L, oakPlain, x, i * step / 2, zc, scene);
      k.box(.58, .14, L, green, x + side * .05, i * step + .4, zc, scene);       // the cushion
      k.box(.6, .33, L - .02, oakPlain, x + side * .05, i * step + .17, zc, scene);
      k.box(.1, .55, L, greenDark, x + side * (depth / 2 - .06), i * step + .72, zc, scene);  // the back
    }
    // the floor of the House ends at the front bench; a brass foot rail runs along it
    for (const side of [-1, 1]) for (const [za, zb] of segs) k.box(.04, .04, zb - za, brass, side * 2.32, .18, (za + zb) / 2, scene);
    // panelled walls behind the top tier, stone above, tall pointed windows of stained glass
    for (const side of [-1, 1]) {
      k.box(.3, 5.2, D * 2, oak, side * W, 2.6, 0, scene);
      k.box(.6, H - 5.2, D * 2, stone, side * (W + .15), 5.2 + (H - 5.2) / 2, 0, scene);
      for (let z = -12; z <= 12; z += 4) {
        const glass = new THREE.Mesh(new THREE.ShapeGeometry(k.archShape(1.6, 4.2)), new THREE.MeshBasicMaterial({ map: T.stained(k), color: 0x8a7a66, toneMapped: false }));
        glass.position.set(side * (W - .16), 6.6, z); glass.rotation.y = -side * Math.PI / 2; scene.add(glass);
        const m = k.archMoulding(1.7, 4.3, k.mat({ color: 0x9a8a68 }), .07); m.position.set(side * (W - .2), 6.55, z); m.rotation.y = -side * Math.PI / 2; scene.add(m);
        const hal = k.glow(0x8fa0d8, 3.2, .18); hal.position.set(side * (W - .6), 8.4, z); scene.add(hal);
      }
    }
    // the north and south ends
    k.box(W * 2, H, .4, oak, 0, H / 2, -D, scene);
    k.box(W * 2, H, .4, oak, 0, H / 2, D, scene);
    const door = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3.6), new THREE.MeshBasicMaterial({ color: 0xffcf8a, toneMapped: false })); door.position.set(0, 1.8, D - .21); door.rotation.y = Math.PI; scene.add(door);

    // galleries on all four sides, with brass rails and a few spectators
    for (const side of [-1, 1]) {
      k.box(2.2, .3, D * 2 - 2, oakPlain, side * (W - 1.1), 5.6, 0, scene);
      k.box(.06, .9, D * 2 - 2, brass, side * (W - 2.2), 6.2, 0, scene);
      k.box(.1, .8, D * 2 - 2, oak, side * (W - 2.2), 6.1, 0, scene);
    }
    for (const z of [-D + 1.1, D - 1.1]) { k.box(W * 2 - 4.4, .3, 2.2, oakPlain, 0, 5.8, z, scene); k.box(W * 2 - 4.4, .9, .1, oak, 0, 6.3, z + (z < 0 ? 1.1 : -1.1), scene); }
    k.extras(scene, [[-6.4, 5.75, -6, Math.PI / 2, true], [-6.4, 5.75, -3, Math.PI / 2, true], [6.4, 5.75, 4, -Math.PI / 2, true], [6.4, 5.75, 8, -Math.PI / 2, true], [-2, 5.95, -D + 1.3, 0, true], [1.2, 5.95, -D + 1.3, 0, true], [.5, 5.95, D - 1.3, Math.PI, true]]
      .map(([x, y, z, f, s]) => [x, y - .45, z, f, s]));

    // the ceiling: oak panels on a grid, lit from above through glass
    k.box(W * 2, .3, D * 2, oakPlain, 0, H, 0, scene);
    for (let x = -W + 1.9; x < W; x += 1.9) k.box(.18, .3, D * 2, oak, x, H - .25, 0, scene);
    for (let z = -D + 2; z < D; z += 2) k.box(W * 2, .3, .18, oak, 0, H - .25, z, scene);
    for (let z = -12; z <= 12; z += 4) { const p = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.8), new THREE.MeshBasicMaterial({ color: 0xffe0aa, toneMapped: false, transparent: true, opacity: .55 })); p.rotation.x = Math.PI / 2; p.position.set(0, H - .42, z); scene.add(p); }

    // the Speaker's chair under its canopy, on a dais
    const chair = new THREE.Group();
    k.box(2.6, .4, 2.2, oakPlain, 0, .2, 0, chair);
    k.box(1.2, .6, .9, green, 0, .7, 0, chair);
    k.box(1.4, 3.4, .3, oak, 0, 2.1, -.55, chair);
    const canopy = new THREE.Mesh(new THREE.ExtrudeGeometry(k.archShape(1.8, 2.2), { depth: 1.2, bevelEnabled: false }), oak);
    canopy.position.set(0, 3.6, -.7); canopy.castShadow = true; chair.add(canopy);
    const crown = new THREE.Mesh(new THREE.ConeGeometry(.2, .9, 4), gold); crown.position.set(0, 6.2, -.1); chair.add(crown);
    chair.position.set(0, 0, -12.8); scene.add(chair);
    const speaker = k.person({ hat: 'none', hair: 0xe6e1d6, sit: true }); speaker.position.set(0, -.02, -12.7); scene.add(speaker);

    // the Table of the House: clerks' chairs, the despatch boxes, the mace on its brackets
    k.box(1.7, .9, 4.6, oakPlain, 0, .45, -7, scene);
    k.box(1.6, .04, 4.5, k.mat({ color: 0x2d4a33 }), 0, .92, -7, scene);
    for (const x of [-.55, .55]) { k.box(.5, .3, .35, k.mat({ color: 0x5a3a1e, roughness: .5 }), x, 1.1, -5.6, scene); k.box(.52, .03, .37, brass, x, 1.26, -5.6, scene); }
    for (let i = 0; i < 6; i++) k.box(.18, .26, .24, k.mat({ color: [0x6a1a1a, 0x1a2a5a, 0x3a2a1a][i % 3] }), -.5 + i * .2, 1.07, -8.7, scene);
    const mace = k.cyl(.04, .04, 1.5, gold, 0, 1.12, -4.95, scene, 10); mace.rotation.z = Math.PI / 2;
    k.cyl(.1, .07, .22, gold, .8, 1.12, -4.95, scene, 10).rotation.z = Math.PI / 2;
    for (const x of [-.45, 0, .45]) { const c = k.person({ hat: 'none', hair: 0xeeeae0, sit: true }); c.position.set(x, -.45, -9.6); scene.add(c); }   // clerks in wigs

    // Members on the benches
    const seated = [];
    const sides = [[-1, Math.PI / 2], [1, -Math.PI / 2]];
    let n = 0;
    for (const [side, face] of sides) for (let i = 0; i < tiers; i++) for (let z = -10.4; z < 11.2; z += 1.6) {
      if ((z > 1.2 && z < 2.9) || Math.random() < .55) continue;
      if (side < 0 && i === 1 && Math.abs(z + 6) < 1.2) continue;       // leave the seats the player may take
      if (side < 0 && i === 0 && Math.abs(z - 5) < 1.2) continue;
      if (side > 0 && i === 2 && Math.abs(z + 2) < 1.2) continue;
      if (n++ > (opt.coarse ? 26 : 44)) break;
      seated.push([side * (x0 + i * depth + .35), i * step - .42, z + (Math.random() - .5) * .3, face, true]);
    }
    k.extras(scene, seated);

    scene.add(new THREE.HemisphereLight(0xfff0d4, 0x2a1d10, .34));
    const key = new THREE.SpotLight(0xffe2b0, 1.5, 50, Math.PI / 2.8, .8, 1);
    key.position.set(0, H - .6, -1); key.target.position.set(0, 0, -1);
    key.castShadow = true; key.shadow.mapSize.set(opt.coarse ? 512 : 1024, opt.coarse ? 512 : 1024); key.shadow.bias = -.0006; key.shadow.radius = 4;
    scene.add(key, key.target);
    for (const z of [-10, 9]) { const l = new THREE.PointLight(0xffd29a, .7, 22, 1.4); l.position.set(0, H - 1.2, z); scene.add(l); }
    const sp = new THREE.PointLight(0xffd29a, .6, 8, 2); sp.position.set(0, 3, -10.5); scene.add(sp);

    return {
      start: { x: 0, z: 14, heading: Math.PI },
      clamp: clampTo(-2.15, 2.15, -11.4, 15.2),
      camClamp: clampTo(-6.2, 6.2, -14, 15.4),
      exit: { test: (x, z) => z > 14.4, label: 'Go out to the Members\' Lobby', always: true },
      obstacles: [{ x: 0, z: -9, r: 1 }, { x: 0, z: -7.4, r: 1 }, { x: 0, z: -5.6, r: 1 }, { x: 0, z: -11.4, r: 1.3 }],
      dust: [-W, W, 1, H - 1, -D, D], exposure: .9,
    };
  };
  P.commons.seat = (side, tier, z) => [side * (2.4 + tier * .9 + .35), tier * .4 - .42, z, side < 0 ? Math.PI / 2 : -Math.PI / 2];

  /* ───────── The Carlton Club, Pall Mall ───────── */
  // Sydney Smirke's Italianate clubhouse: granite columns, a coffered ceiling with a glass
  // lantern, crimson walls, a staircase, coal fires, leather chairs and dead statesmen in oils.

  P.carlton = function (scene, k, opt) {
    const W = 9, D = 12, H = 10;
    scene.background = new THREE.Color(0x120a08);
    scene.fog = new THREE.Fog(0x170d09, 18, 46);
    const marbleFloor = k.tex(512, (g, n) => {
      const s = n / 4;
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
        g.fillStyle = (i + j) % 2 ? '#e9e3d6' : '#4a4642'; g.fillRect(i * s, j * s, s, s);
        for (let v = 0; v < 6; v++) { g.strokeStyle = `rgba(${(i + j) % 2 ? '120,110,100' : '200,190,180'},.18)`; g.lineWidth = 1 + Math.random() * 2; g.beginPath(); g.moveTo(i * s + Math.random() * s, j * s); g.bezierCurveTo(i * s + Math.random() * s, j * s + s / 3, i * s + Math.random() * s, j * s + s * .6, i * s + Math.random() * s, j * s + s); g.stroke(); }
      }
    }, [5, 6.5]);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, D * 2), k.mat({ map: marbleFloor, roughness: .18, metalness: .05 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
    // a Turkey carpet down the middle
    const turkey = k.tex(256, (g, n) => {
      g.fillStyle = '#5e1612'; g.fillRect(0, 0, n, n);
      g.strokeStyle = '#1d2a4a'; g.lineWidth = 10; g.strokeRect(12, 12, n - 24, n - 24);
      g.fillStyle = '#a8843c'; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { g.save(); g.translate(40 + i * 58, 40 + j * 58); g.rotate(Math.PI / 4); g.fillRect(-10, -10, 20, 20); g.restore(); }
      g.fillStyle = '#1d2a4a'; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { g.beginPath(); g.arc(40 + i * 58, 40 + j * 58, 5, 0, Math.PI * 2); g.fill(); }
    }, [1, 4]);
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(5, 18), k.mat({ map: turkey, roughness: .95 })); rug.rotation.x = -Math.PI / 2; rug.position.set(0, .01, 1); rug.receiveShadow = true; scene.add(rug);

    // crimson flock above a mahogany dado
    const flock = k.tex(256, (g, n) => {
      g.fillStyle = '#5a1418'; g.fillRect(0, 0, n, n);
      g.fillStyle = '#6e1c20';
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const x = i * n / 4 + n / 8, y = j * n / 4 + n / 8; g.beginPath(); g.ellipse(x, y, n / 14, n / 9, 0, 0, Math.PI * 2); g.fill(); g.beginPath(); g.ellipse(x, y - n / 12, n / 24, n / 30, 0, 0, Math.PI * 2); g.fill(); }
    }, [18, 6]);
    const wallMat = k.mat({ map: flock, roughness: .9 });
    const mahogany = k.mat({ color: 0x3d1a0e, roughness: .4 });
    const granite = k.mat({ color: 0x8a4a42, roughness: .2, metalness: .1 });
    const gilt = k.mat({ color: 0xc9a050, roughness: .3, metalness: .9 });
    const white = k.mat({ color: 0xe8e0cc, roughness: .6 });
    for (const [x, z, w, ry] of [[-W, 0, D * 2, Math.PI / 2], [W, 0, D * 2, -Math.PI / 2], [0, -D, W * 2, 0], [0, D, W * 2, Math.PI]]) {
      const g = new THREE.Group();
      k.box(w, H, .3, wallMat, 0, H / 2, -.15, g);
      k.box(w, 1.3, .1, mahogany, 0, .65, .05, g);
      k.box(w, .1, .16, mahogany, 0, 1.32, .08, g);
      k.box(w, .5, .4, white, 0, H - .25, .1, g);       // the cornice
      g.position.set(x, 0, z); g.rotation.y = ry; scene.add(g);
    }
    // the front door to Pall Mall, with lamplight in its fanlight
    const door = new THREE.Mesh(new THREE.PlaneGeometry(2, 3.2), k.mat({ color: 0x24120a, roughness: .5 })); door.position.set(0, 1.6, D - .32); door.rotation.y = Math.PI; scene.add(door);
    const fan = new THREE.Mesh(new THREE.CircleGeometry(1, 24, 0, Math.PI), new THREE.MeshBasicMaterial({ color: 0xffc070, toneMapped: false })); fan.position.set(0, 3.2, D - .31); fan.rotation.y = Math.PI; scene.add(fan);

    // two ranks of polished granite columns with gilt capitals
    const obstacles = [];
    for (const x of [-5, 5]) for (let z = -8; z <= 8; z += 4) {
      k.cyl(.36, .4, H - 1.2, granite, x, (H - 1.2) / 2, z, scene, 20);
      k.box(1, .4, 1, gilt, x, H - 1, z, scene);
      k.box(1, .3, 1, white, x, .15, z, scene);
      obstacles.push({ x, z, r: .45 });
    }
    // coffered ceiling and the glass lantern, dark against the night
    k.box(W * 2, .4, D * 2, white, 0, H + .2, 0, scene);
    for (let x = -W + 2; x < W; x += 2) k.box(.2, .45, D * 2, white, x, H - .1, 0, scene);
    for (let z = -D + 2; z < D; z += 2) k.box(W * 2, .45, .2, white, 0, H - .1, z, scene);
    const lantern = new THREE.Mesh(new THREE.PlaneGeometry(6, 8), new THREE.MeshBasicMaterial({ color: 0x1a2440 })); lantern.rotation.x = Math.PI / 2; lantern.position.set(0, H - .35, 0); scene.add(lantern);

    // the staircase rising at the north end
    for (let i = 0; i < 12; i++) k.box(6, .25 * (i + 1), .45, mahogany, 0, .125 * (i + 1), -8.4 - i * .3, scene);
    k.box(6.8, .25, .3, white, 0, .12, -8.1, scene);
    for (const x of [-3.2, 3.2]) { const rail = k.box(.1, .1, 4.2, gilt, x, 1.9, -10, scene); rail.rotation.x = .64; k.cyl(.12, .12, 1.2, mahogany, x, .6, -8.2, scene); }

    // fires in marble chimneypieces, each with its own flickering light
    const fires = [];
    for (const [x, z, ry] of [[-W + .25, -4, Math.PI / 2], [W - .25, 4, -Math.PI / 2]]) {
      const g = new THREE.Group();
      k.box(2.2, 1.5, .5, white, 0, .75, 0, g);
      k.box(2.6, .14, .7, white, 0, 1.55, .05, g);
      const hole = new THREE.Mesh(new THREE.PlaneGeometry(1.1, .8), new THREE.MeshBasicMaterial({ color: 0x0a0604 })); hole.position.set(0, .55, .26); g.add(hole);
      const coals = new THREE.Mesh(new THREE.PlaneGeometry(.9, .35), new THREE.MeshBasicMaterial({ color: 0xff7a2a, toneMapped: false })); coals.position.set(0, .35, .27); g.add(coals);
      const halo = k.glow(0xff8a3a, 2.2, .7); halo.position.set(0, .5, .6); g.add(halo);
      const mirror = k.box(1.8, 2.2, .06, k.mat({ color: 0x8a8a90, roughness: .05, metalness: 1 }), 0, 2.9, -.15, g);
      k.box(2, 2.4, .05, gilt, 0, 2.9, -.19, g);
      g.position.set(x, 0, z); g.rotation.y = ry; scene.add(g);
      const l = new THREE.PointLight(0xff8a3a, 1.4, 9, 2); l.position.set(x + (x < 0 ? 1 : -1), .8, z); scene.add(l);
      fires.push(l);
      obstacles.push({ x: x + (x < 0 ? .4 : -.4), z, r: 1.1 });
    }
    // portraits of the party's great dead between the columns
    let seed = 0;
    for (const x of [-W + .2, W - .2]) for (const z of [-8, 0, 8]) {
      if ((x < 0 && z === -4) || (x > 0 && z === 4)) continue;
      const p = k.portrait(1.5, 2, seed++); p.position.set(x, 4.2, z); p.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2; scene.add(p);
      const lamp = k.glow(0xffc070, 1.2, .35); lamp.position.set(x + (x < 0 ? .4 : -.4), 5.5, z); scene.add(lamp);
    }
    // leather armchairs and tables with newspapers and decanters
    const leather = k.mat({ color: 0x4a2414, roughness: .45 });
    function armchair(x, z, ry) {
      const g = new THREE.Group();
      k.box(.9, .45, .85, leather, 0, .23, 0, g);
      k.box(.9, .75, .2, leather, 0, .75, -.35, g);
      for (const s of [-1, 1]) k.box(.16, .35, .8, leather, s * .42, .6, 0, g);
      g.position.set(x, 0, z); g.rotation.y = ry; scene.add(g);
      obstacles.push({ x, z, r: .55 });
    }
    function table(x, z) {
      k.cyl(.45, .45, .05, mahogany, x, .72, z, scene, 20); k.cyl(.06, .1, .7, mahogany, x, .35, z, scene, 8);
      k.box(.42, .01, .3, k.mat({ color: 0xece4d0 }), x - .12, .755, z + .05, scene).rotation.y = .3;
      k.cyl(.07, .09, .26, k.mat({ color: 0x9a6a3a, transparent: true, opacity: .55, roughness: .05 }), x + .2, .88, z - .1, scene, 12);
      obstacles.push({ x, z, r: .5 });
    }
    armchair(-6.8, -2.4, .9); armchair(-6.6, -5.8, 2.3); table(-6, -4.1);
    armchair(6.8, 2.4, -2.2); armchair(6.6, 5.8, -.8); table(6, 4.1);
    armchair(6.4, -5, -1.2); table(6.6, -3.6); armchair(-6.5, 5.6, 1.6); table(-6.6, 4.2);
    // a bust on a plinth, and a potted palm
    k.box(.7, 1.3, .7, white, -2.8, .65, -7.2, scene);
    const bust = new THREE.Mesh(new THREE.SphereGeometry(.22, 16, 12), k.mat({ color: 0xe8e2d6, roughness: .4 })); bust.position.set(-2.8, 1.6, -7.2); bust.castShadow = true; scene.add(bust);
    k.box(.5, .25, .4, k.mat({ color: 0xe8e2d6 }), -2.8, 1.38, -7.2, scene);
    obstacles.push({ x: -2.8, z: -7.2, r: .5 });
    k.cyl(.3, .25, .6, k.mat({ color: 0x5a3a24 }), 2.8, .3, -7.2, scene, 12);
    for (let i = 0; i < 9; i++) { const leaf = new THREE.Mesh(new THREE.ConeGeometry(.12, 1.4, 4), k.mat({ color: 0x2a4a22 })); leaf.position.set(2.8, 1.2, -7.2); leaf.rotation.set(Math.cos(i) * .9, i * .7, Math.sin(i) * .9); scene.add(leaf); }
    obstacles.push({ x: 2.8, z: -7.2, r: .5 });
    // gasoliers
    for (const z of [-6, 0, 6]) {
      k.cyl(.03, .03, 2, gilt, 0, H - 1, z, scene, 6);
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; k.globe(scene, Math.cos(a) * .8, H - 2.1, z + Math.sin(a) * .8, { halo: 1, opacity: .5, r: .1 }); }
    }
    // members dozing and reading
    k.extras(scene, [[-6.8, -.47, -2.4, .9, true], [6.4, -.47, -5, -1.2, true], [-3, 0, 8.5, 2.6], [-2.4, 0, 7.8, -.5]]);

    scene.add(new THREE.HemisphereLight(0xffe0c0, 0x2a140c, .34));
    const key = new THREE.SpotLight(0xffd29a, 2.2, 44, Math.PI / 2.6, .8, 1.1);
    key.position.set(0, H - 2.2, 0); key.target.position.set(0, 0, 0);
    key.castShadow = true; key.shadow.mapSize.set(opt.coarse ? 512 : 1024, opt.coarse ? 512 : 1024); key.shadow.bias = -.0006; key.shadow.radius = 4;
    scene.add(key, key.target);
    for (const z of [-7, 7]) { const l = new THREE.PointLight(0xffd29a, .7, 18, 1.5); l.position.set(0, H - 2.4, z); scene.add(l); }

    return {
      start: { x: 0, z: 10, heading: Math.PI },
      clamp: clampTo(-W + .7, W - .7, -7.6, D - .5),
      camClamp: clampTo(-W + .4, W - .4, -D + .6, D - .4),
      exit: { test: (x, z) => z > D - 1.3 && Math.abs(x) < 1.2, label: 'Go out into Pall Mall', always: true },
      obstacles, dust: [-W, W, .6, H - 1, -D, D], exposure: .95,
      update: (dt, t) => { fires.forEach((l, i) => { l.intensity = 1.2 + Math.sin(t / 90 + i * 3) * .15 + Math.sin(t / 37 + i) * .1; }); },
    };
  };

  /* ───────── The Victoria Embankment at night ───────── */
  // Walking south along the river wall under the dolphin lamps, towards the lit Clock Tower and
  // Westminster Bridge. The river is on your left; the road, the trees and Norman Shaw's red and
  // white police headquarters on your right.

  P.embankment = function (scene, k, opt) {
    // sky: a deep blue dome, warmer at the horizon over the gaslit city
    const sky = new THREE.Mesh(new THREE.SphereGeometry(480, 32, 16), new THREE.MeshBasicMaterial({ side: THREE.BackSide, fog: false, map: k.tex(256, (g, n) => {
      const gr = g.createLinearGradient(0, 0, 0, n); gr.addColorStop(0, '#04060c'); gr.addColorStop(.42, '#0b1222'); gr.addColorStop(.5, '#2a2a30'); gr.addColorStop(.56, '#3a2c22'); gr.addColorStop(1, '#0a0a0a');
      g.fillStyle = gr; g.fillRect(0, 0, n, n);
      for (let i = 0; i < 160; i++) { g.fillStyle = `rgba(255,255,240,${Math.random() * .7})`; g.fillRect(Math.random() * n, Math.random() * n * .42, 1, 1); }
    }) }));
    scene.add(sky);
    scene.background = new THREE.Color(0x05070c);
    scene.fog = new THREE.FogExp2(0x101722, .0062);
    const moon = new THREE.Mesh(new THREE.CircleGeometry(6, 32), new THREE.MeshBasicMaterial({ color: 0xf2ecd8, fog: false, toneMapped: false }));
    moon.position.set(140, 120, -260); moon.lookAt(0, 0, 0); scene.add(moon);
    const mh = k.glow(0xc8d4ff, 70, .35); mh.material.fog = false; mh.position.copy(moon.position); scene.add(mh);

    const granite = k.mat({ color: 0x8a8578, roughness: .85 });
    const iron = k.mat({ color: 0x1a221c, roughness: .5, metalness: .6 });
    const flag = k.tex(256, (g, n) => {      // York stone paving
      g.fillStyle = '#3a3630'; g.fillRect(0, 0, n, n);
      for (let j = 0; j < 4; j++) { let x = (j % 2) * n / 6; for (; x < n; x += n / 3) { const s = 70 + Math.random() * 20 | 0; g.fillStyle = `rgb(${s + 10},${s + 6},${s})`; g.fillRect(x + 2, j * n / 4 + 2, n / 3 - 4, n / 4 - 4); } }
      for (let i = 0; i < 2500; i++) { g.fillStyle = `rgba(0,0,0,${Math.random() * .15})`; g.fillRect(Math.random() * n, Math.random() * n, 2, 2); }
    }, [3, 40]);
    const pave = new THREE.Mesh(new THREE.PlaneGeometry(6.5, 160), k.mat({ map: flag, roughness: .7, metalness: .1 })); pave.rotation.x = -Math.PI / 2; pave.position.set(.75, 0, 0); pave.receiveShadow = true; scene.add(pave);
    const setts = k.tex(256, (g, n) => { g.fillStyle = '#1a1916'; g.fillRect(0, 0, n, n); for (let j = 0; j < 16; j++) for (let i = 0; i < 8; i++) { const s = 30 + Math.random() * 18 | 0; g.fillStyle = `rgb(${s},${s},${s - 2})`; g.fillRect(i * 32 + (j % 2) * 16 + 2, j * 16 + 2, 28, 12); } }, [3, 60]);
    const road = new THREE.Mesh(new THREE.PlaneGeometry(9, 160), k.mat({ map: setts, roughness: .5, metalness: .15 })); road.rotation.x = -Math.PI / 2; road.position.set(-7, -.12, 0); road.receiveShadow = true; scene.add(road);
    k.box(.3, .14, 160, granite, -2.55, -.05, 0, scene);   // the kerb
    const garden = new THREE.Mesh(new THREE.PlaneGeometry(20, 160), k.mat({ color: 0x141a12, roughness: 1 })); garden.rotation.x = -Math.PI / 2; garden.position.set(-21.5, -.1, 0); scene.add(garden);

    // the river wall, and the river
    k.box(.9, 1.05, 160, granite, 4.45, .52, 0, scene);
    k.box(1.1, .12, 160, granite, 4.45, 1.1, 0, scene);
    k.box(.9, 4, 160, granite, 4.45, -2, 0, scene);
    const ripple = k.tex(256, (g, n) => {
      g.fillStyle = '#808080'; g.fillRect(0, 0, n, n);
      for (let i = 0; i < 700; i++) { const y = Math.random() * n, x = Math.random() * n, w = 8 + Math.random() * 40; g.fillStyle = `rgba(${Math.random() < .5 ? '255,255,255' : '0,0,0'},${.15 + Math.random() * .25})`; g.fillRect(x, y, w, 1.5); }
    }, [40, 40], true);
    const water = new THREE.Mesh(new THREE.PlaneGeometry(700, 900), k.mat({ color: 0x0c1820, roughness: .18, metalness: .6, bumpMap: ripple, bumpScale: .08 }));
    water.rotation.x = -Math.PI / 2; water.position.set(354, -2.2, 0); water.receiveShadow = true; scene.add(water);

    // dolphin lamps on the parapet: iron standards with a globe; the nearest three give real light
    const lamps = [], reflections = [];
    for (let z = -44; z <= 52; z += 8) {
      const g = new THREE.Group();
      k.cyl(.17, .26, .5, iron, 0, .25, 0, g, 10);
      const shaft = k.cyl(.07, .11, 2.4, iron, 0, 1.6, 0, g, 10);
      for (const s of [-1, 1]) { const d = new THREE.Mesh(new THREE.TorusGeometry(.16, .045, 6, 12, Math.PI * 1.3), iron); d.position.set(s * .09, .7, 0); d.rotation.set(0, Math.PI / 2, s * .8); g.add(d); }
      k.cyl(.06, .12, .2, iron, 0, 2.9, 0, g, 10);
      g.position.set(4.45, 1.16, z); scene.add(g);
      const gl = k.globe(scene, 4.45, 4.35, z, { r: .2, halo: 2.4, opacity: .8, glow: 0xffc070, color: 0xfff0c8 });
      lamps.push(gl.globe.position);
      const refl = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 9), new THREE.MeshBasicMaterial({ map: k.glowMap(), color: 0xffb860, transparent: true, opacity: .25, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
      refl.rotation.x = -Math.PI / 2; refl.rotation.z = Math.PI / 2; refl.position.set(10, -2.15, z); scene.add(refl); reflections.push(refl);
    }
    // gas lamps along the far kerb too
    for (let z = -40; z <= 48; z += 16) { k.cyl(.06, .1, 3.4, iron, -11.5, 1.6, z, scene, 8); k.globe(scene, -11.5, 3.5, z, { r: .14, halo: 1.8, opacity: .6 }); }

    // plane trees between road and garden
    const bark = k.mat({ color: 0x4a4436, roughness: 1 });
    const leaves = k.mat({ color: 0x1c2a16, roughness: 1 });
    for (let z = -44; z <= 52; z += 9) {
      k.cyl(.18, .3, 6, bark, -12.6, 3, z + 3, scene, 8);
      for (let i = 0; i < 5; i++) { const c = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6 + Math.random(), 0), leaves); c.position.set(-12.6 + (Math.random() - .5) * 2.4, 6.5 + Math.random() * 1.8, z + 3 + (Math.random() - .5) * 2.4); c.castShadow = true; scene.add(c); }
    }
    // Norman Shaw's police headquarters: red brick banded with white stone, lit windows, turrets
    const shaw = k.mat({ map: T.windows(k, 10, 8, .35, '#5a2a20'), roughness: .8, emissive: 0xffffff, emissiveMap: T.windows(k, 10, 8, .35, '#000'), emissiveIntensity: .6 });
    k.box(18, 22, 26, shaw, -32, 11, -6, scene);
    for (let y = 2; y < 22; y += 3) k.box(18.2, .5, 26.2, k.mat({ color: 0xcfc6b2 }), -32, y, -6, scene);
    for (const [x, z] of [[-23, -19], [-23, 7]]) { k.cyl(1.6, 1.6, 26, k.mat({ color: 0x5a2a20 }), x, 13, z, scene, 12); const cap = new THREE.Mesh(new THREE.ConeGeometry(1.9, 4, 12), k.mat({ color: 0x2a2a2e })); cap.position.set(x, 28, z); scene.add(cap); }
    // terraces to the north
    k.box(16, 18, 40, k.mat({ map: T.windows(k, 12, 6, .4, '#2a2420'), emissive: 0xffffff, emissiveMap: T.windows(k, 12, 6, .4, '#000'), emissiveIntensity: .5 }), -31, 9, 34, scene);

    // the Clock Tower, the Palace and Westminster Bridge ahead
    const palaceStone = k.mat({ color: 0x8a7a58, roughness: .9 });
    const palaceLit = k.mat({ map: T.windows(k, 24, 6, .55, '#4a4030'), emissive: 0xffffff, emissiveMap: T.windows(k, 24, 6, .55, '#000'), emissiveIntensity: .8, roughness: .9 });
    const tower = new THREE.Group();
    k.box(12, 62, 12, palaceStone, 0, 31, 0, tower);
    for (let y = 8; y < 60; y += 6) k.box(12.3, .4, 12.3, k.mat({ color: 0x6a5c42 }), 0, y, 0, tower);
    k.box(14, 14, 14, palaceStone, 0, 69, 0, tower);
    const faceMat = new THREE.MeshBasicMaterial({ color: 0xfff1c8, fog: false, toneMapped: false, map: k.tex(256, (g, n) => {
      g.fillStyle = '#fff1c8'; g.fillRect(0, 0, n, n); g.strokeStyle = '#2a2014'; g.lineWidth = 8;
      g.beginPath(); g.arc(n / 2, n / 2, n * .45, 0, Math.PI * 2); g.stroke();
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; g.beginPath(); g.moveTo(n / 2 + Math.cos(a) * n * .36, n / 2 + Math.sin(a) * n * .36); g.lineTo(n / 2 + Math.cos(a) * n * .43, n / 2 + Math.sin(a) * n * .43); g.stroke(); }
      g.lineWidth = 10; g.beginPath(); g.moveTo(n / 2, n / 2); g.lineTo(n / 2 + n * .18, n / 2 - n * .12); g.stroke();
      g.lineWidth = 6; g.beginPath(); g.moveTo(n / 2, n / 2); g.lineTo(n / 2 - n * .05, n / 2 - n * .33); g.stroke();
    }) });
    for (const [x, z, ry] of [[0, 7.01, 0], [0, -7.01, Math.PI], [7.01, 0, Math.PI / 2], [-7.01, 0, -Math.PI / 2]]) { const f = new THREE.Mesh(new THREE.CircleGeometry(4.6, 40), faceMat); f.position.set(x, 69, z); f.rotation.y = ry; tower.add(f); }
    const belfry = new THREE.Mesh(new THREE.ConeGeometry(7.5, 26, 4), k.mat({ color: 0x3a3a3c, roughness: .6, metalness: .3 })); belfry.position.y = 89; belfry.rotation.y = Math.PI / 4; tower.add(belfry);
    const fglow = k.glow(0xffe0a0, 22, .45); fglow.material.fog = false; fglow.position.y = 69; tower.add(fglow);
    tower.position.set(-8, 0, -98); scene.add(tower);
    k.box(30, 24, 160, palaceLit, -22, 12, -190, scene);
    const vic = k.box(18, 90, 18, palaceStone, -22, 45, -268, scene);
    // the bridge, its arches and its lamps
    const bridge = new THREE.Group();
    k.box(260, 1.2, 14, k.mat({ color: 0x5a5a52 }), 130, 4.6, 0, bridge);
    k.box(260, 1, .4, k.mat({ color: 0x3a4a3a }), 130, 5.7, -6.8, bridge);
    k.box(260, 1, .4, k.mat({ color: 0x3a4a3a }), 130, 5.7, 6.8, bridge);
    for (let x = 18; x < 260; x += 24) { const arch = new THREE.Mesh(new THREE.TorusGeometry(10, 1, 6, 20, Math.PI), k.mat({ color: 0x4a4a44 })); arch.position.set(x, -2.2, 0); bridge.add(arch); k.box(4, 8, 14, k.mat({ color: 0x4a4a44 }), x - 12, 0, 0, bridge); }
    for (let x = 6; x < 260; x += 12) for (const z of [-6.8, 6.8]) { const gl = k.glow(0xffc070, 3, .7); gl.position.set(x, 8, z); bridge.add(gl); }
    bridge.position.set(5, 0, -84); scene.add(bridge);
    // the far bank: hospital pavilions and wharves with lights in some windows
    for (let z = -200; z < 160; z += 26) k.box(18, 14 + Math.random() * 10, 20, k.mat({ map: T.windows(k, 8, 5, .3, '#1a1612'), emissive: 0xffffff, emissiveMap: T.windows(k, 8, 5, .3, '#000'), emissiveIntensity: .7 }), 280, 8, z, scene);

    // a hansom waiting at the kerb
    const cab = new THREE.Group();
    const black = k.mat({ color: 0x0e0e10, roughness: .4 });
    k.box(1.3, 1.4, 1.4, black, 0, 1.5, 0, cab); k.box(1.3, .2, 1.8, black, 0, .9, .3, cab);
    for (const s of [-1, 1]) { const w = new THREE.Mesh(new THREE.TorusGeometry(.75, .05, 6, 24), black); w.position.set(s * .75, .75, 0); w.rotation.y = Math.PI / 2; cab.add(w); }
    k.box(.1, .1, 3, black, -.4, 1, 2.2, cab); k.box(.1, .1, 3, black, .4, 1, 2.2, cab);
    const horse = new THREE.Group();
    const bay = k.mat({ color: 0x3a2214, roughness: .8 });
    k.box(.6, .7, 1.8, bay, 0, 1.45, 0, horse);
    const neck = k.box(.35, .9, .4, bay, 0, 2, .9, horse); neck.rotation.x = -.5;
    k.box(.3, .3, .7, bay, 0, 2.4, 1.3, horse);
    for (const [x, z] of [[-.2, -.7], [.2, -.7], [-.2, .7], [.2, .7]]) k.cyl(.07, .06, 1.1, bay, x, .55, z, horse, 6);
    horse.position.set(0, 0, 4.2); cab.add(horse);
    const cablamp = k.glow(0xffc070, 1, .9); cablamp.position.set(.7, 1.9, .7); cab.add(cablamp);
    cab.position.set(-4.3, -.1, 14); scene.add(cab);
    // benches on the pavement
    for (const z of [30, 10, -12]) { const b = new THREE.Group(); k.box(2.2, .08, .5, k.mat({ color: 0x3a2a1a }), 0, .5, 0, b); k.box(2.2, .5, .06, k.mat({ color: 0x3a2a1a }), 0, .8, .25, b); for (const s of [-1, 1]) k.box(.08, .5, .5, iron, s * 1.05, .25, 0, b); b.position.set(3.6, 0, z); b.rotation.y = -Math.PI / 2; scene.add(b); }
    // a few late walkers and a constable
    k.extras(scene, [[2.4, 0, 20, Math.PI], [-1.5, 0, -24, 0], [3.3, 0, 10.6, -Math.PI / 2, true]]);
    const pc = k.person({ coat: 0x10142a, trousers: 0x10142a, hat: 'none', moustache: 0x2a1d12 });
    const helm = new THREE.Mesh(new THREE.SphereGeometry(.15, 14, 10, 0, Math.PI * 2, 0, Math.PI / 1.7), k.mat({ color: 0x10142a })); helm.scale.y = 1.5; helm.position.y = .1; pc.userData.head.add(helm);
    pc.position.set(-1.6, 0, -6); pc.rotation.y = 1.2; scene.add(pc);

    // moonlight with soft shadows that follow you; three lamps that light the nearest stretch
    scene.add(new THREE.HemisphereLight(0x5a6a90, 0x0a0806, .35));
    const moonLight = new THREE.DirectionalLight(0x9aacd8, .45);
    moonLight.position.set(30, 50, -30); moonLight.castShadow = true;
    moonLight.shadow.mapSize.set(opt.coarse ? 512 : 1024, opt.coarse ? 512 : 1024);
    Object.assign(moonLight.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 120 }); moonLight.shadow.bias = -.0008;
    scene.add(moonLight, moonLight.target);
    const near = [0, 1, 2].map(() => { const l = new THREE.PointLight(0xffc070, 1.6, 14, 2); scene.add(l); return l; });

    return {
      start: { x: .4, z: 44, heading: Math.PI },
      clamp: clampTo(-2.2, 3.6, -40, 48),
      camClamp: clampTo(-9, 3.9, -44, 52),
      exit: { test: (x, z) => z < -36, label: 'Go on to the House' },
      obstacles: [{ x: 3.6, z: 30, r: .5 }, { x: 3.6, z: 10, r: .5 }, { x: 3.6, z: -12, r: .5 }, { x: -1.6, z: -6, r: .4 }],
      exposure: 1.1, speed: 3.4,
      update: (dt, t, pos) => {
        ripple.offset.x = t / 60000; ripple.offset.y = t / 25000;
        reflections.forEach((r, i) => { r.material.opacity = .18 + Math.sin(t / 300 + i * 1.7) * .06; });
        const sorted = lamps.slice().sort((a, b) => Math.abs(a.z - pos.z) - Math.abs(b.z - pos.z));
        near.forEach((l, i) => { l.position.set(sorted[i].x - .3, sorted[i].y - .3, sorted[i].z); });
        moonLight.position.set(pos.x + 30, 50, pos.z - 30); moonLight.target.position.set(pos.x, 0, pos.z);
      },
    };
  };
})();
