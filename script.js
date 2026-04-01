// ==========================================
// JAITI FOUNDATION - JAVASCRIPT (MOBILE OPTIMIZED)
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        document.addEventListener('click', function (e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
        
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
    
    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    

    // ========== FLOATING BUTTONS — SCROLL BEHAVIOR ==========
    // WA: shrinks after scroll 120px
    // Instagram (right, below WA): appears after WA shrinks
    // YouTube (left, above back-to-top): appears with back-to-top (scroll > 500)
    const waBtn       = document.querySelector('.whatsapp-float');
    const instaBtn    = document.querySelector('.instagram-float');
    const ytFloatBtn  = document.querySelector('.youtube-float');

    if (waBtn) {
        let waScrolled = false;
        function updateFloatBtns() {
            const scrollY     = window.pageYOffset;
            const shouldShrink = scrollY > 120;

            // WA shrink
            if (shouldShrink !== waScrolled) {
                waScrolled = shouldShrink;
                waBtn.classList.toggle('wa-scrolled', waScrolled);
            }

            // Instagram: show when WA is shrunk
            if (instaBtn) {
                instaBtn.classList.toggle('float-visible', shouldShrink);
            }

            // YouTube float: show with back-to-top (scroll > 500)
            if (ytFloatBtn) {
                ytFloatBtn.classList.toggle('float-visible', scrollY > 500);
            }
        }

        window.addEventListener('scroll', updateFloatBtns, { passive: true });
        updateFloatBtns(); // run once on load
    }

    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
    
    // ========== IMPACT COUNTER ANIMATION ==========
    // FIX: Show final value immediately so "0" never flashes.
    // Animation plays once when element enters the viewport.

    const impactNumbers = document.querySelectorAll('.impact-number');

    if (impactNumbers.length > 0) {

        // Helper: read suffix (+, %) stored in data-suffix or detected from data-target text
        function getSuffix(el) {
            // data-suffix attribute takes priority
            if (el.dataset.suffix !== undefined) return el.dataset.suffix;
            // Otherwise detect from original HTML text
            const raw = el.getAttribute('data-target') || el.textContent;
            if (raw.includes('%')) return '%';
            if (raw.includes('+')) return '+';
            return '';
        }

        // Step 1 — Set final value IMMEDIATELY so page never shows "0"
        impactNumbers.forEach(function (el) {
            const target = parseInt(el.getAttribute('data-target'));
            const suffix = getSuffix(el);
            if (!isNaN(target)) {
                el.textContent = target + suffix;
            }
        });

        // Step 2 — Animate when scrolled into view (runs once per element)
        function animateCounter(element, target, suffix) {
            let current = 0;
            const duration = 1800;          // total ms
            const totalSteps = 60;
            const stepTime = duration / totalSteps;
            const increment = target / totalSteps;

            // Reset to 0 just before animation starts (already in view, so no flash)
            element.textContent = '0' + suffix;

            const timer = setInterval(function () {
                current += increment;
                if (current >= target) {
                    element.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + suffix;
                }
            }, stepTime);
        }

        const observerOptions = { threshold: 0.3, rootMargin: '0px' };

        const observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const el     = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    const suffix = getSuffix(el);
                    if (!isNaN(target)) {
                        animateCounter(el, target, suffix);
                    }
                    obs.unobserve(el);
                }
            });
        }, observerOptions);

        impactNumbers.forEach(function (el) {
            observer.observe(el);
        });
    }
    
    // ========== SCROLL REVEAL - CARDS ==========
    const revealElements = document.querySelectorAll(
        '.value-card, .benefit-card, .contribute-card, .step-card, .info-card, .gallery-item'
    );
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(element);
        });
    }

    // ========== SCROLL REVEAL - SECTIONS ==========
    const revealSections = document.querySelectorAll(
        '.section-header, .approach-text, .approach-image, .cta-content, ' +
        '.contact-info-wrapper, .contact-form-wrapper, ' +
        '.visitor-counter-box, .mvv-card, .difference-text, .difference-image, ' +
        '.program-detail-text, .program-detail-image, .requirements-text, .requirements-image, ' +
        '.story-text, .story-image, .volunteer-intro'
    );

    if (revealSections.length > 0) {
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

        revealSections.forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = (i % 3) * 0.1 + 's';
            sectionObserver.observe(el);
        });
    }

    // ========== BACK TO TOP BUTTON ==========
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"/>
        </svg>
    `;
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    function setBackToTopStyle(visible) {
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 1rem;
            left: 1rem;
            right: auto;
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: ${visible ? 'flex' : 'none'};
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(30, 64, 175, 0.3);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            z-index: 998;
        `;
        backToTopBtn.querySelector('svg').style.cssText = 'width: 22px; height: 22px;';
    }

    setBackToTopStyle(false);

    window.addEventListener('scroll', function () {
        setBackToTopStyle(window.pageYOffset > 500);
    });

    window.addEventListener('resize', debounce(function () {
        if (backToTopBtn.style.display !== 'none') {
            setBackToTopStyle(true);
        }
    }, 150));

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    backToTopBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 25px rgba(30, 64, 175, 0.4)';
    });

    backToTopBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 20px rgba(30, 64, 175, 0.3)';
    });
    
    // ========== VISITOR COUNTER ==========
    const visitorCountEl = document.getElementById('visitorCount');
    if (visitorCountEl) {
        const BASE_COUNT = 1000;
        let count = parseInt(localStorage.getItem('jaiti_visitor_count') || BASE_COUNT);
        count++;
        localStorage.setItem('jaiti_visitor_count', count);

        // Show final value immediately — no flash
        visitorCountEl.textContent = count.toLocaleString();
        
        let display = 0;
        const duration = 2000;
        const steps = 60;
        const increment = count / steps;
        const stepTime = duration / steps;
        
        const counterTimer = setInterval(function () {
            display += increment;
            if (display >= count) {
                visitorCountEl.textContent = count.toLocaleString();
                clearInterval(counterTimer);
            } else {
                visitorCountEl.textContent = Math.floor(display).toLocaleString();
            }
        }, stepTime);
    }

    // ========== HERO IMAGE SLIDER (AUTO-PLAY + DOTS) ==========
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots   = document.querySelectorAll('.hero-dot');

    if (heroSlides.length > 0 && heroDots.length > 0) {
        let currentSlide = 0;
        let heroTimer;
        const SLIDE_INTERVAL = 5000;

        function goToSlide(index) {
            heroSlides.forEach(slide => slide.classList.remove('active'));
            heroDots.forEach(dot   => dot.classList.remove('active'));
            currentSlide = (index + heroSlides.length) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
            heroDots[currentSlide].classList.add('active');
        }

        function nextSlide()   { goToSlide(currentSlide + 1); }
        function startHeroTimer() { heroTimer = setInterval(nextSlide, SLIDE_INTERVAL); }
        function resetTimer()  { clearInterval(heroTimer); startHeroTimer(); }

        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', function (e) {
                e.preventDefault();
                goToSlide(index);
                resetTimer();
            });
        });

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => clearInterval(heroTimer));
            heroSection.addEventListener('mouseleave', () => startHeroTimer());
        }

        startHeroTimer();
    }

    // ========== CAROUSEL SLIDER (MOBILE OPTIMIZED) ==========
    function initCarousel(trackId, dotsContainerId) {
        const track = document.getElementById(trackId);
        if (!track) return;

        const container    = track.closest('.carousel-container');
        const prevBtn      = container.querySelector('.carousel-prev');
        const nextBtn      = container.querySelector('.carousel-next');
        const dotsContainer = document.getElementById(dotsContainerId);
        const items        = Array.from(track.children);
        let current        = 0;
        let isTransitioning = false;

        items.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        function getVisibleCount() {
            return window.innerWidth <= 768 ? 1 : 3;
        }

        function updateDots() {
            dotsContainer.querySelectorAll('.carousel-dot')
                .forEach((d, i) => d.classList.toggle('active', i === current));
        }

        function updateButtons() {
            const max = items.length - getVisibleCount();
            prevBtn.style.opacity      = current <= 0   ? '0.4' : '1';
            nextBtn.style.opacity      = current >= max ? '0.4' : '1';
            prevBtn.style.pointerEvents = current <= 0   ? 'none' : 'auto';
            nextBtn.style.pointerEvents = current >= max ? 'none' : 'auto';
        }

        function goTo(index) {
            if (isTransitioning) return;
            isTransitioning = true;

            const max = items.length - getVisibleCount();
            current = Math.max(0, Math.min(index, max));

            const gap       = parseFloat(window.getComputedStyle(track).gap) || 32;
            const itemWidth = items[0].offsetWidth + gap;

            track.style.transition = 'transform 0.4s ease';
            track.style.transform  = `translateX(-${current * itemWidth}px)`;

            updateDots();
            updateButtons();
            setTimeout(() => { isTransitioning = false; }, 400);
        }

        prevBtn.addEventListener('click', () => goTo(current - 1));
        nextBtn.addEventListener('click', () => goTo(current + 1));

        let touchStartX = 0;
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        track.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
        }, { passive: true });

        window.addEventListener('resize', debounce(() => {
            current = Math.min(current, items.length - getVisibleCount());
            goTo(current);
        }, 250));

        updateButtons();
    }

    initCarousel('purposeTrack', 'purposeDots');
    initCarousel('workTrack',    'workDots');

    // ========== CONTACT FORM VALIDATION & SUBMISSION ==========
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {

        // --- Helper: show error under a field ---
        function showError(input, msg) {
            clearError(input);
            input.classList.add('field-error');
            const err = document.createElement('span');
            err.className = 'field-error-msg';
            err.textContent = msg;
            input.parentNode.appendChild(err);
        }

        // --- Helper: clear error from a field ---
        function clearError(input) {
            input.classList.remove('field-error');
            const existing = input.parentNode.querySelector('.field-error-msg');
            if (existing) existing.remove();
        }

        // --- Helper: show success popup ---
        function showSuccessPopup() {
            const overlay = document.createElement('div');
            overlay.className = 'success-popup-overlay';
            overlay.innerHTML = `
                <div class="success-popup">
                    <div class="success-popup-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                    </div>
                    <h4>Message Sent!</h4>
                    <p>Thank you for reaching out. We'll get back to you within 24-48 hours.</p>
                    <button class="success-popup-close">OK, Got it!</button>
                </div>`;
            document.body.appendChild(overlay);
            overlay.querySelector('.success-popup-close').addEventListener('click', function () {
                overlay.remove();
            });
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) overlay.remove();
            });
        }

        // --- Validate full form, return true if valid ---
        function validateForm() {
            let valid = true;

            const name    = document.getElementById('name');
            const email   = document.getElementById('email');
            const phone   = document.getElementById('phone');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            // Name
            if (!name.value.trim()) {
                showError(name, 'Please enter your full name'); valid = false;
            } else { clearError(name); }

            // Email — proper format check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError(email, 'Please enter your email address'); valid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                showError(email, 'Please enter a valid email (e.g. name@example.com)'); valid = false;
            } else { clearError(email); }

            // Phone — exactly 10 digits (optional but if filled must be valid)
            const digitsOnly = phone.value.replace(/\D/g, '');
            if (phone.value.trim() !== '') {
                if (digitsOnly.length !== 10) {
                    showError(phone, 'Phone number must be exactly 10 digits (you entered ' + digitsOnly.length + ')'); valid = false;
                } else { clearError(phone); }
            } else { clearError(phone); }

            // Subject
            if (!subject.value) {
                showError(subject, 'Please select a subject'); valid = false;
            } else { clearError(subject); }

            // Message — minimum 2 words
            const words = message.value.trim().split(/\s+/).filter(w => w.length > 0);
            if (words.length === 0) {
                showError(message, 'Please write your message'); valid = false;
            } else if (words.length < 2) {
                showError(message, 'Your message must have at least 2 words'); valid = false;
            } else { clearError(message); }

            return valid;
        }

        // --- Clear error on input/change ---
        ['name','email','phone','subject','message'].forEach(function(id) {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', function () { clearError(el); });
                el.addEventListener('change', function () { clearError(el); });
            }
        });

        // --- Form submit ---
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validateForm()) return;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(function (response) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                if (response.ok) {
                    contactForm.reset();
                    showSuccessPopup();
                } else {
                    alert('Something went wrong. Please try again or email us directly.');
                }
            })
            .catch(function () {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                alert('Network error. Please check your connection and try again.');
            });
        });
    }

    // ========== CONSOLE MESSAGE ==========
    console.log('%c🌟 Jaiti Foundation 🌟', 'font-size: 20px; font-weight: bold; color: #1e40af;');
    console.log('%cEmpowering underprivileged children through free education.', 'font-size: 14px; color: #475569;');
});

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeIn 1s ease-out';
    }
});

// ========== GALLERY FULLSCREEN ==========
document.addEventListener('click', function(e) {
    const galleryImg = e.target.closest('.gallery-item img');
    if (galleryImg) {
        e.preventDefault();
        e.stopPropagation();
        
        // Native fullscreen support
        if (galleryImg.requestFullscreen) {
            galleryImg.requestFullscreen().catch(err => {
                console.warn('Fullscreen failed:', err);
                // Fallback: create simple modal
                openSimpleModal(galleryImg);
            });
        } else {
            openSimpleModal(galleryImg);
        }
    }
});

function openSimpleModal(img) {
    const modal = document.createElement('div');
    modal.className = 'simple-lightbox-overlay';
    modal.innerHTML = `
        <div class="simple-lightbox">
            <button class="simple-close" aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <img src="${img.src}" alt="${img.alt || ''}">
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    modal.querySelector('.simple-close').onclick = () => {
        document.body.style.overflow = '';
        modal.remove();
    };
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.style.overflow = '';
            modal.remove();
        }
    };
}

// Handle fullscreen exit (ESC key)
document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
        console.log('Exited fullscreen');
    }
});

// ESC exits fullscreen
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});


// ========== UTILITY FUNCTIONS ==========
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args    = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}