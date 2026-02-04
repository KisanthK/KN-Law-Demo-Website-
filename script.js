/**
 * KN LAW - Unified Professional Interaction Script
 * Optimized for 5S Ergonomics: Sort (Seiri) & Standardize (Seiketsu)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTORS
    const sections = document.querySelectorAll('section, header');
    const nav = document.querySelector('.solid-navbar');
    const menuToggle = document.querySelector('#mobile-menu');
    const navMenu = document.querySelector('#nav-menu');
    const resultsSection = document.querySelector('#results');
    const navLinks = document.querySelectorAll('.nav-item-elite');

    // 2. NAVIGATION & SCROLL HANDLER
    window.addEventListener('scroll', () => {
        // A. Navbar Appearance (Shadow/Solid background on scroll)
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // B. Active Link Highlighter
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (current && link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // 3. MOBILE MENU INTERACTION (Hamburger & Sidebar)
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            // Toggle the 'active' class to slide the menu
            navMenu.classList.toggle('active');
            // Toggle 'is-active' for the CSS Hamburger-to-X animation
            menuToggle.classList.toggle('is-active');
        });

        // Close menu when a link is clicked (Ergonomic UX)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('is-active');
            });
        });
    }

    // 4. SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            
            if (target) {
                window.scrollTo({
                    // Offset by 85px to account for the fixed navbar height
                    top: target.offsetTop - 85, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. REVEAL ANIMATIONS (Intersection Observer)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('section, .p-card-premium, .editorial-row, .hero-text-content').forEach(el => {
        el.classList.add('reveal'); 
        revealObserver.observe(el);
    });

    // 6. DYNAMIC COUNT-UP FEATURE
    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                const speed = 200; 

                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const format = counter.getAttribute('data-format');
                        const decimals = +counter.getAttribute('data-decimals') || 0;
                        
                        let currentText = counter.innerText.replace('K', '').replace(',', '');
                        let count = parseFloat(currentText) || 0;
                        
                        const displayCount = format === 'k' ? count * 1000 : count;
                        const inc = target / speed;

                        if (displayCount < target) {
                            const nextVal = (displayCount + inc);
                            
                            if (format === 'k') {
                                counter.innerText = (nextVal / 1000).toFixed(decimals) + 'K';
                            } else {
                                counter.innerText = nextVal.toLocaleString(undefined, {
                                    minimumFractionDigits: decimals,
                                    maximumFractionDigits: decimals
                                });
                            }
                            setTimeout(updateCount, 10);
                        } else {
                            if (format === 'k') {
                                counter.innerText = (target / 1000).toFixed(decimals) + 'K';
                            } else {
                                counter.innerText = target.toLocaleString(undefined, {
                                    minimumFractionDigits: decimals,
                                    maximumFractionDigits: decimals
                                });
                            }
                        }
                    };
                    updateCount();
                });
                observer.unobserve(entry.target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounters, { threshold: 0.5 });
    if (resultsSection) {
        counterObserver.observe(resultsSection);
    }
});
// Cha
// To this:
const navMenu = document.querySelector('#nav-menu');
/* UX SCRIPT: Intersection Observer for Reveal */
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-me').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });
});