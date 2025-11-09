class ImageCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicatorsContainer = document.querySelector('.carousel-indicators');
        this.indicators = [];
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        this.userInteracted = false; // track if user has manually interacted
        
        this.init();
    }
    
    init() {
        if (!this.slides.length) return;
        
        // dynamically create indicators based on number of slides
        this.createIndicators();
        
        // add click events to navigation buttons
        this.prevBtn?.addEventListener('click', () => {
            this.userInteracted = true;
            this.prevSlide(true);
        });
        this.nextBtn?.addEventListener('click', () => {
            this.userInteracted = true;
            this.nextSlide(true);
        });
        
        // add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.userInteracted = true;
                this.prevSlide(true);
            }
            if (e.key === 'ArrowRight') {
                this.userInteracted = true;
                this.nextSlide(true);
            }
        });
        
        // add touch/swipe support
        this.addSwipeSupport();
        
        // start autoplay
        this.startAutoPlay();
        
        // pause autoplay on hover (only if user hasn't manually interacted)
        const carousel = document.querySelector('.image-carousel');
        carousel?.addEventListener('mouseenter', () => {
            if (!this.userInteracted) {
                this.stopAutoPlay();
            }
        });
        carousel?.addEventListener('mouseleave', () => {
            if (!this.userInteracted) {
                this.startAutoPlay();
            }
        });
    }
    
    createIndicators() {
        // clear existing indicators
        if (this.indicatorsContainer) {
            this.indicatorsContainer.innerHTML = '';
            
            // create an indicator for each slide
            this.slides.forEach((slide, index) => {
                const indicator = document.createElement('button');
                indicator.classList.add('indicator');
                indicator.setAttribute('data-slide', index);
                indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
                
                // set first indicator as active
                if (index === 0) {
                    indicator.classList.add('active');
                }
                
                // add click event
                indicator.addEventListener('click', () => {
                    this.userInteracted = true;
                    this.goToSlide(index, true);
                });
                
                this.indicatorsContainer.appendChild(indicator);
                this.indicators.push(indicator);
            });
        }
    }
    
    goToSlide(index, isUserAction = false) {
        // remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // update current slide index
        this.currentSlide = index;
        
        // add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        
        // only reset autoplay if user hasn't manually interacted
        if (isUserAction) {
            this.stopAutoPlay();
        } else if (!this.userInteracted) {
            this.resetAutoPlay();
        }
    }
    
    nextSlide(isUserAction = false) {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex, isUserAction);
    }
    
    prevSlide(isUserAction = false) {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex, isUserAction);
    }
    
    startAutoPlay() {
        // only start autoplay if user hasn't manually interacted
        if (!this.userInteracted) {
            this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
        }
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    addSwipeSupport() {
        const carousel = document.querySelector('.carousel-container');
        if (!carousel) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                this.userInteracted = true;
                if (diff > 0) {
                    this.nextSlide(true);
                } else {
                    this.prevSlide(true);
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
    }
}

// initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ImageCarousel();
});

