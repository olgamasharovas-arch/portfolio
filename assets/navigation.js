document.addEventListener('click', function (event) {
  var button = event.target.closest && event.target.closest('.back-to-top a, a.back-to-top-fixed');
  if (!button) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}, true);
