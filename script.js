document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Initialize Swiper for Testimonials
    const swiperContainer = document.querySelector('.testimonial-swiper');
    if (swiperContainer && typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }
        });
    }

    // 4. Initialize CountUp for Statistics
    // Ensure CountUp loads and runs when the stats section is in view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    let counted = false;
    const statsSection = document.getElementById('impact');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    // Start counting
                    const statElements = document.querySelectorAll('.stat-number');
                    statElements.forEach(el => {
                        const target = parseInt(el.getAttribute('data-count'), 10);
                        // Using countUp JS from globals
                        if (window.countUp) {
                            const countUp = new window.countUp.CountUp(el, target, {
                                duration: 2.5,
                                useEasing: true,
                                useGrouping: true,
                            });
                            if (!countUp.error) {
                                countUp.start();
                            } else {
                                console.error(countUp.error);
                            }
                        } else {
                            // Fallback if countUp didn't load properly
                            el.innerHTML = target.toLocaleString();
                        }
                    });
                    counted = true;
                }
            });
        }, observerOptions);

        observer.observe(statsSection);
    }

    // 5. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
