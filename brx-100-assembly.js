(() => {
  'use strict';

  const artwork = document.querySelector('[data-brx-assembly]');
  if (!artwork) return;

  const still = artwork.querySelector('img');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const key = 'brx-100-assembly-seen';
  const paused = () => motion.matches || document.body.classList.contains('motion-paused');

  try {
    if (sessionStorage.getItem(key)) return;
  } catch {
    // Storage restrictions do not prevent playback on this visit.
  }
  if (paused()) return;

  let visibilityObserver;

  function start() {
    visibilityObserver?.disconnect();
    if (paused()) return;

    const video = document.createElement('video');
    video.width = still.width;
    video.height = still.height;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('role', 'img');
    video.setAttribute('aria-label', still.alt);
    video.poster = artwork.dataset.poster;
    video.src = artwork.dataset.src;

    const preferenceObserver = new MutationObserver(checkMotion);

    function finish() {
      if (artwork.firstElementChild !== video) return;
      artwork.replaceChildren(still);
      preferenceObserver.disconnect();
      motion.removeEventListener('change', checkMotion);
      window.removeEventListener('pagehide', finish);
      window.removeEventListener('beforeprint', finish);
      video.pause();
    }

    function checkMotion() {
      if (paused()) finish();
    }

    motion.addEventListener('change', checkMotion);
    preferenceObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('pagehide', finish);
    window.addEventListener('beforeprint', finish);
    video.addEventListener('ended', finish, { once: true });
    video.addEventListener('error', finish, { once: true });

    artwork.replaceChildren(video);
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
