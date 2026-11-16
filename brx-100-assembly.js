(() => {
  'use strict';

  const artwork = document.querySelector('[data-brx-assembly]');
  if (!artwork) return;

  const video = artwork.querySelector('video');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const key = 'brx-100-assembly-seen';
  const paused = () => motion.matches || document.body.classList.contains('motion-paused');

  try {
    if (sessionStorage.getItem(key)) return;
  } catch {
    // The still image remains available when storage is restricted.
  }
  if (paused()) return;

  let visibilityObserver;
  const preferenceObserver = new MutationObserver(checkMotion);

  function finish() {
    video.pause();
    artwork.classList.remove('is-assembling');
    preferenceObserver.disconnect();
    motion.removeEventListener('change', checkMotion);
  }

  function checkMotion() {
    if (paused()) finish();
  }

  function start() {
    visibilityObserver?.disconnect();
    if (paused()) return;

    video.poster = video.dataset.poster;
    video.src = video.dataset.src;
    artwork.classList.add('is-assembling');
    motion.addEventListener('change', checkMotion);
    preferenceObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    video.addEventListener('ended', finish, { once: true });
    video.addEventListener('error', finish, { once: true });
    video.play().then(() => {
      try { sessionStorage.setItem(key, '1'); } catch {}
    }).catch(finish);
  }

  if ('IntersectionObserver' in window) {
    visibilityObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.intersectionRatio >= 0.35)) start();
    }, { threshold: 0.35 });
    visibilityObserver.observe(artwork);
  } else {
    start();
  }
})();
