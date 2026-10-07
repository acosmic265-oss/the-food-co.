// ============================================
// ANIMATIONS.JS - GSAP scroll animations
// ============================================

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Prevent layout shift during animations
gsap.set('body', { autoAlpha: 1 });

// ============================================
// HOMEPAGE ANIMATIONS
// ============================================

if (document.getElementById('spotlight')) {
    // Spotlight cards animation
    gsap.to('.spotlight-card', {
        scrollTrigger: {
            trigger: '#spotlight',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
        },
        y: -30,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8
    });
}

if (document.getElementById('whyus')) {
    // Why us cards animation
    gsap.from('.whyus-card', {
        scrollTrigger: {
            trigger: '#whyus',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8
    });

    // Card number animation
    gsap.to('.card-number', {
        scrollTrigger: {
            trigger: '#whyus',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        color: '#ff6b5b',
        stagger: 0.15,
        duration: 0.8
    });
}

if (document.getElementById('promo')) {
    // Promo section animation
    gsap.from('#promo .promo-content h2', {
        scrollTrigger: {
            trigger: '#promo',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        y: 50,
        opacity: 0,
        duration: 1
    });

    gsap.from('#promo .promo-content p', {
        scrollTrigger: {
            trigger: '#promo',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2
    });
}

// ============================================
// MENU PAGE ANIMATIONS
// ============================================

if (document.querySelectorAll('.menu-card').length > 0) {
    // Menu cards stagger animation
    gsap.from('.menu-card', {
        scrollTrigger: {
            trigger: '.menu-grid',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8
    });

    // Price animation on hover (via CSS)
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.price'), {
                scale: 1.2,
                color: '#ff6b5b',
                duration: 0.3,
                ease: 'back.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.price'), {
                scale: 1,
                color: '#d4a574',
                duration: 0.3,
                ease: 'back.out'
            });
        });
    });
}

// ============================================
// ABOUT PAGE ANIMATIONS
// ============================================

if (document.querySelector('.about-text')) {
    // About text animation
    gsap.from('.about-text h2', {
        scrollTrigger: {
            trigger: '.about-container',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        x: -60,
        opacity: 0,
        duration: 1
    });

    gsap.from('.about-text p', {
        scrollTrigger: {
            trigger: '.about-container',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        x: -60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.2
    });

    gsap.from('.about-box', {
        scrollTrigger: {
            trigger: '.about-container',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        x: 60,
        opacity: 0,
        duration: 1,
        delay: 0.2
    });

    gsap.from('.detail-item', {
        scrollTrigger: {
            trigger: '.about-visual',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8
    });
}

if (document.querySelectorAll('.value-card').length > 0) {
    // Values section animation
    gsap.from('.value-card', {
        scrollTrigger: {
            trigger: '.values-section',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8
    });

    gsap.from('.value-icon', {
        scrollTrigger: {
            trigger: '.values-section',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        scale: 0,
        stagger: 0.12,
        duration: 0.6
    });
}

// ============================================
// CONTACT PAGE ANIMATIONS
// ============================================

if (document.querySelectorAll('.contact-card').length > 0) {
    // Contact cards animation
    gsap.from('.contact-card', {
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8
    });
}

if (document.querySelector('.contact-form')) {
    // Form elements animation
    gsap.from('.contact-form-section', {
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
    });

    gsap.from('.form-group', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6
    });
}

if (document.querySelector('.find-us-content')) {
    // Find us section animation
    gsap.from('.find-us-text', {
        scrollTrigger: {
            trigger: '.find-us-content',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        x: -50,
        opacity: 0,
        duration: 0.8
    });

    gsap.from('.find-us-map', {
        scrollTrigger: {
            trigger: '.find-us-content',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
    });
}

// ============================================
// FOOTER ANIMATIONS
// ============================================

gsap.from('.footer-section', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
    },
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6
});

// ============================================
// GENERAL SCROLL ANIMATIONS
// ============================================

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('[data-scroll-fade]');
fadeElements.forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });
});

// Mobile optimization: Reduce animations on smaller screens
if (window.innerWidth < 768) {
    ScrollTrigger.getAll().forEach(trigger => {
        trigger.disable();
    });

    // Re-enable with reduced complexity
    gsap.utils.toArray('.menu-card, .spotlight-card, .whyus-card, .value-card, .contact-card').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
            },
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out'
        });
    });
}

// Refresh ScrollTrigger on page load
ScrollTrigger.refresh();

console.log('Animations initialized with GSAP');
