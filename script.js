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
    const impactNumbers = document.querySelectorAll('.impact-number');
    
    if (impactNumbers.length > 0) {
        const observerOptions = { threshold: 0.1, rootMargin: '0px' };
        
        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = parseInt(target.getAttribute('data-target'));
                    animateCounter(target, finalNumber);
                    observer.unobserve(target);
                }
            });
        }, observerOptions);
        
        impactNumbers.forEach(number => { observer.observe(number); });
    }
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60;
        const duration = 1500;
        const stepTime = duration / (target / increment);
        
        const timer = setInterval(function () {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
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
    backToTopBtn.style.cssText = `
        position: fixed; bottom: 1rem; right: 1rem; width: 50px; height: 50px;
        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
        color: white; border: none; border-radius: 50%; cursor: pointer;
        display: none; align-items: center; justify-content: center;
        box-shadow: 0 4px 20px rgba(30, 64, 175, 0.3);
        transition: all 0.3s ease; z-index: 999;
    `;
    backToTopBtn.querySelector('svg').style.cssText = `width: 24px; height: 24px;`;
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
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
    const heroDots = document.querySelectorAll('.hero-dot');

    if (heroSlides.length > 0 && heroDots.length > 0) {
        let currentSlide = 0;
        let heroTimer;
        const SLIDE_INTERVAL = 5000;

        function goToSlide(index) {
            heroSlides.forEach(slide => slide.classList.remove('active'));
            heroDots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (index + heroSlides.length) % heroSlides.length;
            
            heroSlides[currentSlide].classList.add('active');
            heroDots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function startHeroTimer() {
            heroTimer = setInterval(nextSlide, SLIDE_INTERVAL);
        }

        function resetTimer() {
            clearInterval(heroTimer);
            startHeroTimer();
        }

        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', function (e) {
                e.preventDefault();
                goToSlide(index);
                resetTimer();
            });
        });

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                clearInterval(heroTimer);
            });

            heroSection.addEventListener('mouseleave', () => {
                startHeroTimer();
            });
        }

        startHeroTimer();
    }

    // ========== CAROUSEL SLIDER (MOBILE OPTIMIZED) ==========
    function initCarousel(trackId, dotsContainerId) {
        const track = document.getElementById(trackId);
        if (!track) return;

        const container = track.closest('.carousel-container');
        const prevBtn = container.querySelector('.carousel-prev');
        const nextBtn = container.querySelector('.carousel-next');
        const dotsContainer = document.getElementById(dotsContainerId);
        const items = Array.from(track.children);
        let current = 0;
        let isTransitioning = false;

        // Create dots
        items.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        function getVisibleCount() {
            const width = window.innerWidth;
            // Mobile: 1 card, Tablet: 1 card, Desktop: 3 cards
            if (width <= 768) return 1;
            return 3;
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        }

        function updateButtons() {
            const visible = getVisibleCount();
            const max = items.length - visible;
            prevBtn.style.opacity = current <= 0 ? '0.4' : '1';
            nextBtn.style.opacity = current >= max ? '0.4' : '1';
            prevBtn.style.pointerEvents = current <= 0 ? 'none' : 'auto';
            nextBtn.style.pointerEvents = current >= max ? 'none' : 'auto';
        }

        function goTo(index) {
            if (isTransitioning) return;
            isTransitioning = true;

            const visible = getVisibleCount();
            const max = items.length - visible;
            current = Math.max(0, Math.min(index, max));
            
            // Calculate width with proper gap
            const firstItem = items[0];
            const computedStyle = window.getComputedStyle(track);
            const gap = parseFloat(computedStyle.gap) || 32;
            const itemWidth = firstItem.offsetWidth + gap;
            
            track.style.transition = 'transform 0.4s ease';
            track.style.transform = `translateX(-${current * itemWidth}px)`;
            
            updateDots();
            updateButtons();

            setTimeout(() => {
                isTransitioning = false;
            }, 400);
        }

        prevBtn.addEventListener('click', () => goTo(current - 1));
        nextBtn.addEventListener('click', () => goTo(current + 1));

        // ===== TOUCH/SWIPE SUPPORT (MOBILE) =====
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            const minSwipe = 50;
            
            if (Math.abs(diff) > minSwipe) {
                if (diff > 0) {
                    goTo(current + 1);  // Swipe left = next
                } else {
                    goTo(current - 1);  // Swipe right = previous
                }
            }
        }, { passive: true });

        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            const visible = getVisibleCount();
            const max = items.length - visible;
            current = Math.min(current, max);
            goTo(current);
        }, 250));

        updateButtons();
    }

    // Initialize carousels
    initCarousel('purposeTrack', 'purposeDots');
    initCarousel('workTrack', 'workDots');

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
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}