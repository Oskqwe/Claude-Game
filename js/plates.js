/* The Member — venue plates.
   Small engraved vignettes, drawn in ink (currentColor) with hatching, one per kind of place.
   Each plate is 600×180 and fades at the edges like an old book illustration. */
(function () {
  'use strict';
  const TM = window.TM;
  const W = 600, H = 180, G = 150; // ground line

  const defs = `
  <defs>
    <pattern id="h1" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" stroke-width=".7"/></pattern>
    <pattern id="h2" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="3" stroke="currentColor" stroke-width=".9"/></pattern>
    <pattern id="h3" width="6" height="6" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="6" y2="0" stroke="currentColor" stroke-width=".45"/></pattern>
    <pattern id="hx" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 0L3 3M3 0L0 3" stroke="currentColor" stroke-width=".6"/></pattern>
    <radialGradient id="vg" cx="50%" cy="55%" r="62%"><stop offset="70%" stop-color="#fff"/><stop offset="100%" stop-color="#000"/></radialGradient>
    <mask id="vm"><rect width="${W}" height="${H}" fill="url(#vg)"/></mask>
  </defs>`;

  const S = 'stroke="currentColor" fill="none" stroke-width="1.2" stroke-linejoin="round"';
  const F = (p) => `fill="url(#${p})" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"`;
  const solid = 'fill="currentColor"';

  // ── primitives ──
  const sky = (lines = 9) => Array.from({ length: lines }, (_, i) => `<line x1="0" x2="${W}" y1="${8 + i * 9}" y2="${8 + i * 9}" stroke="currentColor" stroke-width=".35" opacity="${0.5 - i * 0.045}"/>`).join('');
  const ground = (y = G) => `<line x1="0" x2="${W}" y1="${y}" y2="${y}" stroke="currentColor" stroke-width="1.4"/><rect x="0" y="${y}" width="${W}" height="${H - y}" fill="url(#h3)" opacity=".7"/>`;
  const moon = (x, y, r = 12) => `<circle cx="${x}" cy="${y}" r="${r}" ${S}/><path d="M${x - r * .3} ${y - r} a${r} ${r} 0 0 1 0 ${2 * r}" ${F('h3')} opacity=".6"/>`;
  const sun = (x, y, r = 16) => `<circle cx="${x}" cy="${y}" r="${r}" ${S}/>` + Array.from({ length: 16 }, (_, i) => { const a = i * Math.PI / 8; return `<line x1="${x + Math.cos(a) * (r + 4)}" y1="${y + Math.sin(a) * (r + 4)}" x2="${x + Math.cos(a) * (r + 11)}" y2="${y + Math.sin(a) * (r + 11)}" stroke="currentColor" stroke-width=".8"/>`; }).join('');
  const windows = (x, y, w, h, cols, rows, arch) => {
    let o = ''; const cw = w / cols, rh = h / rows;
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
      const wx = x + c * cw + cw * .3, wy = y + r * rh + rh * .25, ww = cw * .4, wh = rh * .5;
      o += arch ? `<path d="M${wx} ${wy + wh}V${wy + ww / 2}a${ww / 2} ${ww / 2} 0 0 1 ${ww} 0V${wy + wh}Z" ${solid} opacity=".85"/>` : `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" ${solid} opacity=".85"/>`;
    }
    return o;
  };
  const block = (x, w, h, base = G, fill = 'h1', opts = {}) => `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" ${F(fill)}/>` +
    (opts.win ? windows(x, base - h, w, h, opts.win[0], opts.win[1], opts.arch) : '') +
    (opts.gable ? `<path d="M${x - 3} ${base - h}L${x + w / 2} ${base - h - opts.gable}L${x + w + 3} ${base - h}Z" ${F('h2')}/>` : '');
  const spire = (x, base, w, h, sp) => `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" ${F('h1')}/><path d="M${x - 2} ${base - h}L${x + w / 2} ${base - h - sp}L${x + w + 2} ${base - h}Z" ${F('h2')}/>`;
  const tree = (x, base, s = 1) => `<path d="M${x} ${base}V${base - 14 * s}" ${S}/><path d="M${x - 14 * s} ${base - 12 * s}q${-4 * s} ${-16 * s} ${8 * s} ${-22 * s}q${6 * s} ${-14 * s} ${18 * s} ${-4 * s}q${14 * s} ${2 * s} ${8 * s} ${18 * s}q${4 * s} ${10 * s} ${-12 * s} ${10 * s}q${-12 * s} ${4 * s} ${-22 * s} ${-2 * s}Z" ${F('h2')}/>`;
  const fir = (x, base, h = 50) => `<path d="M${x} ${base - h}L${x - h * .22} ${base - h * .45}H${x - h * .1}L${x - h * .3} ${base - 4}H${x + h * .3}L${x + h * .1} ${base - h * .45}H${x + h * .22}Z" ${F('h2')}/>`;
  const palm = (x, base, h = 60) => `<path d="M${x} ${base}q4 ${-h / 2} ${-2} ${-h}" ${S} stroke-width="2"/>` +
    [[-30, -8], [-22, 6], [26, 4], [30, -10], [4, -22]].map(([dx, dy]) => `<path d="M${x - 2} ${base - h}q${dx / 2} ${dy - 10} ${dx} ${dy + 6}" ${S}/>`).join('');
  const chimney = (x, base, h, smoke = true) => `<path d="M${x} ${base}L${x + 3} ${base - h}H${x + 11}L${x + 14} ${base}Z" ${F('h2')}/>` +
    (smoke ? `<path d="M${x + 7} ${base - h - 4}q10 -14 26 -10q14 -12 30 -2q16 -8 28 4" ${S} stroke-width=".9" opacity=".8"/>` : '');
  const big = (x, base) => { // clock tower
    const w = 26, h = 104;
    return `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" ${F('h1')}/>` +
      `<rect x="${x - 3}" y="${base - h - 22}" width="${w + 6}" height="26" ${F('h3')}/>` +
      `<circle cx="${x + w / 2}" cy="${base - h - 9}" r="9" fill="var(--paper)" stroke="currentColor" stroke-width="1.2"/><path d="M${x + w / 2} ${base - h - 9}v-6M${x + w / 2} ${base - h - 9}l4 2" ${S}/>` +
      `<path d="M${x - 3} ${base - h - 22}L${x + w / 2} ${base - h - 58}L${x + w + 3} ${base - h - 22}Z" ${F('h2')}/><line x1="${x + w / 2}" y1="${base - h - 58}" x2="${x + w / 2}" y2="${base - h - 68}" ${S}/>`;
  };
  const pinnacles = (x, w, y, n) => Array.from({ length: n }, (_, i) => { const px = x + (i + .5) * (w / n); return `<path d="M${px - 3} ${y}L${px} ${y - 10}L${px + 3} ${y}" ${S}/>`; }).join('');
  const river = (y) => Array.from({ length: 5 }, (_, i) => `<path d="M0 ${y + i * 6}` + Array.from({ length: 30 }, (_, k) => ` q10 ${k % 2 ? 2 : -2} 20 0`).join('') + `" ${S} stroke-width=".6" opacity="${0.8 - i * .12}"/>`).join('');
  const lamp = (x, base) => `<path d="M${x} ${base}V${base - 40}" ${S} stroke-width="1.6"/><path d="M${x - 5} ${base - 40}h10l-2 -9h-6z" ${F('h3')}/><circle cx="${x}" cy="${base - 45}" r="12" fill="currentColor" opacity=".06"/>`;
  const people = (x0, x1, base, n) => Array.from({ length: n }, (_, i) => { const x = x0 + (x1 - x0) * (i / (n - 1 || 1)) + ((i * 37) % 7); const hgt = 18 + ((i * 13) % 6); return `<circle cx="${x}" cy="${base - hgt}" r="3" ${solid}/><path d="M${x - 4} ${base}L${x - 3} ${base - hgt + 4}H${x + 3}L${x + 4} ${base}Z" ${solid} opacity=".8"/>` + (i % 3 === 0 ? `<rect x="${x - 4}" y="${base - hgt - 7}" width="8" height="4" ${solid}/>` : ''); }).join('');
  const portico = (x, w, h, base, cols = 6) => `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" ${F('h3')}/>` +
    Array.from({ length: cols }, (_, i) => { const cx = x + 8 + i * ((w - 16) / (cols - 1)); return `<rect x="${cx - 3}" y="${base - h + 12}" width="6" height="${h - 12}" fill="var(--paper)" stroke="currentColor" stroke-width="1"/>`; }).join('') +
    `<path d="M${x - 6} ${base - h}L${x + w / 2} ${base - h - 26}L${x + w + 6} ${base - h}Z" ${F('h2')}/>`;
  const chandelier = (x, y) => `<line x1="${x}" y1="0" x2="${x}" y2="${y - 10}" ${S}/><path d="M${x - 34} ${y}q34 22 68 0" ${S}/><path d="M${x - 22} ${y + 4}q22 14 44 0" ${S}/>` +
    [-34, -22, -10, 10, 22, 34].map((d) => `<path d="M${x + d} ${y + (Math.abs(d) > 30 ? 0 : 5)}v-8" ${S}/><circle cx="${x + d}" cy="${y - 10}" r="2" ${solid}/>`).join('');
  const tableSet = (x, base, w) => `<path d="M${x} ${base - 28}H${x + w}" ${S} stroke-width="2"/><path d="M${x - 6} ${base - 28}q${w / 2 + 6} 6 ${w + 12} 0V${base - 18}H${x - 6}Z" ${F('h3')}/>` +
    Array.from({ length: Math.floor(w / 26) }, (_, i) => { const gx = x + 12 + i * 26; return `<path d="M${gx - 3} ${base - 40}h6l-1 6h-4z M${gx} ${base - 34}v6" ${S} stroke-width=".9"/>`; }).join('') +
    `<path d="M${x + 8} ${base - 18}V${base}M${x + w - 8} ${base - 18}V${base}" ${S}/>`;
  const frame = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${S} stroke-width="3"/><rect x="${x + 6}" y="${y + 6}" width="${w - 12}" height="${h - 12}" ${F('h1')}/><circle cx="${x + w / 2}" cy="${y + h * .4}" r="${w * .16}" fill="var(--paper)" stroke="currentColor"/><path d="M${x + w * .25} ${y + h - 6}q${w * .25} ${-h * .4} ${w * .5} 0" fill="var(--paper)" stroke="currentColor"/>`;
  const tallWindow = (x, y, w, h) => `<path d="M${x} ${y + h}V${y + w / 2}a${w / 2} ${w / 2} 0 0 1 ${w} 0V${y + h}Z" ${S}/><path d="M${x + w / 2} ${y}V${y + h}M${x} ${y + h * .45}H${x + w}" ${S} stroke-width=".7"/><path d="M${x} ${y + h}V${y + w / 2}a${w / 2} ${w / 2} 0 0 1 ${w} 0V${y + h}Z" fill="url(#h3)" opacity=".5"/>`;
  const curtain = (x, y, h, flip) => `<path d="M${x} ${y}q${flip ? -14 : 14} ${h / 2} 0 ${h}h${flip ? -16 : 16}V${y}Z" ${F('h2')}/>`;
  const tent = (x, base, w = 34) => `<path d="M${x} ${base}L${x + w / 2} ${base - w * .7}L${x + w} ${base}Z" ${F('h1')}/><path d="M${x + w / 2} ${base}L${x + w / 2 - 3} ${base - 12}H${x + w / 2 + 3}Z" ${solid}/>`;
  const mountains = (pts, fill = 'h1') => `<path d="M0 ${G}` + pts.map(([x, y]) => `L${x} ${y}`).join('') + `L${W} ${G}Z" ${F(fill)}/>`;
  const rails = (y) => `<path d="M0 ${y}H${W}M0 ${y + 5}H${W}" ${S} stroke-width=".9"/>` + Array.from({ length: 40 }, (_, i) => `<line x1="${i * 15}" y1="${y - 2}" x2="${i * 15 + 4}" y2="${y + 7}" stroke="currentColor" stroke-width=".8"/>`).join('');
  const engine = (x, base) => `<rect x="${x}" y="${base - 34}" width="70" height="26" ${F('hx')}/><rect x="${x + 70}" y="${base - 46}" width="26" height="38" ${F('h1')}/><rect x="${x + 6}" y="${base - 50}" width="9" height="16" ${solid}/>` +
    [12, 34, 56, 82].map((d) => `<circle cx="${x + d}" cy="${base - 6}" r="7" fill="var(--paper)" stroke="currentColor" stroke-width="1.4"/>`).join('') +
    `<path d="M${x + 10} ${base - 54}q-8 -14 4 -22q2 -12 16 -10" ${S} opacity=".7"/>`;
  const wall = (x, w, h, base = G) => `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" ${F('hx')}/>` + Array.from({ length: Math.floor(w / 14) }, (_, i) => `<line x1="${x + i * 14}" y1="${base - h}" x2="${x + i * 14}" y2="${base}" stroke="currentColor" stroke-width=".4"/>`).join('');

  const plates = {
    school: () => sky() + tree(70, G, 1.4) + tree(530, G, 1.6) + block(170, 260, 62, G, 'h1', { win: [8, 2], arch: true }) +
      `<path d="M160 ${G - 62}L300 ${G - 104}L440 ${G - 62}Z" ${F('h2')}/>` + spire(290, G - 96, 20, 22, 30) + `<path d="M300 ${G}v-26h-14v26" fill="var(--paper)" stroke="currentColor"/>` + ground(),
    sickroom: () => `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#h3)" opacity=".35"/>` + tallWindow(250, 18, 100, 120) + curtain(232, 12, 132) + curtain(368, 12, 132, true) + moon(300, 52, 9) +
      `<path d="M60 ${G}V100h18v20h150v${G - 120}" ${S} stroke-width="1.6"/><path d="M78 120q70 -16 150 0v14H78Z" ${F('h1')}/>` + `<path d="M470 ${G}v-50h50v50" ${S}/><path d="M480 ${G - 50}v-12h30v12" ${F('h2')}/><circle cx="495" cy="${G - 70}" r="8" fill="currentColor" opacity=".08"/>` + ground(G + 4),
    harrow: () => sky() + `<path d="M0 ${G}Q160 70 300 64T600 ${G}" ${F('h3')}/>` + spire(286, 72, 16, 34, 52) + block(210, 70, 26, 80, 'h1', { win: [5, 1], arch: true, gable: 10 }) + block(330, 90, 22, 84, 'h1', { win: [6, 1] }) + tree(150, 108, 1) + tree(470, 112, 1.1) + ground(),
    gallery: () => sky(7) + moon(520, 34, 11) + `<rect x="40" y="${G - 52}" width="400" height="52" ${F('h1')}/>` + pinnacles(40, 400, G - 52, 26) + windows(40, G - 52, 400, 52, 26, 2, true) +
      `<rect x="70" y="${G - 96}" width="40" height="44" ${F('h2')}/>` + pinnacles(70, 40, G - 96, 4) + big(470, G) + river(G + 4) + lamp(560, G) + `<rect x="0" y="${G}" width="${W}" height="2" ${solid}/>`,
    chine: () => sky(5) + `<path d="M0 30Q120 40 210 ${G}H0Z" ${F('h1')}/><path d="M600 30Q480 40 390 ${G}H600Z" ${F('h1')}/>` + fir(250, G + 10, 80) + fir(300, G + 20, 96) + fir(350, G + 14, 70) + fir(90, 70, 40) + fir(510, 72, 44) +
      `<path d="M140 64H460" ${S} stroke-width="3"/><path d="M140 52H460" ${S}/>` + Array.from({ length: 21 }, (_, i) => `<line x1="${140 + i * 16}" y1="52" x2="${140 + i * 16}" y2="64" stroke="currentColor"/>`).join('') + `<path d="M160 64L200 110M440 64L400 110" ${S}/>`,
    sandhurst: () => sky() + block(70, 140, 50, G, 'h1', { win: [7, 2] }) + block(390, 140, 50, G, 'h1', { win: [7, 2] }) + portico(220, 160, 70, G, 6) + `<path d="M300 ${G - 96}V${G - 140}" ${S}/><path d="M300 ${G - 140}h26l-6 6 6 6h-26" ${F('h2')}/>` + ground() + people(150, 450, G + 22, 12),
    city: () => sky(10) + `<rect x="0" y="0" width="${W}" height="${G}" fill="url(#h3)" opacity=".25"/>` + block(30, 80, 60, G, 'h1', { win: [4, 2] }) + block(120, 60, 46) +
      `<path d="M250 ${G - 60}a50 50 0 0 1 100 0Z" ${F('h1')}/><rect x="240" y="${G - 60}" width="120" height="60" ${F('h3')}/><rect x="292" y="${G - 128}" width="16" height="18" ${F('h2')}/><path d="M300 ${G - 128}v-12" ${S}/>` + portico(244, 112, 40, G, 6) + block(390, 70, 70, G, 'h1', { win: [3, 3] }) + block(470, 100, 50, G, 'h1', { win: [5, 2] }) + chimney(540, G - 50, 14, false) + ground(),
    theatre: () => sky(6) + `<rect x="140" y="${G - 112}" width="320" height="112" ${F('h1')}/>` + windows(140, G - 112, 320, 70, 7, 2, true) + `<path d="M130 ${G - 112}H470L455 ${G - 128}H145Z" ${F('h2')}/><rect x="250" y="${G - 140}" width="100" height="16" fill="var(--paper)" stroke="currentColor"/><text x="300" y="${G - 128}" text-anchor="middle" font-family="IM Fell English SC, Georgia, serif" font-size="12" fill="currentColor">EMPIRE</text>` +
      `<path d="M170 ${G - 40}H430" ${S} stroke-width="2"/>` + lamp(110, G) + lamp(490, G) + ground() + people(150, 450, G + 24, 18),
    bedside: () => `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#h3)" opacity=".35"/>` + tallWindow(410, 28, 80, 100) + curtain(396, 22, 112) + `<path d="M80 ${G}V96h16v24h220V96h16v${G - 96}" ${S} stroke-width="1.6"/><path d="M96 120q110 -18 220 0v16H96Z" ${F('h1')}/><circle cx="120" cy="110" r="10" fill="var(--paper)" stroke="currentColor"/>` +
      `<rect x="360" y="${G - 46}" width="30" height="46" ${S}/><path d="M375 ${G - 46}v-14" ${S}/><path d="M375 ${G - 66}q-4 -6 0 -10q4 4 0 10" ${solid}/><circle cx="375" cy="${G - 66}" r="22" fill="currentColor" opacity=".07"/>` + ground(G + 4),
    mill: () => sky() + chimney(90, G - 40, 110) + chimney(440, G - 40, 96) + chimney(520, G - 30, 80) + block(40, 150, 40, G, 'h1', { win: [9, 2] }) + block(380, 200, 40, G, 'h1', { win: [12, 2] }) +
      Array.from({ length: 7 }, (_, i) => block(200 + i * 26, 26, 30, G, 'h2', { gable: 10 })).join('') + ground() + people(210, 380, G + 22, 9),
    newyork: () => sky() + [[20, 50, 64], [74, 40, 96], [118, 46, 70], [168, 36, 120], [208, 60, 82], [272, 44, 104], [320, 52, 70], [376, 40, 128], [420, 58, 88], [482, 46, 110], [532, 60, 74]].map(([x, w, h]) => block(x, w, h, G, 'h1', { win: [3, Math.floor(h / 22)] })).join('') +
      `<path d="M0 ${G - 18}H${W}M0 ${G - 13}H${W}" ${S} stroke-width="1.6"/>` + Array.from({ length: 13 }, (_, i) => `<line x1="${i * 50 + 10}" y1="${G - 13}" x2="${i * 50 + 10}" y2="${G}" stroke="currentColor" stroke-width="1.4"/>`).join('') + ground(),
    cuba: () => sky(6) + sun(470, 42) + mountains([[60, 110], [150, 92], [240, 112], [330, 98], [420, 114], [520, 100]], 'h3') + palm(90, G, 70) + palm(130, G, 54) + palm(520, G, 66) + `<path d="M0 ${G}q40 -10 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0" ${F('h2')}/>` + ground() + people(220, 400, G + 6, 10),
    frontier: () => sky(6) + mountains([[40, 70], [110, 40], [170, 82], [240, 36], [320, 90], [380, 52], [450, 30], [520, 76], [580, 54]], 'h1') + `<path d="M0 ${G}L100 120L200 ${G}" ${F('h2')}/>` +
      block(260, 50, 46, G, 'hx') + `<path d="M260 ${G - 46}h50v-6h-6v4h-6v-4h-6v4h-6v-4h-6v4h-6v-4h-6v4h-8z" ${S}/>` + tent(380, G) + tent(420, G) + tent(460, G, 28) + ground(),
    india: () => sky(6) + sun(90, 40, 14) + palm(470, G, 72) + palm(520, G, 60) + `<rect x="160" y="${G - 46}" width="270" height="46" ${F('h3')}/><path d="M140 ${G - 46}L295 ${G - 92}L450 ${G - 46}Z" ${F('h2')}/>` +
      Array.from({ length: 8 }, (_, i) => `<rect x="${170 + i * 35}" y="${G - 46}" width="5" height="46" fill="var(--paper)" stroke="currentColor"/>`).join('') + tree(60, G, 1.2) + ground(),
    whitehall: () => sky() + tree(40, G, 1.5) + tree(100, G, 1.2) + `<rect x="150" y="${G - 96}" width="400" height="96" ${F('h1')}/>` + windows(150, G - 96, 400, 96, 13, 3, true) + `<path d="M144 ${G - 96}H556V${G - 104}H144Z" ${F('h2')}/>` + block(250, 60, 120, G, 'h1', { win: [2, 4], arch: true }) + `<path d="M250 ${G - 120}h60v-8h-60z" ${F('h2')}/>` + ground() + lamp(130, G),
    desert: () => sky(8) + sun(110, 46, 18) + `<path d="M0 ${G - 8}Q300 ${G - 22} 600 ${G - 8}V${G}H0Z" ${F('h3')}/>` + `<rect x="380" y="${G - 46}" width="60" height="38" ${F('h1')}/><path d="M384 ${G - 46}q26 -46 52 0" ${F('h2')}/><path d="M410 ${G - 70}v-10" ${S}/>` +
      block(330, 40, 24, G - 8, 'hx') + block(460, 70, 20, G - 8, 'hx') + palm(540, G - 6, 50) + ground() + `<path d="M40 ${G + 12}h200" ${S} stroke-width=".7"/>` + people(60, 260, G + 22, 14),
    club: () => `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#h3)" opacity=".3"/>` + tallWindow(40, 20, 70, 118) + tallWindow(490, 20, 70, 118) + frame(250, 18, 100, 92) + chandelier(170, 48) + chandelier(430, 48) + tableSet(140, G + 8, 320) +
      `<path d="M0 ${G + 8}H${W}" ${S} stroke-width="1.4"/><rect x="0" y="${G + 8}" width="${W}" height="${H - G}" fill="url(#hx)" opacity=".35"/>`,
    veldt: () => sky(7) + mountains([[80, 112], [140, 90], [200, 110], [360, 118], [430, 80], [500, 104], [560, 96]], 'h3') + `<path d="M420 ${G}q40 -60 90 -54q40 4 60 54Z" ${F('h1')}/>` + rails(G - 2) + engine(180, G - 2) + `<rect x="80" y="${G - 34}" width="86" height="26" ${F('hx')} transform="rotate(-9 120 ${G})"/>` + `<rect x="300" y="${G - 32}" width="70" height="24" ${F('h1')}/>` + `<path d="M480 66l8 -6l6 4" ${S}/><circle cx="470" cy="70" r="6" fill="currentColor" opacity=".18"/>`,
    prison: () => sky(8) + moon(90, 34, 10) + `<rect x="150" y="${G - 56}" width="320" height="56" ${F('h1')}/><path d="M140 ${G - 56}L310 ${G - 84}L480 ${G - 56}Z" ${F('h2')}/>` + windows(150, G - 56, 320, 56, 10, 1, true) + wall(0, 140, 30) + wall(480, 120, 30) +
      `<path d="M520 ${G - 30}v-28" ${S} stroke-width="1.4"/><circle cx="520" cy="${G - 62}" r="3" ${solid}/><path d="M516 ${G - 56}l-6 -16" ${S}/>` + lamp(110, G) + ground(),
    ballroom: () => `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#h3)" opacity=".28"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M${30 + i * 120} ${G}V60a40 40 0 0 1 80 0V${G}" ${S}/>`).join('') + chandelier(150, 40) + chandelier(300, 34) + chandelier(450, 40) + tableSet(80, G + 6, 180) + tableSet(340, G + 6, 180) +
      `<path d="M0 ${G + 6}H${W}" ${S} stroke-width="1.4"/>`,
    embankment: () => sky(7) + moon(80, 30, 10) + big(110, G - 10) + `<rect x="150" y="${G - 52}" width="250" height="42" ${F('h1')}/>` + pinnacles(150, 250, G - 52, 16) + `<path d="M380 ${G - 10}q60 -30 120 0q60 -30 100 0" ${S} stroke-width="1.4"/>` + river(G - 4) + lamp(470, G + 4) + lamp(540, G + 4),
  };

  TM.plate = function (key, label) {
    const draw = plates[key] || plates.city;
    return `<figure class="plate" aria-label="${label || ''}"><svg viewBox="0 0 ${W} ${H}" role="img" aria-hidden="true">${defs}<g mask="url(#vm)">${draw()}</g></svg>${label ? `<figcaption>${label}</figcaption>` : ''}</figure>`;
  };
  TM.PLATE_KEYS = Object.keys(plates);
})();
