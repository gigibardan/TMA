document.addEventListener('DOMContentLoaded', () => {
    initCircuitBackground();
    initTypewriter();
    initArduinoBoard();
    initCounters();
});

// Generare LED-uri pentru background
function initCircuitBackground() {
    const ledGrid = document.querySelector('.led-grid');
    const numberOfLeds = 30;

    for (let i = 0; i < numberOfLeds; i++) {
        const led = document.createElement('div');
        led.className = 'led';
        led.style.left = `${Math.random() * 100}%`;
        led.style.top = `${Math.random() * 100}%`;
        led.style.animationDelay = `${Math.random() * 2}s`;
        ledGrid.appendChild(led);
    }
}

// Efect de typing pentru codul din editor
function initTypewriter() {
    const codeElement = document.querySelector('.typing-text');
    const text = codeElement.textContent;
    codeElement.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            codeElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }

    type();
}

// Interactivitate pentru placa Arduino
function initArduinoBoard() {
    const components = document.querySelectorAll('.component');
    const hoverInfo = document.querySelector('.hover-info');

    const componentInfo = {
        microcontroller: {
            title: 'ATmega328P',
            description: 'Creierul plăcii Arduino, procesează toate instrucțiunile',
            specs: ['16MHz', '32KB Flash', '2KB RAM']
        },
        usb: {
            title: 'Port USB',
            description: 'Folosit pentru programare și alimentare',
            specs: ['Type-B', '5V DC', 'Serial Communication']
        },
        leds: {
            title: 'LED-uri de stare',
            description: 'Indică starea plăcii și comunicația',
            specs: ['Power LED', 'TX/RX LEDs', 'Pin 13 LED']
        }
    };

    components.forEach(component => {
        component.addEventListener('mouseenter', (e) => {
            const type = component.dataset.name;
            const info = componentInfo[type];

            hoverInfo.innerHTML = `
                <h4>${info.title}</h4>
                <p>${info.description}</p>
                <ul>
                    ${info.specs.map(spec => `<li>${spec}</li>`).join('')}
                </ul>
            `;

            hoverInfo.style.top = `${e.pageY + 15}px`;
            hoverInfo.style.left = `${e.pageX + 15}px`;
            hoverInfo.style.opacity = '1';
            hoverInfo.style.visibility = 'visible';
        });

        component.addEventListener('mouseleave', () => {
            hoverInfo.style.opacity = '0';
            hoverInfo.style.visibility = 'hidden';
        });
    });
}

// Animație pentru statistici
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        counter.textContent = '0';
        
        const updateCounter = () => {
            const current = parseInt(counter.textContent);
            const increment = target / 30; // Viteza de incrementare
            
            if (current < target) {
                counter.textContent = Math.ceil(current + increment);
                setTimeout(updateCounter, 50);
            } else {
                counter.textContent = target;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });

        observer.observe(counter);
    });
}

// Paralax effect pentru placa Arduino
document.addEventListener('mousemove', (e) => {
    const board = document.querySelector('.arduino-board');
    const rect = board.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const moveX = (e.clientX - centerX) / 30;
    const moveY = (e.clientY - centerY) / 30;
    
    board.style.transform = `
        perspective(1000px) 
        rotateY(${moveX}deg) 
        rotateX(${-moveY}deg)
    `;
});

// Circuit Path Animation
function createCircuitPaths() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "circuit-paths");
    
    const paths = [
        "M10,50 L90,50",
        "M50,10 L50,90",
        "M10,10 L90,90",
        "M10,90 L90,10"
    ];
    
    paths.forEach(d => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        path.setAttribute("class", "circuit-line");
        svg.appendChild(path);
    });
    
    document.querySelector('.circuit-grid').appendChild(svg);
}

// Smooth scroll pentru butoane
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animație pentru butoane
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });
});

// Efect de glitch pentru text
function createGlitchEffect(element) {
    const text = element.textContent;
    let iterations = 0;
    
    const interval = setInterval(() => {
        element.textContent = text
            .split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return text[index];
                }
                return String.fromCharCode(65 + Math.floor(Math.random() * 26));
            })
            .join("");
        
        if (iterations >= text.length) {
            clearInterval(interval);
        }
        
        iterations += 1/3;
    }, 30);
}

// Circuit board animation
function initCircuitBoard() {
    const circuitLines = document.querySelectorAll('.circuit-line');
    let currentLine = 0;

    function animateNextLine() {
        if (currentLine < circuitLines.length) {
            circuitLines[currentLine].classList.add('active');
            setTimeout(() => {
                animateNextLine();
            }, 300);
            currentLine++;
        } else {
            currentLine = 0;
            circuitLines.forEach(line => line.classList.remove('active'));
            setTimeout(animateNextLine, 1000);
        }
    }

    animateNextLine();
}

// Inițializare componente interactive
function initInteractiveComponents() {
    const components = document.querySelectorAll('.component');
    
    components.forEach(component => {
        component.addEventListener('click', () => {
            // Elimină clasa activă de pe toate componentele
            components.forEach(c => c.classList.remove('active'));
            // Adaugă clasa activă pe componenta clickuită
            component.classList.add('active');
            
            // Arată informații despre componentă
            showComponentInfo(component.dataset.name);
        });
    });
}

// Arată informații despre componente
function showComponentInfo(componentName) {
    const infoPanel = document.querySelector('.component-info');
    const componentData = {
        microcontroller: {
            title: 'ATmega328P Microcontroller',
            description: 'Creierul plăcii Arduino, acest microcontroller puternic poate executa mii de instrucțiuni pe secundă.',
            specs: [
                '16MHz frecvență',
                '32KB memorie program',
                '2KB RAM',
                '6 pini analogici',
                '14 pini digitali'
            ]
        },
        // Adaugă mai multe componente aici
    };
    
    const data = componentData[componentName];
    if (!data) return;
    
    infoPanel.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.description}</p>
        <ul>
            ${data.specs.map(spec => `<li>${spec}</li>`).join('')}
        </ul>
    `;
    
    infoPanel.style.opacity = '0';
    setTimeout(() => {
        infoPanel.style.opacity = '1';
    }, 50);
}

// Inițializare la încărcarea documentului
document.addEventListener('DOMContentLoaded', () => {
    createCircuitPaths();
    initCircuitBoard();
    initInteractiveComponents();
    
    // Inițializează efectul de glitch pentru titlu
    function createGlitchEffect(element) {
        const text = element.textContent;
        let iterations = 0;
        
        const interval = setInterval(() => {
            element.textContent = text
                .split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
                })
                .join("");
            
            if (iterations >= text.length) {
                clearInterval(interval);
            }
            
            // Am redus rata de actualizare de la 1/3 la 1/5
            iterations += 1/5;
        // Am crescut intervalul de la 30ms la 80ms pentru o animație mai lentă
        }, 80);
    }
});