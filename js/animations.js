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

//animatie piesa lego
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const legoPiece = document.querySelector('.lego-piece-3d');
    
    // Limitele de rotație
    const maxRotation = 50;
    
    hero.addEventListener('mousemove', (e) => {
        if (!legoPiece) return;
        
        // Calculăm poziția relativă a mouse-ului în hero section
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Convertim poziția în procente (-1 la 1)
        const xPercent = (x / rect.width - 0.5) * 2;
        const yPercent = (y / rect.height - 0.5) * 2;
        
        // Calculăm rotația
        const rotateY = xPercent * maxRotation;
        const rotateX = -yPercent * maxRotation;
        
        // Aplicăm transformarea
        legoPiece.style.transform = `
            translateY(-50%)
            rotateY(${rotateY}deg)
            rotateX(${rotateX}deg)
        `;
    });
    
    // Reset la poziția inițială când mouse-ul părăsește secțiunea
    hero.addEventListener('mouseleave', () => {
        if (!legoPiece) return;
        
        legoPiece.style.transform = `
            translateY(-50%)
            rotateY(0deg)
            rotateX(0deg)
        `;
    });
});
// Animație pentru piesele LEGO plutitoare
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const floatingPieces = document.querySelectorAll('.floating-lego');
    
    // Adăugăm efectul de plutire 3D la mișcarea mouse-ului
    hero.addEventListener('mousemove', (e) => {
        if (!floatingPieces.length) return;
        
        // Calculăm poziția relativă a mouse-ului în hero section
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Convertim poziția în procente (-1 la 1)
        const xPercent = (x / rect.width - 0.5) * 2;
        const yPercent = (y / rect.height - 0.5) * 2;
        
        // Aplicăm rotație ușoară pentru fiecare piesă
        floatingPieces.forEach((piece, index) => {
            // Rotație diferită pentru fiecare piesă pentru efect diversificat
            const rotateY = xPercent * 15 * (1 + index * 0.2);
            const rotateX = -yPercent * 15 * (1 + index * 0.1);
            const translateZ = 30 + index * 5;
            
            // Aplicăm transformarea cu întârziere pentru efect în cascadă
            setTimeout(() => {
                piece.style.transform = piece.style.transform.replace(/rotateX\([^)]*\) rotateY\([^)]*\)/, '') +
                    ` rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            }, index * 50);
        });
    });
    
    // Resetăm rotația când mouse-ul părăsește secțiunea
    hero.addEventListener('mouseleave', () => {
        if (!floatingPieces.length) return;
        
        floatingPieces.forEach((piece, index) => {
            setTimeout(() => {
                piece.style.transform = piece.style.transform.replace(/rotateX\([^)]*\) rotateY\([^)]*\)/, '') +
                    ' rotateY(0deg) rotateX(0deg)';
            }, index * 50);
        });
    });
    
    // Generăm mai multe piese LEGO aleatoriu pentru un efect mai bogat
    function createRandomLegoPieces() {
        const floatingContainer = document.querySelector('.floating-lego-pieces');
        if (!floatingContainer) return;
        
        const legoTypes = ['lego-2x4', 'lego-2x2', 'lego-1x2'];
        const legoColors = ['lego-red', 'lego-blue', 'lego-yellow', 'lego-green', 'lego-white'];
        const floatStyles = ['', 'float-left', 'float-right'];
        
        // Adăugăm 5 piese suplimentare aleatoriu poziționate
        for (let i = 0; i < 5; i++) {
            // Selectăm aleatoriu tipul și culoarea
            const type = legoTypes[Math.floor(Math.random() * legoTypes.length)];
            const color = legoColors[Math.floor(Math.random() * legoColors.length)];
            const floatStyle = floatStyles[Math.floor(Math.random() * floatStyles.length)];
            
            // Creăm piesa LEGO
            const lego = document.createElement('div');
            lego.className = `floating-lego ${type} ${color} float-delay-${i+5} ${floatStyle}`;
            
            // Adăugăm întârziere aleatorie
            lego.style.animationDelay = `-${Math.random() * 20}s`;
            
            // Adăugăm studurile
            const studsContainer = document.createElement('div');
            studsContainer.className = 'floating-lego-studs';
            
            // Determinăm numărul de studuri în funcție de tip
            let studCount = 8; // default pentru 2x4
            if (type === 'lego-2x2') studCount = 4;
            if (type === 'lego-1x2') studCount = 2;
            
            // Adăugăm studurile
            for (let j = 0; j < studCount; j++) {
                const stud = document.createElement('div');
                stud.className = 'floating-stud';
                studsContainer.appendChild(stud);
            }
            
            lego.appendChild(studsContainer);
            floatingContainer.appendChild(lego);
        }
    }
    
    // Apelăm funcția pentru a genera piesele aleatorii
    createRandomLegoPieces();
});