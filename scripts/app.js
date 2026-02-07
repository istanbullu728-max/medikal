// Basic interactions
document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-cta');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    if (mobileToggle && mobileMenuOverlay) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        }

        // Close menu when a link is clicked (excluding dropdown triggers)
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // If it's a dropdown trigger, don't close menu
                if (link.parentElement.classList.contains('has-megamenu')) return;

                mobileToggle.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Mobile Dropdown Accordion
        const dropdownTriggers = document.querySelectorAll('.mobile-nav-links .has-megamenu > a');
        dropdownTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                trigger.parentElement.classList.toggle('active');
            });
        });
    }


    // Mobile Product Auto-Scroll - DISABLED (User will manually scroll)
    // Auto-scroll feature has been removed per user request

    // Mobile Animations (Framer-style Reveal)
    if (window.innerWidth <= 768) {
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -10% 0px' };

        // 1. Hero Reveal
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            heroText.classList.add('hero-reveal');
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        heroObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            heroObserver.observe(heroText);
        }

        // 2. Product Cards Staggered Reveal
        const cards = document.querySelectorAll('.product-card');
        const productsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    // Calculate index relative to currently visible set to stagger
                    // Simple delay based on child index
                    const index = Array.from(cards).indexOf(card) % 5;
                    card.style.transitionDelay = `${index * 0.1}s`;
                    card.classList.add('active');
                    productsObserver.unobserve(card);
                }
            });
        }, { threshold: 0.1, rootMargin: '50px' });

        cards.forEach(card => productsObserver.observe(card));
    }

    // Mega Menu Functionality (All Devices)
    const menuTrigger = document.getElementById('productsMenuTrigger');
    const mobileMenuTrigger = document.getElementById('mobileProductsMenuTrigger');
    const megaMenu = document.getElementById('megaMenu');
    const categoryItems = document.querySelectorAll('.category-item');
    const menuParent = menuTrigger?.closest('.has-megamenu');

    if (megaMenu) {
        // Desktop menu trigger
        if (menuTrigger) {
            menuTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                megaMenu.classList.toggle('active');
                menuParent?.classList.toggle('menu-open');
            });
        }



        // Close mega menu when clicking outside
        document.addEventListener('click', (e) => {
            const isMenuTrigger = menuTrigger?.contains(e.target) || mobileMenuTrigger?.contains(e.target);
            if (!megaMenu.contains(e.target) && !isMenuTrigger) {
                megaMenu.classList.remove('active');
                menuParent?.classList.remove('menu-open');
            }
        });

        // Category hover - switch active state (desktop only behavior)
        categoryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    categoryItems.forEach(cat => cat.classList.remove('active'));
                    item.classList.add('active');
                }
            });
        });
    }
});
