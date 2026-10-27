(function () {
  var form = document.getElementById('portfolio-contact-form');
  if (!form) return;
  var button = form.querySelector('button[type="submit"]');
  var status = document.getElementById('contact-status');
  var stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = '/portfolio/assets/contact.css?v=1';
  document.head.appendChild(stylesheet);
  var dialog = document.createElement('dialog');
  dialog.className = 'contact-success-dialog';
  dialog.setAttribute('aria-labelledby', 'contact-success-title');
  dialog.setAttribute('aria-describedby', 'contact-success-description');
  dialog.innerHTML = '<button type="button" class="contact-success-close" aria-label="Close confirmation" autofocus><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 3l18 18M21 3L3 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button><h2 id="contact-success-title">Thank you!</h2><p id="contact-success-description">Your message has been sent.</p>';
  document.body.appendChild(dialog);
  dialog.querySelector('button').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    var bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  var previousOverflow;
  dialog.addEventListener('close', function () {
    document.body.style.overflow = previousOverflow;
    button.focus();
  });
  function showSuccess() {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
  }
  var pending = false;
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (pending || !form.reportValidity()) return;
    pending = true;
    button.disabled = true;
    status.textContent = 'Sending…';
    try {
      var response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      status.textContent = '';
      showSuccess();
    } catch (error) {
      status.textContent = 'Your message could not be sent. Please try again.';
    } finally {
      pending = false;
      button.disabled = false;
    }
  }, true);
})();
