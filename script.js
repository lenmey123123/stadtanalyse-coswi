// Presentation JavaScript
class PresentationManager {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = document.querySelectorAll('.slide').length;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.slideCounter = document.querySelector('.slide-counter');
        
        this.init();
    }
    
    init() {
        this.updateSlideCounter();
        this.addKeyboardListeners();
        this.addTouchListeners();
        this.preloadSlides();
        
        // Auto-advance for demo (optional)
        // this.startAutoAdvance();
    }
    
    updateSlideCounter() {
        this.slideCounter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    showSlide(slideIndex) {
        // Remove active class from all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        if (this.slides[slideIndex]) {
            this.slides[slideIndex].classList.add('active');
            this.currentSlide = slideIndex;
            this.updateSlideCounter();
            this.updateIndicators();
            
            // Animate slide elements
            this.animateSlideElements(slideIndex);
        }
    }
    
    animateSlideElements(slideIndex) {
        const slide = this.slides[slideIndex];
        const elements = slide.querySelectorAll('.demo-card, .feature-card, .challenge-card, .principle-card, .question-card, .service-item');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100 + 200);
        });
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.showSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        }
    }
    
    goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < this.totalSlides) {
            this.showSlide(slideIndex);
        }
    }
    
    addKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    break;
            }
        });
    }
    
    addTouchListeners() {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger if horizontal swipe is dominant
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
            
            startX = 0;
            startY = 0;
        });
    }
    
    preloadSlides() {
        // Preload any images or resources
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', () => {
                    console.log('Image loaded:', img.src);
                });
            }
        });
    }
    
    startAutoAdvance(interval = 10000) {
        this.autoAdvanceInterval = setInterval(() => {
            if (this.currentSlide < this.totalSlides - 1) {
                this.nextSlide();
            } else {
                this.goToSlide(0); // Loop back to first slide
            }
        }, interval);
    }
    
    stopAutoAdvance() {
        if (this.autoAdvanceInterval) {
            clearInterval(this.autoAdvanceInterval);
        }
    }
}

// Chart and Animation Functions
function createDemographicsChart() {
    // This would create interactive charts for demographics
    // For now, we'll use CSS animations
    const demoCards = document.querySelectorAll('.demo-card');
    demoCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function animateCounters() {
    const numbers = document.querySelectorAll('.demo-number');
    
    numbers.forEach(number => {
        const text = number.textContent;
        const isPercentage = text.includes('%');
        const isRange = text.includes('-');
        
        if (!isPercentage && !isRange && !isNaN(parseFloat(text))) {
            const finalValue = parseFloat(text.replace(/,/g, ''));
            animateValue(number, 0, finalValue, 2000);
        }
    });
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

function addInteractiveElements() {
    // Add hover effects to service items
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('expanded');
        });
    });
    
    // Add click effects to recommendation table rows
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.addEventListener('click', () => {
            row.style.background = 'rgba(102, 126, 234, 0.1)';
            setTimeout(() => {
                row.style.background = '';
            }, 300);
        });
    });
    
    // Add animation to challenge cards
    const challengeCards = document.querySelectorAll('.challenge-card');
    challengeCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

function addPrintFunctionality() {
    // Add print button
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i>';
    printButton.className = 'print-btn';
    printButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1001;
        transition: all 0.3s ease;
    `;
    
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    printButton.addEventListener('mouseenter', () => {
        printButton.style.transform = 'scale(1.1)';
        printButton.style.background = '#5a6fd8';
    });
    
    printButton.addEventListener('mouseleave', () => {
        printButton.style.transform = 'scale(1)';
        printButton.style.background = '#667eea';
    });
    
    document.body.appendChild(printButton);
}

function addFullscreenFunctionality() {
    // Add fullscreen button
    const fullscreenButton = document.createElement('button');
    fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';
    fullscreenButton.className = 'fullscreen-btn';
    fullscreenButton.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #764ba2;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1001;
        transition: all 0.3s ease;
    `;
    
    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fullscreenButton.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            document.exitFullscreen();
            fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });
    
    document.body.appendChild(fullscreenButton);
}

// Global functions for navigation (called from HTML)
function nextSlide() {
    presentationManager.nextSlide();
}

function previousSlide() {
    presentationManager.previousSlide();
}

function goToSlide(slideIndex) {
    presentationManager.goToSlide(slideIndex);
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize presentation manager
    window.presentationManager = new PresentationManager();
    
    // Add interactive elements
    setTimeout(() => {
        createDemographicsChart();
        animateCounters();
        addInteractiveElements();
        addPrintFunctionality();
        addFullscreenFunctionality();
    }, 1000);
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Adjust layout if needed
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.style.height = '100vh';
    });
});

// Add smooth scrolling for content within slides
document.addEventListener('DOMContentLoaded', () => {
    const slideContents = document.querySelectorAll('.slide-content');
    slideContents.forEach(content => {
        content.style.scrollBehavior = 'smooth';
    });
});

// Performance optimization
function optimizePerformance() {
    // Lazy load non-critical elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    
    const animatedElements = document.querySelectorAll('.demo-card, .feature-card, .challenge-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Call optimization function
document.addEventListener('DOMContentLoaded', optimizePerformance); 