document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const closeBtn = document.getElementById('close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Open mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    // Close mobile menu
    closeBtn.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    });

    // Navbar Scroll Effect and Active Link Updating
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        // Add shadow/change bg of navbar on scroll
        if (scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
        }

        // Determine which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Adjust offset to trigger earlier
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        // Update active class on nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Form Submission Handling (Basic Prevent Default)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real scenario, handle form submission via fetch/axios here
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.backgroundColor = '#2ecc71'; // Green color for success
                contactForm.reset();

                // Revert button after 3 seconds
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = ''; // Revert to CSS defined color
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Add simple reveal animation on scroll for elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation observer to service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});
