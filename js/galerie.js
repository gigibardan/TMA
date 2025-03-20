document.addEventListener('DOMContentLoaded', function() {
    // Variabile pentru elementele principale
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryCards = document.querySelectorAll('.gallery-card');
    const lightbox = document.querySelector('.gallery-lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const testimonialDots = document.querySelectorAll('.dot');
    const testimonials = document.querySelectorAll('.testimonial');
    
    let currentImageIndex = 0;
    let currentTestimonialIndex = 0;
    let isScrolling = false;
    
    // Efect de header sticky la scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                isScrolling = true;
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 100) {
                        header.style.padding = '0.5rem 0';
                        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
                    } else {
                        header.style.padding = '';
                        header.style.boxShadow = '';
                    }
                    isScrolling = false;
                });
            }
        });
    }
    
    // Funcționalitate filtrare galerie
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Resetează clasa active pentru toate butoanele
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adaugă clasa active pentru butonul curent
            button.classList.add('active');
            
            // Obține categoria selectată
            const filterValue = button.getAttribute('data-filter');
            
            // Filtrare elemente
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
    
    // Funcționalitate Lightbox
    function openLightbox(index) {
        const galleryImages = Array.from(document.querySelectorAll('.gallery-image img'));
        const galleryTitles = Array.from(document.querySelectorAll('.gallery-info h3'));
        
        currentImageIndex = index;
        
        lightboxImage.src = galleryImages[index].src;
        lightboxCaption.textContent = galleryTitles[index].textContent;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        updateLightboxButtons();
    }
    
    function closeLightboxFunc() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showPrevImage() {
        const galleryImages = Array.from(document.querySelectorAll('.gallery-image img'));
        
        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = galleryImages.length - 1;
        }
        
        updateLightbox();
    }
    
    function showNextImage() {
        const galleryImages = Array.from(document.querySelectorAll('.gallery-image img'));
        
        if (currentImageIndex < galleryImages.length - 1) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0;
        }
        
        updateLightbox();
    }
    
    function updateLightbox() {
        const galleryImages = Array.from(document.querySelectorAll('.gallery-image img'));
        const galleryTitles = Array.from(document.querySelectorAll('.gallery-info h3'));
        
        // Adaugă efect de tranziție
        lightboxImage.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImage.src = galleryImages[currentImageIndex].src;
            lightboxCaption.textContent = galleryTitles[currentImageIndex].textContent;
            lightboxImage.style.opacity = '1';
        }, 200);
        
        updateLightboxButtons();
    }
    
    function updateLightboxButtons() {
        const galleryImages = Array.from(document.querySelectorAll('.gallery-image img'));
        
        if (galleryImages.length <= 1) {
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
        } else {
            lightboxPrev.style.display = 'block';
            lightboxNext.style.display = 'block';
        }
    }
    
    // Adaugă eveniment de click pentru imaginile din galerie
    galleryCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // Eveniment pentru închiderea lightbox-ului
    if (closeLightbox && lightbox) {
        closeLightbox.addEventListener('click', closeLightboxFunc);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightboxFunc();
            }
        });
    }
    
    // Eveniment pentru navigarea prin imagini în lightbox
    if (lightboxPrev && lightboxNext) {
        lightboxPrev.addEventListener('click', showPrevImage);
        lightboxNext.addEventListener('click', showNextImage);
    }
    
    // Eveniment pentru tastatura
    if (lightbox) {
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeLightboxFunc();
                } else if (e.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                }
            }
        });
    }
    
    // Funcționalitate slider testimoniale
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.transform = `translateX(${(i - index) * 100}%)`;
        });
        
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonialIndex = index;
    }
    
    // Inițializare slider testimoniale și verificare dacă există elemente
    if (testimonials.length > 0 && testimonialDots.length > 0) {
        showTestimonial(0);
        
        // Eveniment pentru butoanele de navigare testimoniale
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
    }
    
    // Funcție pentru schimbarea automată a testimonialelor
    let testimonialInterval;
    
    if (testimonials.length > 0) {
        testimonialInterval = setInterval(() => {
            let nextIndex = (currentTestimonialIndex + 1) % testimonials.length;
            showTestimonial(nextIndex);
        }, 6000);
        
        // Oprește schimbarea automată când utilizatorul interacționează
        if (testimonialDots.length > 0) {
            testimonialDots.forEach(dot => {
                dot.addEventListener('click', () => {
                    clearInterval(testimonialInterval);
                    
                    // Repornește interval după interacțiune
                    testimonialInterval = setInterval(() => {
                        let nextIndex = (currentTestimonialIndex + 1) % testimonials.length;
                        showTestimonial(nextIndex);
                    }, 6000);
                });
            });
        }
    }
    
    // Funcționalitate buton tur virtual
    const tourBtn = document.querySelector('.tour-btn');
    if (tourBtn) {
        tourBtn.addEventListener('click', () => {
            alert('Funcționalitatea de tur virtual 360° va fi implementată în curând!');
        });
    }
    
    // Animație la scroll pentru elemente
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.gallery-card, .feature-content, .tour-container, .testimonial');
        
        elements.forEach(element => {
            if (element) {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight;
                
                if (elementPosition < screenPosition - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            }
        });
    };
    
    // Adaugă clasa pentru animație inițială
    const elementsToAnimate = document.querySelectorAll('.gallery-card, .feature-content, .tour-container, .testimonial');
    elementsToAnimate.forEach(element => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });
    
    // Eveniment pentru animație la scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Rulează animația la încărcarea paginii
    window.addEventListener('load', animateOnScroll);
    
    // Adaugă funcționalitate pentru butonul "Vezi detalii"
    const featureBtn = document.querySelector('.feature-btn');
    if (featureBtn) {
        featureBtn.addEventListener('click', () => {
            alert('Detaliile complete ale proiectului vor fi disponibile în curând!');
        });
    }
});