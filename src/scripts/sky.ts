// Ciel de l'application : Voie lactée pixel en bande diagonale, bulbe chaud, bords froids, faille de poussière,
// quelques étoiles colorées ou à croix qui scintillent par paliers. Densité faible : le vide fait partie du design.
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
const S = 3; // un pixel du ciel = 3 pixels écran
const PAD = 60;

function noise(w: number, h: number, cell: number) {
  const gw = Math.ceil(w / cell) + 2;
  const gh = Math.ceil(h / cell) + 2;
  const g = Array.from({ length: gw * gh }, () => Math.random());
  const smooth = (t: number) => t * t * (3 - 2 * t);
  return (px: number, py: number) => {
    const u = px / cell;
    const v = py / cell;
    const i0 = u | 0;
    const j0 = v | 0;
    const fu = smooth(u - i0);
    const fv = smooth(v - j0);
    const a = g[j0 * gw + i0]!;
    const b = g[j0 * gw + i0 + 1]!;
    const c = g[(j0 + 1) * gw + i0]!;
    const d = g[(j0 + 1) * gw + i0 + 1]!;
    return (a + (b - a) * fu) * (1 - fv) + (c + (d - c) * fu) * fv;
  };
}

export function initSky(wrap: HTMLElement, sky: HTMLCanvasElement, twinkle: HTMLCanvasElement, reduce: boolean) {
  const x = sky.getContext('2d')!;
  const xt = twinkle.getContext('2d')!;
  let stars: [number, number][] = [];
  let built = { w: 0, h: 0 };

  function build() {
    const w = Math.ceil((innerWidth + PAD) / S);
    const h = Math.ceil((innerHeight + PAD) / S);
    sky.width = twinkle.width = w;
    sky.height = twinkle.height = h;
    built = { w: innerWidth, h: innerHeight };
    stars = [];
    x.clearRect(0, 0, w, h);

    const E = Math.exp;
    const pw = Math.pow;
    const n1 = noise(w, h, 18);
    const n2 = noise(w, h, 7);
    const alpha = [0, 0.06, 0.12, 0.21];
    const warm = [255, 226, 186];
    const cool = [150, 175, 235];
    const palette = ['255,255,255', '255,226,190', '190,210,255'];
    const perp = (px: number, py: number) => (py - h * 0.55 + ((px * 0.45 * h) / w) * -1 + h * 0.1) / 1.15;

    for (let j = 0; j < h; j += 2) {
      for (let i = 0; i < w; i += 2) {
        const p = perp(i, j);
        const t = i / w;
        const band = E(-pw(p / (h * 0.19), 2));
        const core = E(-pw((t - 0.68) / 0.16, 2)) * E(-pw(p / (h * 0.09), 2)) * 0.95;
        const lane = E(-pw((p - h * 0.012) / (h * 0.024), 2)) * (0.3 + 0.7 * n2(i, j));
        const v = (band * (0.45 + 1.0 * n1(i, j)) + core) * (1 - 0.88 * lane);
        const q = Math.min(3, Math.floor(v * 2.8 + (BAYER[((j / 2) | 0) % 4]![((i / 2) | 0) % 4]! + 0.5) / 16));
        if (q > 0) {
          const m = Math.min(1, core * 1.6);
          const rgb = [0, 1, 2].map((z) => (cool[z]! + (warm[z]! - cool[z]!) * m) | 0);
          x.fillStyle = `rgba(${rgb.join(',')},${alpha[q]})`;
          x.fillRect(i, j, 2, 2);
        }
      }
    }

    // Poussière d'étoiles : plus dense dans la bande.
    for (let k = 0, n = (w * h) / 40; k < n; k++) {
      const px = Math.random() * w;
      const py = Math.random() * h;
      const pp = perp(px, py);
      if (Math.random() < 0.05 + 0.95 * E(-pw(pp / (h * 0.23), 2))) {
        x.fillStyle = `rgba(${palette[(Math.random() * 3) | 0]},${0.2 + Math.random() * 0.7})`;
        x.fillRect(px | 0, py | 0, 1, 1);
        if (Math.random() < 0.012 && stars.length < 40) stars.push([px | 0, py | 0]);
      }
    }
    // Quelques étoiles à croix.
    for (let k = 0; k < 18; k++) {
      const sx = (Math.random() * w) | 0;
      const sy = (Math.random() * h) | 0;
      const col = palette[(Math.random() * 3) | 0];
      x.fillStyle = `rgba(${col},.95)`;
      x.fillRect(sx, sy, 1, 1);
      x.fillStyle = `rgba(${col},.5)`;
      x.fillRect(sx - 1, sy, 1, 1);
      x.fillRect(sx + 1, sy, 1, 1);
      x.fillRect(sx, sy - 1, 1, 1);
      x.fillRect(sx, sy + 1, 1, 1);
      if (stars.length < 48) stars.push([sx, sy]);
    }
  }

  function tick() {
    xt.clearRect(0, 0, twinkle.width, twinkle.height);
    for (const [sx, sy] of stars) {
      if (Math.random() < 0.5) {
        xt.fillStyle = `rgba(255,255,255,${0.45 + Math.random() * 0.55})`;
        xt.fillRect(sx, sy, 1, 1);
        if (Math.random() < 0.25) {
          xt.fillRect(sx - 1, sy, 1, 1);
          xt.fillRect(sx + 1, sy, 1, 1);
          xt.fillRect(sx, sy - 1, 1, 1);
          xt.fillRect(sx, sy + 1, 1, 1);
        }
      }
    }
  }

  build();
  tick();

  // Sur mobile, la barre d'adresse change la hauteur : on ne reconstruit que si la largeur change ou si le ciel devient trop court.
  let timer = 0;
  addEventListener('resize', () => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (innerWidth !== built.w || innerHeight > built.h) {
        build();
        tick();
      }
    }, 150);
  });

  if (reduce) return;
  setInterval(() => {
    if (!document.hidden) tick();
  }, 420);
  if (matchMedia('(pointer: fine)').matches) {
    addEventListener('mousemove', (e) => {
      wrap.style.transform = `translate(${(-(e.clientX / innerWidth - 0.5) * 20).toFixed(1)}px,${(-(e.clientY / innerHeight - 0.5) * 14).toFixed(1)}px)`;
    });
  }
}
