document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    const body = document.querySelector('body'); // Get body for scroll lock

    // Toggle navigation on burger click
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle'); // For burger animation
        // Optional: Prevent body scrolling when nav is open
        if (navLinks.classList.contains('nav-active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });

    // Close navigation when a link is clicked (for smoother UX on mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
                body.style.overflow = 'auto'; // Re-enable scroll
            }
        });
    });

    // Optional: Add a subtle fade-in animation for sections as they scroll into view
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0; // Start hidden
        section.style.transform = 'translateY(50px)'; // Start slightly below
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // Simple scroll-to-top button (optional, not included in HTML but can be added)
    // window.addEventListener('scroll', () => {
    //     const scrollTopBtn = document.getElementById('scroll-top-btn');
    //     if (scrollTopBtn) {
    //         if (window.scrollY > 300) {
    //             scrollTopBtn.style.display = 'block';
    //         } else {
    //             scrollTopBtn.style.display = 'none';
    //         }
    //     }
    // });
    // if (document.getElementById('scroll-top-btn')) {
    //     document.getElementById('scroll-top-btn').addEventListener('click', () => {
    //         window.scrollTo({ top: 0, behavior: 'smooth' });
    //     });
    // }
});