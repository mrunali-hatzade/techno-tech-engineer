document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for anchor links
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

    // Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // Initialize tsParticles for Hero background only if container exists
    if (document.getElementById('tsparticles')) {
        tsParticles.load("tsparticles", {
            preset: "stars",
            background: {
                color: "transparent"
            },
            particles: {
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#ffffff", "#ff6b35", "#ffb235"]
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5,
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
                links: {
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
                    outModes: "out",
                    bounce: false
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab"
                    },
                    onClick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        links: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        quantity: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // --- Cinematic Hero Experience ---
    const playBtn = document.getElementById('play-welcome-btn');
    const cinematicTitle = document.querySelector('.cinematic-title');
    const cinematicTagline = document.querySelector('.cinematic-tagline');
    
    // 1. Auto-play text animations on page load (no click required)
    setTimeout(() => {
        if (cinematicTitle) cinematicTitle.classList.add('animate-in');
        if (cinematicTagline) cinematicTagline.classList.add('animate-in');
    }, 500);

    // 2. Optional Audio Welcome (Female Voice)
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            // Hide the button after playing
            playBtn.style.opacity = '0';
            playBtn.style.pointerEvents = 'none';
            setTimeout(() => playBtn.style.display = 'none', 500);

            if ('speechSynthesis' in window) {
                const msg = new SpeechSynthesisUtterance();
                msg.text = "Welcome to Technotech Engineers.";
                msg.lang = "en-US";
                
                // Force a female voice (Microsoft Zira, Google Female, Samantha, etc.)
                const voices = window.speechSynthesis.getVoices();
                const femaleVoice = voices.find(v => 
                    v.name.includes('Zira') || 
                    v.name.includes('Samantha') || 
                    v.name.includes('Victoria') || 
                    v.name.includes('Female') ||
                    v.name.includes('Google UK English Female') ||
                    v.name.includes('Google US English')
                );
                
                if (femaleVoice) {
                    msg.voice = femaleVoice;
                }
                msg.rate = 0.9;
                msg.pitch = 1.2; // Slightly higher pitch for female voice
                window.speechSynthesis.speak(msg);
            }
        });
    }

});
