// pachete.js - JavaScript pentru pagina de pachete

document.addEventListener('DOMContentLoaded', () => {
    // Inițializăm particlele pentru hero section
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Funcționalitate pentru FAQ accordions - varianta îmbunătățită
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Setăm înălțimea inițială la 0
        if (answer) {
            answer.style.maxHeight = '0';
        }
        
        question.addEventListener('click', () => {
            // Închide toate celelalte
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                    }
                }
            });
            
            // Toggle starea curentă
            item.classList.toggle('active');
            
            // Actualizăm maxHeight
            if (answer) {
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0';
                }
            }
        });
    });

    // Animație pentru carduri la scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observăm cardurile și alte elemente pentru animații
    const animatedElements = document.querySelectorAll('.package-card, .faq-item');
    
    animatedElements.forEach((element, index) => {
        // Adăugăm un delay incrementat pentru fiecare element
        element.style.transitionDelay = `${index * 0.1}s`;
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Efect de hover avansat pentru carduri
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculăm poziția relativă în cadrul cardului (0-1)
            const posX = x / rect.width;
            const posY = y / rect.height;
            
            // Aplicăm o rotație ușoară bazată pe poziția mouse-ului
            const tiltX = (posY - 0.5) * 5; // -2.5 la 2.5 grade
            const tiltY = (0.5 - posX) * 5; // -2.5 la 2.5 grade
            
            // Aplicăm transformarea
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
            
            // Ajustăm umbra în funcție de poziție
            const shadowX = (posX - 0.5) * 20;
            const shadowY = (posY - 0.5) * 20;
            card.style.boxShadow = `
                ${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.4),
                0 10px 20px rgba(0, 0, 0, 0.2)
            `;
        });
        
        // Resetăm transformarea când mouse-ul părăsește cardul
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            
            // Adăugăm o tranziție pentru revenire
            card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            
            // Eliminăm tranziția după revenire pentru a nu afecta hover-ul viitor
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
    });

    // Custom styling pentru butoanele Stripe după încărcare
    // Acest cod va încerca să personalizeze butoanele Stripe după ce sunt încărcate
    const checkStripeButtons = setInterval(() => {
        const stripeButtons = document.querySelectorAll('stripe-buy-button');
        if (stripeButtons.length > 0) {
            stripeButtons.forEach(button => {
                // Verificăm dacă shadow DOM-ul butonului este încărcat
                if (button.shadowRoot) {
                    // Adăugăm un stil custom în shadow DOM
                    const style = document.createElement('style');
                    style.textContent = `
                        .buy-button {
                            width: 100% !important;
                            border-radius: 8px !important;
                            font-weight: 600 !important;
                            height: 44px !important;
                        }
                    `;
                    button.shadowRoot.appendChild(style);
                }
            });
            
            clearInterval(checkStripeButtons);
        }
    }, 500);
});

// Adăugăm clase CSS pentru animații
document.addEventListener('DOMContentLoaded', () => {
    // Adăugăm clasa pentru fade-in la carduri
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + index * 150);
    });
});