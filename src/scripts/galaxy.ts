// Galaxie pixel de l'application : barre centrale, deux bras ouverts, voies de poussière, amas brillants.
// Dégradé : cœur chaud → teinte du profil → bleu froid sur les bords, rendu en 5 paliers avec une trame de Bayer 4 × 4
// (le guide interdit les dégradés lissés : tout est fait de carrés).
export type Tint = [number, number, number];

const N = 160;
const C = N / 2;
const PHI = -0.45;
const TL = 0.62;
const cs = Math.cos(PHI);
const sn = Math.sin(PHI);
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
const LEVELS = [0, 60, 125, 190, 255];
const WARM = [255, 238, 212];
const COOL = [150, 190, 255];

const gz = () => Math.random() + Math.random() + Math.random() - 1.5;
const arm = (r: number, k: number) => 0.3 + 1.7 * Math.log(1 + r / 8) + (k % 2) * Math.PI;

// Particules (rayon, angle, poids) et grille de fond : calculées une seule fois, partagées par toutes les instances.
const pr: number[] = [];
const pa: number[] = [];
const pw: number[] = [];
const add = (r: number, a: number, w: number) => {
  pr.push(r);
  pa.push(a);
  pw.push(w);
};

for (let k = 0; k < 5200; k++) {
  const r = 6 + Math.pow(Math.random(), 0.8) * 70;
  add(r, arm(r, k) + gz() * (0.12 + r * 0.0045), 0.2 + Math.random() * 0.4);
}
for (let k = 0; k < 900; k++) {
  const bt = (Math.random() - 0.5) * 44;
  const bj = gz() * 3.2;
  const bx = bt * Math.cos(0.3) - bj * Math.sin(0.3);
  const by = bt * Math.sin(0.3) + bj * Math.cos(0.3);
  add(Math.hypot(bx, by), Math.atan2(by, bx), 0.55);
}
for (let k = 0; k < 900; k++) add(Math.pow(Math.random(), 2.2) * 16, Math.random() * 6.283, 0.5);
for (let k = 0; k < 700; k++) add(Math.random() * 78, Math.random() * 6.283, 0.12);
for (let k = 0; k < 1200; k++) {
  const r = 10 + Math.random() * 64;
  add(r, arm(r, k) + Math.PI / 2 + gz() * 0.5, 0.12);
}
for (let k = 0; k < 90; k++) {
  const r = 14 + Math.random() * 54;
  add(r, arm(r, k) + gz() * 0.07, 1.3);
}
for (let k = 0; k < 1400; k++) {
  const r = 10 + Math.random() * 50;
  add(r, arm(r, k) + 0.38 + gz() * 0.07, -0.3);
}

const PR = Float32Array.from(pr);
const PA = Float32Array.from(pa);
const PW = Float32Array.from(pw);
const BG = new Float32Array(N * N);
const RB = new Uint8Array(N * N);
for (let j = 0; j < N; j++) {
  for (let i = 0; i < N; i++) {
    const dx = i - C;
    const dy = j - C;
    const u = dx * cs + dy * sn;
    const v = (-dx * sn + dy * cs) / TL;
    const d = Math.hypot(u, v);
    BG[j * N + i] = 0.8 * Math.exp(-Math.pow(d / 9, 2)) + 0.2 * Math.exp(-Math.pow(d / 34, 2));
    RB[j * N + i] = Math.min(7, (d / 10) | 0);
  }
}

export interface Galaxy {
  /** Change la teinte du profil (la galaxie y glisse en environ une seconde). */
  setTint(next: Tint): void;
  /** Petit coup de lumière et de rotation, pour un changement de profil. */
  kick(): void;
}

export function createGalaxy(canvas: HTMLCanvasElement, initial: Tint, reduce: boolean): Galaxy {
  canvas.width = N;
  canvas.height = N;
  const g = canvas.getContext('2d')!;
  const img = g.createImageData(N, N);
  const data = img.data;
  const grid = new Float32Array(N * N);
  const table = new Uint8Array(5 * 8 * 3);
  const tint: number[] = [...initial];
  let target: number[] = [...initial];
  let spin = 0;
  let spinTarget = 0;
  let flash = 0;

  function draw(t: number) {
    const rot = t * 0.14 + spin;
    const gain = 1 + 1.1 * flash;
    grid.fill(0);
    for (let n = 0; n < PR.length; n++) {
      const a = PA[n]! + rot;
      const px = PR[n]! * Math.cos(a);
      const py = PR[n]! * Math.sin(a) * TL;
      const X = (C + px * cs - py * sn) | 0;
      const Y = (C + px * sn + py * cs) | 0;
      if (X >= 0 && X < N && Y >= 0 && Y < N) grid[Y * N + X]! += PW[n]!;
    }

    for (let z = 0; z < 3; z++) tint[z]! += (target[z]! - tint[z]!) * (reduce ? 1 : 0.12);
    for (let q = 0; q < 5; q++) {
      const lum = LEVELS[q]! / 255;
      for (let b = 0; b < 8; b++) {
        const tt = b / 7;
        for (let z = 0; z < 3; z++) {
          const acc = Math.min(255, tint[z]! * 0.75 + 64);
          const cool = Math.round(tint[z]! * 0.3 + COOL[z]! * 0.7);
          let base = tt < 0.5 ? WARM[z]! + (acc - WARM[z]!) * (tt / 0.5) : acc + (cool - acc) * ((tt - 0.5) / 0.5);
          if (q === 4) base = base * 0.75 + 255 * 0.25;
          table[(q * 8 + b) * 3 + z] = Math.round(base * lum);
        }
      }
    }

    for (let s = 0; s < N * N; s++) {
      const vv = Math.max(0, Math.min(1, (BG[s]! + grid[s]! * 0.85) * gain));
      const q = Math.max(0, Math.min(4, Math.floor(vv * 4 + (BAYER[((s / N) | 0) % 4]![(s % N) % 4]! + 0.5) / 16)));
      const o = (q * 8 + RB[s]!) * 3;
      data[s * 4] = table[o]!;
      data[s * 4 + 1] = table[o + 1]!;
      data[s * 4 + 2] = table[o + 2]!;
      data[s * 4 + 3] = q ? 255 : 0;
    }
    g.putImageData(img, 0, 0);
  }

  draw(0);
  if (!reduce) {
    // 15 images par seconde, comme dans l'app ; à l'arrêt quand le visuel est hors écran ou l'onglet caché.
    let visible = true;
    let last = 0;
    const t0 = performance.now();
    new IntersectionObserver(([entry]) => (visible = !!entry?.isIntersecting)).observe(canvas);
    const loop = (now: number) => {
      if (visible && !document.hidden && now - last > 66) {
        last = now;
        spin += (spinTarget - spin) * 0.09;
        flash = Math.max(0, flash - 0.035);
        draw((now - t0) / 1000);
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  return {
    setTint(next) {
      target = [...next];
      if (reduce) draw(0);
    },
    kick() {
      if (reduce) return;
      spinTarget += 1.5;
      flash = 1;
    },
  };
}
