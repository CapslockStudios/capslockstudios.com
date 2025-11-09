// parallax effect
// only apply parallax on desktop (non touch devices and wider screens)
function isMobileDevice() {
    return window.innerWidth <= 768 || ('ontouchstart' in window);
}

window.addEventListener('scroll', () => {
    // skip parallax effect on mobile
    if (!isMobileDevice()) {
        const scrolled = window.pageYOffset;
        
        document.querySelectorAll('.parallax-element').forEach(el => {
            const speed = el.getAttribute('data-speed') || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    } else {
        // reset transform on mobile to prevent any leftover parallax effect
        document.querySelectorAll('.parallax-element').forEach(el => {
            el.style.transform = 'translateY(0)';
        });
    }
});

// navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// scroll animations - DISABLED
/* const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.game, .feature-card, .fade-in-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
}); */

