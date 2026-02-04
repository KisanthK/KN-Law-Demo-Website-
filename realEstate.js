/**
 * KN LAW - Integrated Interaction Script
 * Unified for Navigation & Review Slider
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SELECTORS ---
    const globalHeader = document.querySelector('.solid-navbar');
    const navHub = document.querySelector('#navigation-hub');
    const navTrigger = document.querySelector('#mobile-trigger');
    const eliteLinks = document.querySelectorAll('.nav-item-elite');
    const pageRegions = document.querySelectorAll('section, header');

    // Review Slider Selectors
    const slides = document.querySelectorAll('.kn-slide');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const counter = document.getElementById('slide-number');

    // --- 2. MOBILE MENU LOGIC (With Safety Check) ---
    if (navTrigger && navHub) {
        navTrigger.addEventListener('click', () => {
            const isMenuOpen = navHub.classList.toggle('active');
            navTrigger.classList.toggle('is-active');
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        });

        eliteLinks.forEach(link => {
            link.addEventListener('click', () => {
                navHub.classList.remove('active');
                navTrigger.classList.remove('is-active');
                document.body.style.overflow = ''; 
            });
        });
    }

    // --- 3. REVIEW SLIDER LOGIC (With Safety Check) ---
    if (slides.length > 0 && nextBtn && prevBtn) {
        let currentIndex = 0;

        const updateSlider = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            
            if (index >= slides.length) currentIndex = 0;
            else if (index < 0) currentIndex = slides.length - 1;
            else currentIndex = index;

            slides[currentIndex].classList.add('active');
            
            if (counter) {
                counter.textContent = `${currentIndex + 1} / ${slides.length}`;
            }
        };

        nextBtn.addEventListener('click', () => updateSlider(currentIndex + 1));
        prevBtn.addEventListener('click', () => updateSlider(currentIndex - 1));

        // Auto-play (Professional 8s cadence)
        setInterval(() => updateSlider(currentIndex + 1), 8000);
    }

    // --- 4. PRECISION SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            const destination = document.querySelector(targetId);
            if (destination) {
                e.preventDefault();
                const headerOffset = 85;
                const elementPosition = destination.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 5. SCROLL SENSORY (Navbar) ---
    if (globalHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) globalHeader.classList.add('scrolled');
            else globalHeader.classList.remove('scrolled');
        });
    }
});