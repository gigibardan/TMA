document.addEventListener('DOMContentLoaded', function() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.trainer-card');
            const shortBio = card.querySelector('.trainer-bio-short');
            const fullBio = card.querySelector('.trainer-bio-full');
            
            if (fullBio.style.display === 'block') {
                fullBio.style.display = 'none';
                shortBio.style.display = 'block';
                this.textContent = 'Citește mai mult';
            } else {
                fullBio.style.display = 'block';
                shortBio.style.display = 'none';
                this.textContent = 'Citește mai puțin';
            }
        });
    });
});