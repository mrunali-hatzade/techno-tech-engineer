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

    // tsParticles code removed as the hero section now uses a video background.



    // --- Cinematic Hero Experience ---
    const cinematicTitle = document.querySelector('.cinematic-title');
    const cinematicTagline = document.querySelector('.cinematic-tagline');
    setTimeout(() => {
        if (cinematicTitle) cinematicTitle.classList.add('animate-in');
        if (cinematicTagline) cinematicTagline.classList.add('animate-in');
    }, 500);

    // --- Hero Video Play/Pause Toggle ---
    const video = document.getElementById('hero-video');
    const videoBtn = document.getElementById('video-toggle-btn');
    const playPauseIcon = document.getElementById('play-pause-icon');

    if (video && videoBtn && playPauseIcon) {
        videoBtn.addEventListener('click', () => {
            if (video.muted) {
                // If it was autoplaying silently (muted), unmute it and keep it playing
                video.muted = false;
                // Ensure icon remains pause (two bars) since video is still playing
                playPauseIcon.innerHTML = `
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                `;
                videoBtn.style.borderColor = 'var(--primary-color)';
                videoBtn.style.boxShadow = '0 0 20px rgba(15, 98, 254, 0.4)';
                if (window.showToast) {
                    showToast("Video audio unmuted!");
                }
            } else if (video.paused) {
                video.play();
                // Change icon to Pause (two bars)
                playPauseIcon.innerHTML = `
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                `;
                videoBtn.style.borderColor = 'var(--primary-color)';
                videoBtn.style.boxShadow = '0 0 20px rgba(15, 98, 254, 0.4)';
            } else {
                video.pause();
                // Change icon to Play (triangle)
                playPauseIcon.innerHTML = `
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                `;
                videoBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                videoBtn.style.boxShadow = 'var(--shadow-soft)';
            }
        });
    }

    // ==========================================================================
    // 1. Stats Counter Animation
    // ==========================================================================
    const statsSection = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const duration = 2000; // 2 seconds
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;
            
            const timer = setInterval(() => {
                current += 1;
                stat.textContent = current;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, Math.max(stepTime, 15));
        });
    };

    if (statsSection && statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animatedStats) {
                    animateStats();
                    animatedStats = true;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        statsObserver.observe(statsSection);
    }

    // ==========================================================================
    // 2. Capacity Estimator Widget Logic
    // ==========================================================================
    const plantTypeSelect = document.getElementById('plant-type');
    const plantCapacityRange = document.getElementById('plant-capacity');
    const capacityValueSpan = document.getElementById('capacity-value');
    const materialRadios = document.getElementsByName('material-grade');

    const resFootprint = document.getElementById('res-footprint');
    const resPower = document.getElementById('res-power');
    const resDuration = document.getElementById('res-duration');
    const resWeight = document.getElementById('res-weight');
    const inquiryBtn = document.getElementById('estimator-inquiry-btn');

    const updateEstimates = () => {
        if (!plantTypeSelect || !plantCapacityRange) return;

        const type = plantTypeSelect.value;
        const capacity = parseInt(plantCapacityRange.value, 10);
        capacityValueSpan.textContent = `${capacity} TPD`;

        let selectedMaterial = 'ss304';
        for (const radio of materialRadios) {
            if (radio.checked) {
                selectedMaterial = radio.value;
                break;
            }
        }

        // Multipliers based on type
        let footprintMult = 50;
        let powerMult = 0.9;
        let durationBase = 30;
        let durationMult = 0.2;
        let weightMult = 0.25;

        if (type === 'food') {
            footprintMult = 40;
            powerMult = 1.2;
            durationBase = 45;
            durationMult = 0.25;
            weightMult = 0.2;
        } else if (type === 'chemical') {
            footprintMult = 60;
            powerMult = 1.5;
            durationBase = 60;
            durationMult = 0.3;
            weightMult = 0.35;
        }

        // Material grade scale
        let materialScale = 1.0;
        if (selectedMaterial === 'ss316') {
            materialScale = 1.1; // +10% engineering complexity
        } else if (selectedMaterial === 'carbon') {
            materialScale = 0.9; // -10% complexity
        }

        // Calculations
        const footprint = Math.round(capacity * footprintMult * materialScale);
        const power = Math.round(capacity * powerMult);
        const durationMin = Math.round(durationBase + (capacity * durationMult * materialScale));
        const durationMax = durationMin + 15;
        const weight = (capacity * weightMult * materialScale).toFixed(1);

        // Render values
        if (resFootprint) resFootprint.textContent = `${footprint.toLocaleString()} sq. ft`;
        if (resPower) resPower.textContent = `${power} HP`;
        if (resDuration) resDuration.textContent = `${durationMin} - ${durationMax} Days`;
        if (resWeight) resWeight.textContent = `${weight} Tons`;
    };

    if (plantTypeSelect && plantCapacityRange) {
        plantTypeSelect.addEventListener('change', updateEstimates);
        plantCapacityRange.addEventListener('input', updateEstimates);
        materialRadios.forEach(radio => {
            radio.addEventListener('change', updateEstimates);
        });

        // Initialize estimates
        updateEstimates();
    }

    // Connect Estimator Inquiry to Contact Form
    if (inquiryBtn) {
        inquiryBtn.addEventListener('click', () => {
            const typeText = plantTypeSelect.options[plantTypeSelect.selectedIndex].text;
            const capacity = plantCapacityRange.value;
            
            let matText = 'SS304';
            for (const radio of materialRadios) {
                if (radio.checked) {
                    matText = radio.nextElementSibling.textContent.trim();
                    break;
                }
            }

            const subjectInput = document.querySelector('.contact-form input[placeholder="Subject"]');
            const messageTextarea = document.querySelector('.contact-form textarea[placeholder="Message"]');
            const nameInput = document.querySelector('.contact-form input[placeholder="Your Name"]');
            const contactSection = document.getElementById('contact');

            if (subjectInput && messageTextarea && contactSection) {
                subjectInput.value = `Inquiry: Custom ${typeText} - ${capacity} TPD`;
                messageTextarea.value = `Hello TechnoTech Team,\n\nI am interested in requesting a detailed proposal and engineering quote for a ${typeText}.\n\nMy configuration:\n- Capacity: ${capacity} TPD\n- Material Standard: ${matText}\n\nEstimated footprint: ${resFootprint.textContent}\nEstimated duration: ${resDuration.textContent}\n\nPlease contact me to discuss.`;
                
                // Smooth scroll to contact
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Focus on Name input after scroll finishes
                setTimeout(() => {
                    if (nameInput) nameInput.focus();
                }, 800);

                showToast("Configuration copied to Contact Form below!");
            }
        });
    }

    // ==========================================================================
    // 3. Filterable Portfolio & Lightbox Modal
    // ==========================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryImgs = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let visibleImages = [];
    let currentImgIndex = 0;

    // Build lists of visible images
    const updateVisibleImages = () => {
        visibleImages = Array.from(galleryImgs).filter(img => !img.classList.contains('filtered-out'));
    };
    updateVisibleImages();

    // Portfolio Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryImgs.forEach(img => {
                const category = img.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    img.classList.remove('filtered-out');
                    img.style.opacity = '0';
                    setTimeout(() => {
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    img.classList.add('filtered-out');
                }
            });

            setTimeout(updateVisibleImages, 200);
        });
    });

    // Lightbox modal functionality
    const showImageInLightbox = (index) => {
        if (index < 0 || index >= visibleImages.length) return;
        currentImgIndex = index;
        const img = visibleImages[index];

        lightboxImg.src = img.src;
        lightboxTitle.textContent = img.getAttribute('data-title') || img.alt || 'Project Showcase';
        lightboxDesc.textContent = img.getAttribute('data-description') || 'Custom engineered high-quality industrial component.';
    };

    galleryImgs.forEach(img => {
        img.addEventListener('click', () => {
            const index = visibleImages.indexOf(img);
            if (index !== -1) {
                showImageInLightbox(index);
                lightbox.classList.add('active');
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content-wrapper')) {
                lightbox.classList.remove('active');
            }
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            let prevIndex = currentImgIndex - 1;
            if (prevIndex < 0) prevIndex = visibleImages.length - 1;
            showImageInLightbox(prevIndex);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            let nextIndex = currentImgIndex + 1;
            if (nextIndex >= visibleImages.length) nextIndex = 0;
            showImageInLightbox(nextIndex);
        });
    }

    // Keyboard navigation for Lightbox
    window.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        } else if (e.key === 'ArrowLeft') {
            if (lightboxPrev) lightboxPrev.click();
        } else if (e.key === 'ArrowRight') {
            if (lightboxNext) lightboxNext.click();
        }
    });

    // ==========================================================================
    // 4. FAQ Accordion logic
    // ==========================================================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentNode;
            const isActive = item.classList.contains('active');

            // Collapse all other FAQ items
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // 5. Toast Notification System
    // ==========================================================================
    window.showToast = (message) => {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;

        container.appendChild(toast);

        // Hide after 3.5 seconds
        setTimeout(() => {
            toast.classList.add('hide');
            // Remove from DOM after hide animation (0.3s)
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3500);
    };

    // ==========================================================================
    // 6. Feedback Form Submission & Dynamic Marquee Appending
    // ==========================================================================
    const feedbackForm = document.querySelectorAll('.contact-form')[1]; // Second contact form

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = feedbackForm.querySelector('input[placeholder="Your Name or Company"]');
            const ratingSelect = feedbackForm.querySelector('select');
            const messageTextarea = feedbackForm.querySelector('textarea');

            if (!nameInput || !ratingSelect || !messageTextarea) return;

            const name = nameInput.value.trim();
            const rating = ratingSelect.value;
            const text = messageTextarea.value.trim();

            if (!name || !text) return;

            const marqueeContent = document.querySelector('.marquee-content');
            if (marqueeContent) {
                // Get all existing cards to determine mid-point and update list
                const cards = Array.from(marqueeContent.children);
                const mid = cards.length / 2;

                // Create new review element
                const createCard = (reviewerName, reviewText) => {
                    const card = document.createElement('div');
                    card.className = 'review-card glass-panel';
                    card.style.borderLeft = '3px solid var(--primary-color)';
                    card.innerHTML = `
                        <p>"${reviewText}"</p>
                        <h4>- ${reviewerName}</h4>
                    `;
                    return card;
                };

                const newCard1 = createCard(name, text);
                const newCard2 = newCard1.cloneNode(true);

                // Insert new card at index 0 and mid-point clone
                marqueeContent.insertBefore(newCard1, cards[0]);
                marqueeContent.insertBefore(newCard2, cards[mid]);

                // Recalculate width for scrolling marquee
                const totalCards = marqueeContent.children.length;
                marqueeContent.style.width = `calc(350px * ${totalCards} + 30px * ${totalCards})`;

                // Apply dynamic keyframes for seamless looping
                const halfVal = totalCards / 2;
                let sheet = document.getElementById('marquee-animation-style');
                if (!sheet) {
                    sheet = document.createElement('style');
                    sheet.id = 'marquee-animation-style';
                    document.head.appendChild(sheet);
                }
                sheet.innerHTML = `
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-350px * ${halfVal} - 30px * ${halfVal})); }
                    }
                `;

                // Reset animation to enforce the recalculated keyframe translation immediately
                marqueeContent.style.animation = 'none';
                marqueeContent.offsetHeight; // trigger reflow
                marqueeContent.style.animation = 'marquee 22s linear infinite';
            }

            // Clear inputs
            nameInput.value = '';
            ratingSelect.selectedIndex = 0;
            messageTextarea.value = '';

            showToast("Thank you for your feedback! Prepending to reviews...");
        });
    }

    // Connect Get In Touch form to Toast notification
    const contactForm = document.querySelectorAll('.contact-form')[0];
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get inputs
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.value = '';
            });

            showToast("Inquiry submitted! We will contact you shortly.");
        });
    }

    // Connect Career Form to Toast notification
    const careerForm = document.querySelector('.career-form');
    if (careerForm) {
        careerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputs = careerForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (input.tagName === 'SELECT') {
                    input.selectedIndex = 0;
                } else {
                    input.value = '';
                }
            });

            showToast("Application submitted successfully!");
        });
    }

});
