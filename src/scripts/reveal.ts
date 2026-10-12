// Apparition au défilement : chaque élément marqué `data-reveal` passe de caché à visible quand il entre à l'écran.
// Le CSS (global.css) ne cache rien tant que <html> n'a pas la classe `rv`, posée par le script du <head>.
const root = document.documentElement;

if (root.classList.contains('rv')) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  for (const el of document.querySelectorAll('[data-reveal]')) io.observe(el);
  root.dataset.rvReady = '1';
}
