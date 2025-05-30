// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: window.innerWidth < 768 ? 30 : 50,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#4A90E2', '#ffffff', '#87CEEB']
        },
        shape: {
            type: ['circle', 'triangle', 'polygon'],
            polygon: {
                nb_sides: 6
            }
        },
        opacity: {
            value: 0.6,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#4A90E2',
            opacity: 0.3,
            width: 1
        },
        move: {
            enable: true,
            speed: window.innerWidth < 768 ? 1 : 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Script pentru înlocuirea automată a numărului de telefon
function replacePhoneNumber() {
    const oldPhone = '+40 758 707 448';
    const newPhone = '+40 720 549 719';
    
    // Funcție pentru înlocuirea textului în toate nodurile text
    function replaceTextInNode(node) {
        if (node.nodeType === 3) { // Text node
            if (node.textContent.includes(oldPhone)) {
                node.textContent = node.textContent.replace(new RegExp(oldPhone.replace(/[+\s]/g, '\\$&'), 'g'), newPhone);
            }
        } else if (node.nodeType === 1) { // Element node
            // Parcurge toți copiii nodului
            for (let child of node.childNodes) {
                replaceTextInNode(child);
            }
        }
    }
    
    // Începe înlocuirea din body
    replaceTextInNode(document.body);
    
    // Înlocuiește și în atributele href pentru linkurile tel:
    const telLinks = document.querySelectorAll('a[href*="tel:+40758707448"], a[href*="tel:+40 758 707 448"], a[href*="tel:40758707448"]');
    telLinks.forEach(link => {
        link.href = link.href
            .replace('tel:+40758707448', 'tel:+40720549719')
            .replace('tel:+40 758 707 448', 'tel:+40 720 549 719')
            .replace('tel:40758707448', 'tel:40720549719');
    });
}

// Execută înlocuirea când pagina s-a încărcat complet
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replacePhoneNumber);
} else {
    replacePhoneNumber();
}