// courses.js - JavaScript comun pentru toate paginile de cursuri

class CourseAnimations {
    constructor() {
        this.initScrollAnimations();
        this.initSkillCards();
        this.initSmoothScroll();
        this.initProjectCards();
        this.initParallax();
        this.initNavigationHighlight();
        this.initImageLoading();
        this.createParticles();
    }

    // Animații la scroll
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('animate-once')) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Adaugă elementele pentru animație
        const animatedElements = document.querySelectorAll('.skill-card, .project-card, .feature-card, .age-group, .learning-card');
        animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // Animații pentru skill cards
    initSkillCards() {
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const progress = card.querySelector('.skill-progress');
                if (progress) progress.style.transform = 'scaleX(1)';
            });

            card.addEventListener('mouseleave', () => {
                const progress = card.querySelector('.skill-progress');
                if (progress) progress.style.transform = 'scaleX(0)';
            });
        });
    }

    // Smooth scroll pentru anchor links
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Hover effects pentru project cards
    initProjectCards() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

   
    initParallax() {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            // Setează inițial un scale mai mare
            heroImage.style.transform = 'scale(1)';
            
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const scale = Math.max(0.9, 1 - scrolled * 0.001);
                heroImage.style.transform = `scale(${scale})`;
            });
        }
    }

    // Navigation highlight la scroll
    initNavigationHighlight() {
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`a[href="#${sectionId}"]`);

                if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else if (navLink) {
                    navLink.classList.remove('active');
                }
            });
        });
    }

    // Loading animation pentru imagini
    initImageLoading() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    }

    // Particles effect pentru hero section
    createParticles() {
        const heroSection = document.querySelector('.course-hero');
        if (!heroSection) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.setProperty('--speed', Math.random() * 3 + 1 + 's');
            particle.style.setProperty('--size', Math.random() * 10 + 5 + 'px');
            particle.style.left = Math.random() * 100 + 'vw';
            heroSection.appendChild(particle);
        }
    }

    // Utilitar pentru animarea numerelor
    static animateNumber(element, final, duration = 2000) {
        let start = 0;
        const increment = Math.ceil(final / (duration / 16));
        const timer = setInterval(() => {
            start += increment;
            if (start > final) {
                element.textContent = final;
                clearInterval(timer);
            } else {
                element.textContent = start;
            }
        }, 16);
    }
}

// Inițializare când DOM-ul e încărcat
document.addEventListener('DOMContentLoaded', () => {
    new CourseAnimations();
});

 
// Mobile menu toggle
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
    }
});



// Funcție pentru inserarea unui nou element în navbar
function insertPacheteLinkInNavbar() {
    // Găsim lista de linkuri din navbar
    const navLinks = document.querySelector('.nav-links');
    
    // Verificăm dacă elementul există
    if (!navLinks) {
        console.error("Nu s-a găsit elementul .nav-links");
        return;
    }
    
    // Creăm noul element li
    const newNavItem = document.createElement('li');
    
    // Creăm elementul ancoră
    const newLink = document.createElement('a');
    newLink.href = "https://techminds-academy.ro/pachete";
    newLink.textContent = "Prețuri";
    
    // Adăugăm ancora în elementul li
    newNavItem.appendChild(newLink);
    
    // Găsim elementul Robotică pentru a insera după el
    // sau Despre noi pentru a insera înainte de el
    const roboticsLi = Array.from(navLinks.querySelectorAll('li')).find(li => {
        const link = li.querySelector('a');
        return link && link.textContent === "Robotică";
    });
    
    const aboutLi = Array.from(navLinks.querySelectorAll('li')).find(li => {
        const link = li.querySelector('a');
        return link && link.textContent === "Despre noi";
    });
    
    if (roboticsLi && aboutLi) {
        // Inserăm după Robotică și înainte de Despre noi
        navLinks.insertBefore(newNavItem, aboutLi);
    } else if (roboticsLi) {
        // Inserăm după Robotică dacă există
        const nextSibling = roboticsLi.nextElementSibling;
        if (nextSibling) {
            navLinks.insertBefore(newNavItem, nextSibling);
        } else {
            navLinks.appendChild(newNavItem);
        }
    } else if (aboutLi) {
        // Inserăm înainte de Despre noi dacă Robotică nu există
        navLinks.insertBefore(newNavItem, aboutLi);
    } else {
        // Dacă nu găsim nici Robotică, nici Despre noi, adăugăm la sfârșit
        navLinks.appendChild(newNavItem);
    }
}


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
// Executăm funcția după ce DOM-ul a fost încărcat complet
document.addEventListener('DOMContentLoaded', insertPacheteLinkInNavbar);

