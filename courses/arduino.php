<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Curs Arduino | Învață Robotică și Electronică</title>
    
    <!-- Meta Tags -->
    <meta name="description" content="Descoperă lumea Arduino prin cursurile noastre practice de robotică și electronică. Pentru copii și tineri între 12-18 ani.">
    <meta name="keywords" content="arduino, curs, robotică, electronică, programare, copii">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/arduino.css">

</head>
<body>
    <!-- Navigation -->
    <!-- <nav class="navbar">
        <div class="nav-content">
            <a href="../index.html" class="logo">
                <img src="../assets/images/logo-techminds-sigla.png" alt="TMA Logo">
            </a>  
            <button class="menu-button">☰</button>
            <ul class="nav-links">
                <li><a href="../index.html">Acasă</a></li>
                <li class="dropdown">
                    <a href="../index.html">Programare</a>
                    <div class="dropdown-content">
                        <a href="scratch.html">Scratch</a>
                        <a href="thunkable.html">Thunkable</a>
                        <a href="gdevelop.html">GDevelop</a>
                        <a href="minecraft.html">Minecraft</a>
                        <a href="roblox.html">Roblox</a>
                        <a href="godot.html">Godot</a>
                        <a href="greenfoot.html">Greenfoot</a>
                        <a href="python.html">Python</a>
                        <a href="frontend.html">Frontend</a>
                    </div>
                </li>
                <li class="dropdown">
                    <a href="../robotics.html">Robotică</a>
                    <div class="dropdown-content">
                        <a href="essentials.html">LEGO Essentials</a>
                        <a href="prime.html">LEGO Prime</a>
                        <a href="microbit.html">micro:bit</a>
                        <a href="arduino.html">Arduino</a>
                    </div>
                <li><a href="../about.html">Despre noi</a></li>
                <li><a href="../contact.html">Contact</a></li>
            </ul>
        </div>
    </nav> -->

    <?php include 'header.php'; ?>

    <!-- Main Content -->
    <main>
        <!-- Hero Section -->
        <section class="hero">
            <div class="circuit-background">
                <div class="circuit-grid">
                    <!-- Circuit paths vor fi generate via JS -->
                </div>
                <div class="led-grid">
                    <!-- LED-urile vor fi generate via JS -->
                </div>
            </div>
            
            <div class="hero-content container">
                <div class="hero-text">
                    <div class="code-editor-header">
                        <span class="dot red"></span>
                        <span class="dot yellow"></span>
                        <span class="dot green"></span>
                        <span class="file-name">arduino_course.ino</span>
                    </div>
                    <div class="code-editor">
                        <pre><code class="typing-text">void setup() {
    Serial.begin(9600);
    pinMode(13, OUTPUT);
    Serial.println("Bun venit la cursul de Arduino!");
}</code></pre>
                    </div>
                    <h1 class="glitch" data-text="Descoperă Arduino">Descoperă Arduino</h1>
                    <p class="hero-subtitle">Transformă-ți ideile în realitate prin electronică și programare</p>
                    
                    <div class="hero-stats">
                        <div class="stat-item">
                            <div class="stat-value"><span class="counter">16</span>+</div>
                            <div class="stat-label">Proiecte Practice</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value"><span class="counter">32</span>h</div>
                            <div class="stat-label">Ore de Curs</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value"><span class="counter">100</span>%</div>
                            <div class="stat-label">Hands-on</div>
                        </div>
                    </div>

                    <div class="hero-cta">
                        <button class="btn-primary">
                            <span class="btn-text">Începe Aventura</span>
                            <span class="btn-circuit"></span>
                        </button>
                        <button class="btn-secondary">
                            <i class="fas fa-code"></i>
                            <span>Vezi Proiecte</span>
                        </button>
                    </div>
                </div>

                <div class="hero-visual">
                    <div class="arduino-board">
                        <div class="board-base"></div>
                        <div class="components">
                            <!-- Microcontroller -->
                            <div class="component" data-name="microcontroller">
                                <div class="chip"></div>
                                <div class="pins"></div>
                            </div>
                
                            <!-- USB Port -->
                            <div class="component" data-name="usb">
                                <div class="port"></div>
                            </div>
                
                            <!-- LED-uri de stare -->
                            <div class="component" data-name="leds">
                                <div class="led power"></div>
                                <div class="led tx"></div>
                                <div class="led rx"></div>
                            </div>
                
                            <!-- Pin Headers -->
                            <div class="component" data-name="pin-headers">
                                <div class="header digital"></div>
                                <div class="header analog"></div>
                                <div class="header power"></div>
                                <div class="header ground"></div>
                            </div>
                
                            <!-- Alimentare și Regulatoare -->
                            <div class="component" data-name="power-supply">
                                <div class="power-jack"></div>
                                <div class="voltage-regulator"></div>
                            </div>
                
                            <!-- Oscilator de Cristal -->
                            <div class="component" data-name="crystal-oscillator">
                                <div class="oscillator"></div>
                            </div>
                
                            <!-- Reset Button -->
                            <div class="component" data-name="reset-button">
                                <div class="reset"></div>
                            </div>
                
                        </div>
                
                        <!-- Info Box la hover -->
                        <div class="hover-info">
                            <span id="component-info">Mută cursorul peste componente pentru detalii</span>
                        </div>
                    </div>
                </div>
                

            <div class="scroll-indicator">
                <div class="mouse">
                    <div class="wheel"></div>
                </div>
                <div class="arrows">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </section>

        <!-- Course Features -->
        <section class="features" id="about">
            <div class="container">
                <h2>De ce să înveți Arduino?</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-microchip"></i>
                        </div>
                        <h3>Hardware</h3>
                        <p>Învață să lucrezi cu senzori, motoare și alte componente electronice</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-code"></i>
                        </div>
                        <h3>Software</h3>
                        <p>Programează în C++ și creează aplicații pentru proiectele tale</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-robot"></i>
                        </div>
                        <h3>Robotică</h3>
                        <p>Construiește roboți și sisteme automate interactive</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Course Structure -->
        <section class="course-structure">
            <div class="container">
                <h2>Structura Cursului</h2>
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-content">
                            <span class="timeline-tag">Modulul 1</span>
                            <h3>Introducere în Arduino</h3>
                            <ul>
                                <li>Primul tău circuit</li>
                                <li>Componente de bază</li>
                                <li>Mediul de programare</li>
                            </ul>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-content">
                            <span class="timeline-tag">Modulul 2</span>
                            <h3>Senzori și Actuatori</h3>
                            <ul>
                                <li>Citirea senzorilor</li>
                                <li>Control motoare</li>
                                <li>Proiecte interactive</li>
                            </ul>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-content">
                            <span class="timeline-tag">Modulul 3</span>
                            <h3>Proiecte Avansate</h3>
                            <ul>
                                <li>Roboți autonomi</li>
                                <li>Sisteme de control</li>
                                <li>IoT cu Arduino</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Projects Showcase -->
        <section class="projects">
            <div class="container">
                <h2>Proiecte Realizate de Cursanți</h2>
                <div class="projects-grid">
                    <div class="project-card">
                        <div class="project-image">
                            <img src="path/to/project1.jpg" alt="Robot Urmăritor">
                        </div>
                        <div class="project-info">
                            <h3>Robot Urmăritor</h3>
                            <p>Robot autonom care urmărește linii și evită obstacole</p>
                        </div>
                    </div>
                    <div class="project-card">
                        <div class="project-image">
                            <img src="path/to/project2.jpg" alt="Smart Garden">
                        </div>
                        <div class="project-info">
                            <h3>Smart Garden</h3>
                            <p>Sistem automat de irigație și monitorizare plante</p>
                        </div>
                    </div>
                    <div class="project-card">
                        <div class="project-image">
                            <img src="path/to/project3.jpg" alt="Stație Meteo">
                        </div>
                        <div class="project-info">
                            <h3>Stație Meteo</h3>
                            <p>Monitorizare temperatură, umiditate și presiune atmosferică</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="cta">
            <div class="container">
                <h2>Pregătit să începi?</h2>
                <p>Alătură-te comunității noastre de tineri pasionați de tehnologie</p>
                <a href="#inscriere" class="btn-primary">Înscrie-te la curs</a>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>Contact</h3>
                <ul>
                    <li>Email: contact@tma.ro</li>
                    <li>Telefon: 0700 000 000</li>
                    <li>Adresă: Strada Exemplu, Nr. 123</li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Cursuri robotică</h3>
                <ul>
                    <li><a href="/courses/spike-essentials.html">SPIKE Essentials</a></li>
                    <li><a href="/courses/spike-prime.html">SPIKE Prime</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Informații</h3>
                <ul>
                    <li><a href="/about.html">Despre noi</a></li>
                    <li><a href="/contact.html">Contact</a></li>
                    <li><a href="/terms.html">Termeni și condiții</a></li>
                    <li><a href="/privacy.html">Confidențialitate</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 TMA Robotică. Toate drepturile rezervate.</p>
        </div>
    </footer> -->

    <!-- Footer

    <script src="../js/arduino.js"></script>
    <script src="../js/header-footer.js"></script>
</body>
</html>