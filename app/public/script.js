const form = document.getElementById('short-url-form');
const message = document.getElementById('message');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const payload = new URLSearchParams(formData);
  fetch('/api/shorturl', {
    method: 'POST',
    body: payload,
  })
    .then(res => res.json())
    .then(data => {
      message.innerHTML = data.error
        ? `<p>Unable to create short url for submitted url:<br /> ${formData.get('url')}</p>`
        : `<p>You successfully submitted the following url:<br />${data.original_url}</p>
           <p>Use <a href="${data.newUrl}" target="_blank">${data.newUrl}</a> as the shortened version.</p>`;
    });
})