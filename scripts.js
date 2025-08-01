// Basenus Website JavaScript
(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        PARTICLE_COUNT: 150,
        PARTICLE_SPEED: 0.3,
        CONTRACT_ADDRESS: "0x1234567890abcdef1234567890abcdef12345678",
        ANIMATION_DELAY: {
            TITLE: 0,
            SUBTITLE: 300,
            BUTTONS: 500,
            SOCIAL: 700
        },
        STAR_TYPES: {
            REGULAR: 0.7,  // 70% regular stars
            LARGE: 0.2,    // 20% large stars  
            BRIGHT: 0.1    // 10% bright stars
        }
    };

    // State
    let particles = [];
    let animationFrame = null;
    let isVisible = false;

    // Utility Functions
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getViewportDimensions() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    function createElement(tag, className, styles = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        Object.assign(element.style, styles);
        return element;
    }

    // Particle System
    class ParticleSystem {
        constructor() {
            this.particles = [];
            this.container = document.getElementById('particles-container');
            this.isAnimating = false;
        }

        createParticle() {
            const { width, height } = getViewportDimensions();
            const starType = this.getRandomStarType();
            
            return {
                x: random(0, width),
                y: random(0, height),
                vx: random(-CONFIG.PARTICLE_SPEED, CONFIG.PARTICLE_SPEED),
                vy: random(-CONFIG.PARTICLE_SPEED, CONFIG.PARTICLE_SPEED),
                opacity: random(0.3, 0.9),
                element: null,
                starType: starType
            };
        }

        getRandomStarType() {
            const rand = Math.random();
            if (rand < CONFIG.STAR_TYPES.BRIGHT) return 'bright';
            if (rand < CONFIG.STAR_TYPES.BRIGHT + CONFIG.STAR_TYPES.LARGE) return 'large';
            return 'regular';
        }

        initializeParticles() {
            // Clear existing particles
            this.clearParticles();
            
            // Create new particles with different star types
            for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
                const particle = this.createParticle();
                
                // Create DOM element with star type class
                const className = particle.starType === 'regular' ? 'particle' : `particle ${particle.starType}`;
                
                particle.element = createElement('div', className, {
                    left: `${particle.x}px`,
                    top: `${particle.y}px`,
                    opacity: particle.opacity,
                    animationDelay: `${i * 0.05}s`
                });

                this.container.appendChild(particle.element);
                this.particles.push(particle);
            }
        }

        updateParticles() {
            const { width, height } = getViewportDimensions();

            this.particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around screen edges
                if (particle.x < 0) particle.x = width;
                if (particle.x > width) particle.x = 0;
                if (particle.y < 0) particle.y = height;
                if (particle.y > height) particle.y = 0;

                // Update DOM element
                if (particle.element) {
                    particle.element.style.left = `${particle.x}px`;
                    particle.element.style.top = `${particle.y}px`;
                }
            });
        }

        clearParticles() {
            this.particles.forEach(particle => {
                if (particle.element && particle.element.parentNode) {
                    particle.element.parentNode.removeChild(particle.element);
                }
            });
            this.particles = [];
        }

        start() {
            if (this.isAnimating) return;
            this.isAnimating = true;

            const animate = () => {
                if (!this.isAnimating) return;
                this.updateParticles();
                requestAnimationFrame(animate);
            };

            animate();
        }

        stop() {
            this.isAnimating = false;
        }

        resize() {
            // Reinitialize particles on resize
            this.initializeParticles();
        }
    }

    // Animation Controller
    class AnimationController {
        constructor() {
            this.observers = new Map();
        }

        createIntersectionObserver(callback, options = {}) {
            const defaultOptions = {
                threshold: 0.1,
                rootMargin: '0px'
            };

            return new IntersectionObserver(callback, { ...defaultOptions, ...options });
        }

        observeElement(element, callback, options) {
            const observer = this.createIntersectionObserver(callback, options);
            observer.observe(element);
            this.observers.set(element, observer);
            return observer;
        }

        unobserveElement(element) {
            const observer = this.observers.get(element);
            if (observer) {
                observer.unobserve(element);
                this.observers.delete(element);
            }
        }

        animateHeroElements() {
            const elements = {
                planet: document.getElementById('planet-core'),
                title: document.getElementById('hero-title'),
                subtitle: document.getElementById('hero-subtitle'),
                buttons: document.getElementById('hero-buttons'),
                social: document.getElementById('social-links')
            };

            // Animate planet immediately
            if (elements.planet) {
                setTimeout(() => {
                    elements.planet.classList.add('visible');
                }, 100);
            }

            // Animate other elements with delays
            Object.entries(CONFIG.ANIMATION_DELAY).forEach(([key, delay]) => {
                const elementKey = key.toLowerCase();
                const element = elements[elementKey === 'buttons' ? 'buttons' : elementKey === 'social' ? 'social' : elementKey];
                
                if (element) {
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, delay + 200);
                }
            });
        }

        setupScrollAnimations() {
            const animatedElements = document.querySelectorAll('.feature-card, .tokenomics-card, .roadmap-item');
            
            animatedElements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.6s ease';

                this.observeElement(element, (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateY(0)';
                            }, index * 100);
                        }
                    });
                });
            });
        }
    }

    // Navigation Controller
    class NavigationController {
        constructor() {
            this.setupSmoothScrolling();
        }

        setupSmoothScrolling() {
            // Handle navigation clicks
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(anchor.getAttribute('href'));
                    
                    if (target) {
                        const offsetTop = target.offsetTop - 80; // Account for fixed nav height
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        highlightActiveSection() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');

            window.addEventListener('scroll', () => {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.offsetHeight;
                    
                    if (window.pageYOffset >= sectionTop && 
                        window.pageYOffset < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });
        }
    }

    // Clipboard Functionality
    class ClipboardManager {
        constructor() {
            this.setupCopyButton();
        }

        setupCopyButton() {
            const copyButton = document.getElementById('copy-contract');
            if (copyButton) {
                copyButton.addEventListener('click', () => {
                    this.copyToClipboard(CONFIG.CONTRACT_ADDRESS);
                });
            }
        }

        async copyToClipboard(text) {
            try {
                // Modern clipboard API
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text);
                    this.showCopySuccess();
                } else {
                    // Fallback for older browsers
                    this.fallbackCopyToClipboard(text);
                }
            } catch (err) {
                console.error('Failed to copy text: ', err);
                this.showCopyError();
            }
        }

        fallbackCopyToClipboard(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                document.execCommand('copy');
                this.showCopySuccess();
            } catch (err) {
                this.showCopyError();
            } finally {
                document.body.removeChild(textArea);
            }
        }

        showCopySuccess() {
            this.showNotification('Contract address copied to clipboard!', 'success');
        }

        showCopyError() {
            this.showNotification('Failed to copy contract address', 'error');
        }

        showNotification(message, type = 'info') {
            // Create notification element
            const notification = createElement('div', `notification notification-${type}`, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                background: type === 'success' ? '#10b981' : '#ef4444',
                color: 'white',
                padding: '1rem 1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                zIndex: '9999',
                opacity: '0',
                transform: 'translateX(100%)',
                transition: 'all 0.3s ease'
            });

            notification.textContent = message;
            document.body.appendChild(notification);

            // Animate in
            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateX(0)';
            }, 10);

            // Animate out and remove
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }
    }

    // Performance Monitor
    class PerformanceMonitor {
        constructor() {
            this.isReducedMotion = this.checkReducedMotionPreference();
            this.setupPerformanceOptimizations();
        }

        checkReducedMotionPreference() {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }

        setupPerformanceOptimizations() {
            // Reduce animations if user prefers reduced motion
            if (this.isReducedMotion) {
                document.documentElement.style.setProperty('--animation-duration', '0.01s');
            }

            // Pause animations when tab is not visible
            document.addEventListener('visibilitychange', () => {
                const particleSystem = window.particleSystem;
                if (document.hidden) {
                    if (particleSystem) particleSystem.stop();
                } else {
                    if (particleSystem) particleSystem.start();
                }
            });
        }

        throttle(func, delay) {
            let timeoutId;
            let lastExecTime = 0;
            
            return function (...args) {
                const currentTime = Date.now();
                
                if (currentTime - lastExecTime > delay) {
                    func.apply(this, args);
                    lastExecTime = currentTime;
                } else {
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        func.apply(this, args);
                        lastExecTime = Date.now();
                    }, delay - (currentTime - lastExecTime));
                }
            };
        }
    }

    // Main Application
    class BasenusApp {
        constructor() {
            this.particleSystem = null;
            this.animationController = null;
            this.navigationController = null;
            this.clipboardManager = null;
            this.performanceMonitor = null;
        }

        async init() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Initialize components
            this.performanceMonitor = new PerformanceMonitor();
            this.particleSystem = new ParticleSystem();
            this.animationController = new AnimationController();
            this.navigationController = new NavigationController();
            this.clipboardManager = new ClipboardManager();

            // Store particle system globally for visibility control
            window.particleSystem = this.particleSystem;

            // Setup
            this.setupEventListeners();
            this.initializeParticles();
            this.startAnimations();

            console.log('🚀 Basenus website initialized successfully!');
        }

        setupEventListeners() {
            // Resize handler
            const resizeHandler = this.performanceMonitor.throttle(() => {
                if (this.particleSystem) {
                    this.particleSystem.resize();
                }
            }, 250);

            window.addEventListener('resize', resizeHandler);

            // Scroll handler for navigation highlighting
            this.navigationController.highlightActiveSection();
        }

        initializeParticles() {
            if (this.particleSystem) {
                this.particleSystem.initializeParticles();
            }
        }

        startAnimations() {
            // Start particle system
            if (this.particleSystem && !this.performanceMonitor.isReducedMotion) {
                this.particleSystem.start();
            }

            // Start hero animations
            setTimeout(() => {
                this.animationController.animateHeroElements();
            }, 500);

            // Setup scroll animations
            this.animationController.setupScrollAnimations();
        }

        destroy() {
            // Cleanup
            if (this.particleSystem) {
                this.particleSystem.stop();
                this.particleSystem.clearParticles();
            }

            // Remove event listeners
            window.removeEventListener('resize', this.resizeHandler);
        }
    }

    // Initialize the application
    const app = new BasenusApp();
    app.init().catch(error => {
        console.error('Failed to initialize Basenus app:', error);
    });

    // Expose app globally for debugging
    window.BasenusApp = app;

    // Add some fun console messages
    console.log(`
    🌌 BASENUS - The Future of DeFi on Base 🌌
    
    Welcome to the source code!
    Built with ❤️ for the Base ecosystem
    
    Contract: ${CONFIG.CONTRACT_ADDRESS}
    `);

})();
