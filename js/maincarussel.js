document.addEventListener('DOMContentLoaded', function() {
    // Selecționăm elementele necesare
    const carousel = document.getElementById('mainCarousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let autoplayInterval;
    const autoplayDelay = 5000;
    const totalItems = items.length;
    
    // Funcție pentru a determina câte elemente sunt vizibile
    function getItemsPerView() {
        if (window.innerWidth > 992) {
            return 3; // Desktop - 3 imagini
        } else if (window.innerWidth > 768) {
            return 2; // Tabletă - 2 imagini
        } else {
            return 1; // Mobil - 1 imagine
        }
    }
    
    // Calculăm lățimea elementului în funcție de câte elemente sunt vizibile
    function calculateItemWidth() {
        const itemsPerView = getItemsPerView();
        return 100 / itemsPerView;
    }

    function generateIndicators() {
        const items = document.querySelectorAll('#mainCarousel .carousel-item');
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        
        // Golim containerul de indicatori
        indicatorsContainer.innerHTML = '';
        
        // Creăm dinamic indicatorii pentru fiecare imagine
        items.forEach((item, index) => {
            const indicator = document.createElement('span');
            indicator.classList.add('indicator');
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
            indicator.setAttribute('data-index', index);
            
            // Adăugăm event listener pentru click
            indicator.addEventListener('click', function(e) {
                e.preventDefault();
                goToSlide(index);
                resetAutoplay();
            });
            
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    
    // Funcția pentru a actualiza caruselul și a centraliza imaginea activă
    function goToSlide(index) {
        // Verificăm limitele
        if (index < 0) {
            index = totalItems - 1;
        } else if (index >= totalItems) {
            index = 0;
        }
        
        // Actualizăm indexul curent
        currentIndex = index;
        
        // Pentru desktop (3 imagini vizibile), centrăm imaginea activă
        const itemsPerView = getItemsPerView();
        let offset;
        
        if (itemsPerView === 3) {
            // Trebuie să centrăm imaginea activă
            // Scădem 1 pentru a ține cont de faptul că vrem ca imaginea curentă să fie cea din mijloc
            offset = (currentIndex - 1) * (-calculateItemWidth());
            
            // Gestionăm cazurile speciale de început și sfârșit
            if (currentIndex === 0) {
                offset = 0; // Prima imagine - nu putem centra, afișăm primele 3
            } else if (currentIndex === totalItems - 1) {
                offset = (totalItems - 3) * (-calculateItemWidth()); // Ultima imagine - afișăm ultimele 3
            }
        } else {
            // Pentru mobil și tabletă, calculăm normal
            offset = currentIndex * (-calculateItemWidth());
        }
        
        // Aplicăm transformarea
        carousel.style.transform = `translateX(${offset}%)`;
        
        // Actualizăm clasele active pentru toate elementele
        items.forEach((item, i) => {
            item.classList.remove('active');
        });
        
        // Setăm clasa active pentru elementul curent
        if (items[currentIndex]) {
            items[currentIndex].classList.add('active');
        }
        
        // Actualizăm indicatorii
        updateIndicators();
    }
    
    // Actualizare indicatori
    function updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
    }

    generateIndicators();
    
    // Actualizăm stilurile la inițializare și redimensionare
    function updateCarouselStyles() {
        const itemWidth = calculateItemWidth();
        
        // Setăm lățimea fiecărui element în funcție de câte elemente sunt vizibile
        items.forEach(item => {
            item.style.minWidth = `${itemWidth}%`;
        });
        
        // Repoziționăm caruselul pentru a respecta noile dimensiuni
        goToSlide(currentIndex);
    }
    
    // Event listener pentru redimensionarea ferestrei
    window.addEventListener('resize', updateCarouselStyles);
    
    // Event listener pentru butonul "anterior"
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        goToSlide(currentIndex - 1);
        resetAutoplay();
    });
    
    // Event listener pentru butonul "următor"
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        goToSlide(currentIndex + 1);
        resetAutoplay();
    });
    
    // Event listener pentru indicatori
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            goToSlide(index);
            resetAutoplay();
        });
    });
    
    // Funcționalitate swipe pentru dispozitive mobile
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetAutoplay();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            goToSlide(currentIndex + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            goToSlide(currentIndex - 1);
        }
    }
    
    // Funcție pentru autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(function() {
            goToSlide(currentIndex + 1);
        }, autoplayDelay);
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Gestiune vizibilitate pagină
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(autoplayInterval);
        } else {
            startAutoplay();
        }
    });
    
    // Hover handling
    carousel.addEventListener('mouseenter', function() {
        clearInterval(autoplayInterval);
    });
    
    carousel.addEventListener('mouseleave', function() {
        startAutoplay();
    });
    
    // Inițializare
    updateCarouselStyles();
    goToSlide(1); // Începem cu a doua imagine pentru a demonstra centrarea
    startAutoplay();
});