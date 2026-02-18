// ==========================================
// JAITI FOUNDATION - JAVASCRIPT
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
        
        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
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
    let lastScroll = 0;
    
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
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
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== IMPACT COUNTER ANIMATION ==========
    const impactNumbers = document.querySelectorAll('.impact-number');
    
    if (impactNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
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
        
        impactNumbers.forEach(number => {
            observer.observe(number);
        });
    }
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60; // Animate over ~1 second at 60fps
        const duration = 1500; // Total animation duration in ms
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
    
    // ========== CONTACT FORM HANDLING ==========
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Basic validation
            const name = data.name.trim();
            const email = data.email.trim();
            const subject = data.subject;
            const message = data.message.trim();
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            // In a real application, you would send this data to a server
            console.log('Form submitted with data:', data);
            
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Optionally reset form and hide success message after delay
            setTimeout(function () {
                contactForm.reset();
                contactForm.style.display = 'flex';
                formSuccess.style.display = 'none';
            }, 5000);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ========== SCROLL REVEAL ANIMATION ==========
    const revealElements = document.querySelectorAll('.why-card, .program-card, .value-card, .benefit-card, .contribute-card, .step-card, .info-card, .gallery-item');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100); // Stagger animation
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(element);
        });
    }
    
    // ========== GALLERY LIGHTBOX (Optional Enhancement) ==========
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function () {
                const img = this.querySelector('img');
                const caption = this.querySelector('.gallery-caption');
                
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <img src="${img.src}" alt="${img.alt}">
                        ${caption ? `
                            <div class="lightbox-caption">
                                <h3>${caption.querySelector('h3').textContent}</h3>
                                <p>${caption.querySelector('p').textContent}</p>
                            </div>
                        ` : ''}
                    </div>
                `;
                
                // Add lightbox styles
                lightbox.style.cssText = `
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.95);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    animation: fadeIn 0.3s ease;
                `;
                
                const lightboxContent = lightbox.querySelector('.lightbox-content');
                lightboxContent.style.cssText = `
                    max-width: 90%;
                    max-height: 90vh;
                    position: relative;
                `;
                
                const lightboxImg = lightbox.querySelector('img');
                lightboxImg.style.cssText = `
                    max-width: 100%;
                    max-height: 80vh;
                    border-radius: 8px;
                    display: block;
                `;
                
                const lightboxClose = lightbox.querySelector('.lightbox-close');
                lightboxClose.style.cssText = `
                    position: absolute;
                    top: -40px;
                    right: 0;
                    font-size: 2rem;
                    color: white;
                    cursor: pointer;
                    background: none;
                    border: none;
                    padding: 0.5rem;
                `;
                
                const lightboxCaption = lightbox.querySelector('.lightbox-caption');
                if (lightboxCaption) {
                    lightboxCaption.style.cssText = `
                        color: white;
                        text-align: center;
                        margin-top: 1rem;
                    `;
                }
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Close lightbox
                lightboxClose.addEventListener('click', closeLightbox);
                lightbox.addEventListener('click', function (e) {
                    if (e.target === lightbox) {
                        closeLightbox();
                    }
                });
                
                function closeLightbox() {
                    lightbox.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(function () {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
                
                // Close on Escape key
                document.addEventListener('keydown', function (e) {
                    if (e.key === 'Escape') {
                        closeLightbox();
                    }
                });
            });
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
        position: fixed;
        bottom: 0.5rem;
        right: 1rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(30, 64, 175, 0.3);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    backToTopBtn.querySelector('svg').style.cssText = `
        width: 24px;
        height: 24px;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 25px rgba(30, 64, 175, 0.4)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 20px rgba(30, 64, 175, 0.3)';
    });
    
    // ========== ACTIVE NAV LINK HIGHLIGHTING ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = document.querySelectorAll('.nav-links a');
    
    if (sections.length > 0 && navLinksArray.length > 0) {
        window.addEventListener('scroll', function () {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // ========== LAZY LOADING IMAGES ==========
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0 && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ========== FORM INPUT ANIMATIONS ==========
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if already has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // ========== PRINT FUNCTIONALITY ==========
    const printButtons = document.querySelectorAll('[data-print]');
    
    printButtons.forEach(button => {
        button.addEventListener('click', function () {
            window.print();
        });
    });
    
    // ========== CONSOLE MESSAGE ==========
    console.log('%c🌟 Jaiti Foundation 🌟', 'font-size: 20px; font-weight: bold; color: #1e40af;');
    console.log('%cEmpowering underprivileged children through free education, moral values, and holistic development.', 'font-size: 14px; color: #475569;');
    console.log('%cWebsite developed with ❤️ for Jaiti Foundation', 'font-size: 12px; color: #94a3b8; font-style: italic;');
    // ========== VISITOR COUNTER ==========
const visitorCountEl = document.getElementById('visitorCount');

if (visitorCountEl) {
    // Get current count from localStorage, start from a base number
    const BASE_COUNT = 1000; // Starting base so it doesn't show 1 on first visit
    let count = parseInt(localStorage.getItem('jaiti_visitor_count') || BASE_COUNT);
    
    // Increment on each visit
    count++;
    localStorage.setItem('jaiti_visitor_count', count);
    
    // Animate the number counting up
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
});

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
    
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeIn 1s ease-out';
    }
});

// ========== UTILITY FUNCTIONS ==========

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
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
