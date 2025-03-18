document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('#navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const links = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu
    navToggle.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent click from immediately bubbling to document
        navLinks.classList.toggle('active');
        // Toggle icon between bars and times
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            // Reset icon to bars
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                // Reset icon to bars
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth scroll for navigation links
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

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Update active link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for sections and elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class with a slight delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Animate cards within the section with staggered delay
                    if (entry.target.tagName.toLowerCase() === 'section') {
                        const cards = entry.target.querySelectorAll('.pricing-card, .industry-card, .benefit-card, .case-study');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('visible');
                            }, 200 + (index * 150)); // Increased stagger delay
                        });
                    }
                }, 100);
            }
        });
    }, observerOptions);

    // Add initial-load class to first visible section
    const firstSection = document.querySelector('section');
    if (firstSection) {
        firstSection.classList.add('initial-load');
    }

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observe individual cards
    document.querySelectorAll('.pricing-card, .industry-card, .benefit-card, .case-study').forEach(card => {
        observer.observe(card);
    });

    // Add fade-in class to elements that should animate
    const fadeElements = document.querySelectorAll('.header h1, .header p, .header-cta, .section-desc');
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}); 