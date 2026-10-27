(function () {
  var form = document.getElementById('portfolio-contact-form');
  if (!form) return;
  var button = form.querySelector('button[type="submit"]');
  var status = document.getElementById('contact-status');
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
      status.textContent = 'Thank you! Your message has been sent.';
    } catch (error) {
      status.textContent = 'Your message could not be sent. Please try again.';
    } finally {
      pending = false;
      button.disabled = false;
    }
  }, true);
})();
