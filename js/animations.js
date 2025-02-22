// animations.js
document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-in-left, .slide-in-right');
    const scalers = document.querySelectorAll('.scale-in');
    const staggers = document.querySelectorAll('.stagger-fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(
        function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            });
        }, 
        appearOptions
    );

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });

    scalers.forEach(scaler => {
        appearOnScroll.observe(scaler);
    });

    staggers.forEach(stagger => {
        appearOnScroll.observe(stagger);
    });
});