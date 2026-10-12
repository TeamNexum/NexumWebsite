// Effets sonores de la démo : synthétisés à la volée (aucun fichier), carrés et brefs comme le reste du pixel art.
// Coupés par défaut : rien ne sonne tant que le visiteur n'a pas activé le bouton « Son ». Le choix est gardé dans le navigateur.
const KEY = 'nexum-sound';
const VOLUME = 0.05;

let ctx: AudioContext | null = null;
let on = false;

try {
  on = localStorage.getItem(KEY) === 'on';
} catch {
  // Stockage indisponible (navigation privée) : le son reste coupé.
}

function context() {
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  ctx ??= new AC();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

/** Une note : onde carrée (ou dents de scie), enveloppe en escalier courte. `at` est un décalage en secondes. */
function tone(freq: number, at: number, len: number, type: OscillatorType = 'square', vol = VOLUME) {
  const c = context();
  if (!c) return;
  const t0 = c.currentTime + at;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(vol, t0);
  gain.gain.setValueAtTime(vol * 0.6, t0 + len * 0.5);
  gain.gain.linearRampToValueAtTime(0.0001, t0 + len);
  osc.connect(gain).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + len + 0.02);
}

export const sfx = {
  get enabled() {
    return on;
  },
  /** Bascule le son et le retient. À appeler depuis un geste du visiteur (clic, touche). */
  toggle() {
    on = !on;
    try {
      localStorage.setItem(KEY, on ? 'on' : 'off');
    } catch {
      // Le choix vaut pour cette visite seulement.
    }
    if (on) {
      context();
      tone(660, 0, 0.07);
    }
    return on;
  },
  /** Changement de profil. */
  pick() {
    if (on) tone(440, 0, 0.05);
  },
  /** Début de l'activation. */
  start() {
    if (!on) return;
    tone(262, 0, 0.08);
    tone(392, 0.08, 0.1);
  },
  /** Une étape de la chaîne : la hauteur monte avec le rang, une panne tombe dans le grave. */
  step(rank: number, failed: boolean) {
    if (!on) return;
    if (failed) tone(110, 0, 0.22, 'sawtooth', VOLUME * 1.2);
    else tone(330 + rank * 55, 0, 0.07);
  },
  /** Fin de la chaîne : accord montant si tout a marché, deux notes graves sinon. */
  done(ok: boolean) {
    if (!on) return;
    if (ok) [523, 659, 784].forEach((f, i) => tone(f, i * 0.09, 0.14));
    else [196, 147].forEach((f, i) => tone(f, i * 0.12, 0.18, 'sawtooth'));
  },
};
