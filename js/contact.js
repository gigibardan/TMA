document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const form = this;
    const button = form.querySelector('button');
    const originalText = button.textContent;

    button.textContent = 'Se trimite...';
    button.style.opacity = '0.8';

    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            button.textContent = 'Mesaj trimis! ✓';
            button.style.background = '#10b981';
            form.reset();

            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.style.opacity = '1';
            }, 3000);
        } else {
            button.textContent = 'Eroare! Încearcă din nou.';
            button.style.background = '#e63946';
        }
    })
    .catch(error => {
        button.textContent = 'Eroare! Verifică conexiunea.';
        button.style.background = '#e63946';
    });
});
