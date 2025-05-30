// ===== FUNCȚIONALITATE TABURI =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 TechMinds Academy - Orange Partnership Page Loading...');
    
    const tabs = document.querySelectorAll('.ofertapartener-tab');
    const tabContents = document.querySelectorAll('.ofertapartener-tab-content');

    // Funcție pentru schimbarea taburilor cu animații
    function switchTab(targetTab) {
        // Animație fade out pentru conținutul curent
        const currentContent = document.querySelector('.ofertapartener-tab-content.active');
        if (currentContent) {
            currentContent.style.opacity = '0';
            currentContent.style.transform = 'translateY(20px)';
        }

        setTimeout(() => {
            // Elimină clasa active de la toate taburile și conținutul
            tabs.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Adaugă clasa active la tabul curent și conținutul corespunzător
            const targetTabElement = document.querySelector(`[data-tab="${targetTab}"]`);
            const targetContentElement = document.getElementById(targetTab);
            
            if (targetTabElement && targetContentElement) {
                targetTabElement.classList.add('active');
                targetContentElement.classList.add('active');
                
                // Animație fade in pentru noul conținut
                setTimeout(() => {
                    targetContentElement.style.opacity = '1';
                    targetContentElement.style.transform = 'translateY(0)';
                }, 50);

                // Smooth scroll la secțiune
                targetContentElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Analytics tracking
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'tab_switch', {
                        'event_category': 'navigation',
                        'event_label': targetTab,
                        'value': 1
                    });
                }
            }
        }, 200);
    }

    // Event listeners pentru taburi
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
            
            // Efect de undă la click
            createRippleEffect(this);
        });
    });

    // ===== EFECT DE UNDĂ LA CLICK =====
    function createRippleEffect(element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // CSS pentru animația ripple
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ===== ANIMAȚII LA SCROLL AVANSATE =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const slideUpObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observă cardurile de pachete pentru animații
    const packageCards = document.querySelectorAll('.ofertapartener-package-card');
    const benefitCards = document.querySelectorAll('.ofertapartener-benefit-card');
    const programCards = document.querySelectorAll('.ofertapartener-program-card');
    
    [...packageCards, ...benefitCards, ...programCards].forEach(card => {
        slideUpObserver.observe(card);
    });

    // ===== EFECTE HOVER AVANSATE PENTRU CARDURI =====
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateX(5deg)';
            this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
            
            // Schimbă culoarea prețului la hover pentru vizibilitate pe background orange
            const priceElement = this.querySelector('.ofertapartener-price-discounted');
            if (priceElement) {
                priceElement.style.color = 'white';
                priceElement.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
            }
            
            // Efect paralax pentru conținutul cardului
            const cardContent = this.querySelector('.ofertapartener-card-body');
            if (cardContent) {
                cardContent.style.transform = 'translateZ(20px)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)';
            
            // Revert price color
            const priceElement = this.querySelector('.ofertapartener-price-discounted');
            if (priceElement) {
                priceElement.style.color = '';  // Șterge inline style
                priceElement.style.textShadow = ''; // Șterge inline style
            }
            
            const cardContent = this.querySelector('.ofertapartener-card-body');
            if (cardContent) {
                cardContent.style.transform = 'translateZ(0px)';
            }
        });

        // Efect de urmărire a mouse-ului
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const tiltX = (y / rect.height) * 10;
            const tiltY = (x / rect.width) * -10;
            
            this.style.transform = `translateY(-15px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
    });

    // ===== COPY TO CLIPBOARD PENTRU CODUL DE REDUCERE =====
    const discountCodes = document.querySelectorAll('.ofertapartener-code');
    discountCodes.forEach(code => {
        code.addEventListener('click', function() {
            // Copiază textul în clipboard
            navigator.clipboard.writeText(this.textContent).then(() => {
                // Feedback vizual îmbunătățit
                const originalText = this.textContent;
                const originalBg = this.style.backgroundColor;
                const originalColor = this.style.color;
                
                this.textContent = '✓ Copiat!';
                this.style.backgroundColor = '#28a745';
                this.style.color = 'white';
                this.style.transform = 'scale(1.1)';
                
                // Show notification
                showNotification('Cod de reducere copiat cu succes!', 'success');
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = originalBg;
                    this.style.color = originalColor;
                    this.style.transform = 'scale(1)';
                }, 2000);
            }).catch(() => {
                // Fallback pentru browsere care nu suportă clipboard API
                showNotification('Cod de reducere: ' + this.textContent, 'info');
            });
        });

        // Adaugă cursor pointer și tooltip
        code.style.cursor = 'pointer';
        code.title = 'Click pentru a copia codul de reducere';
    });

    // ===== SMOOTH SCROLL PENTRU LINK-URI INTERNE =====
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== TRACKING PENTRU BUTOANE DE PLATĂ =====
    const paymentButtons = document.querySelectorAll('stripe-buy-button, .ofertapartener-btn');
    paymentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageType = this.closest('.ofertapartener-package-card') ? 
                this.closest('.ofertapartener-package-card').querySelector('.ofertapartener-card-title').textContent : 
                'Unknown Package';
            
            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'purchase_intent', {
                    'event_category': 'payment',
                    'event_label': `orange_partnership_${packageType}`,
                    'value': 1
                });
            }
            
            // Facebook Pixel tracking
            if (typeof fbq !== 'undefined') {
                fbq('track', 'InitiateCheckout', {
                    content_name: `Orange Partnership - ${packageType}`,
                    content_category: 'Education',
                    currency: 'RON'
                });
            }

            // Loading state
            this.classList.add('ofertapartener-loading');
            setTimeout(() => {
                this.classList.remove('ofertapartener-loading');
            }, 3000);
        });
    });

    // ===== VALIDARE PENTRU CODUL DE REDUCERE =====
    function validateDiscountCode(code) {
        const validCodes = ['PartenerOrange', 'partenerOrange', 'PARTENERORANGE'];
        return validCodes.includes(code);
    }

    // ===== RESPONSIVE MENU TOGGLE =====
    const menuButton = document.querySelector('.menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
            
            // Animație hamburger menu
            this.classList.toggle('active');
        });
    }

    // ===== LAZY LOADING PENTRU IMAGINI =====
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ===== PERFORMANCE OPTIMIZATION =====
    // Preload important resources
    const criticalResources = [
        'https://techminds-academy.ro/assets/images/logo-techminds-academy.webp',
        'https://www.orange.ro/_next/static/media/orange-logo.bca59c66.svg'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'image';
        document.head.appendChild(link);
    });

    // ===== ACCESSIBILITY IMPROVEMENTS =====
    // Keyboard navigation pentru taburi
    tabs.forEach((tab, index) => {
        tab.setAttribute('tabindex', '0');
        tab.setAttribute('role', 'tab');
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            // Navigare cu săgețile
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const direction = e.key === 'ArrowRight' ? 1 : -1;
                const nextIndex = (index + direction + tabs.length) % tabs.length;
                tabs[nextIndex].focus();
            }
        });
    });

    // Focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // ===== GENTLE PARALLAX EFFECTS =====
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.ofertapartener-hero');
        
        if (hero) {
            const speed = 0.3;
            hero.style.transform = `translateY(${scrolled * speed}px)`;
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ===== AUTO HIGHLIGHT BEST OFFER =====
    setTimeout(() => {
        const combinedPackage = document.querySelector('.ofertapartener-package-card:last-child');
        if (combinedPackage) {
            combinedPackage.style.animation = 'highlightBestOffer 2s ease-in-out';
        }
    }, 2000);

    // CSS pentru highlight animation
    const highlightStyle = document.createElement('style');
    highlightStyle.textContent = `
        @keyframes highlightBestOffer {
            0%, 100% { box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
            50% { box-shadow: 0 20px 50px rgba(40,167,69,0.3); transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(highlightStyle);

    console.log('✅ TechMinds Academy - Orange Partnership Page Loaded Successfully!');
    console.log('🎯 All features activated: Gentle Animations, Tracking, Accessibility, Performance');
});

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.ofertapartener-notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `ofertapartener-notification ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}" style="margin-right: 10px;"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 4000);
}

// Funcție pentru formatarea prețurilor
function formatPrice(price) {
    return new Intl.NumberFormat('ro-RO', {
        style: 'currency',
        currency: 'RON',
        minimumFractionDigits: 0
    }).format(price);
}

// Funcție pentru calcularea economiilor
function calculateSavings(originalPrice, discountedPrice) {
    const savings = originalPrice - discountedPrice;
    const percentage = Math.round((savings / originalPrice) * 100);
    return {
        amount: savings,
        percentage: percentage,
        formatted: formatPrice(savings)
    };
}

// ===== EASTER EGG SIMPLU =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        showNotification('🎉 Easter Egg activat! Ai descoperit codul secret TechMinds!', 'success');
        // Efect subtle
        document.body.style.transition = 'filter 2s ease';
        document.body.style.filter = 'hue-rotate(45deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 2000);
    }
});

// Export functions pentru utilizare externă
window.OfertaPartener = {
    showNotification,
    formatPrice,
    calculateSavings,
    validateDiscountCode: (code) => {
        const validCodes = ['PartenerOrange', 'partenerOrange', 'PARTENERORANGE'];
        return validCodes.includes(code);
    }
};

// ===== DEBUGGING HELPERS =====
if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
    console.log('🔧 Development mode detected');
    window.OfertaPartenerDebug = {
        testNotification: () => showNotification('Test notification', 'success'),
        switchTab: (tabName) => document.querySelector(`[data-tab="${tabName}"]`).click(),
        getAllCards: () => document.querySelectorAll('.ofertapartener-package-card'),
        getDiscountCodes: () => document.querySelectorAll('.ofertapartener-code')
    };
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