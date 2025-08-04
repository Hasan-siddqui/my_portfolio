document.addEventListener('DOMContentLoaded', function () {
    // Initialize all elements as visible immediately
    document.querySelectorAll('[data-animation]').forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
    });

    // Initialize all functionality
    initPreloader();
    initCustomCursor();
    initMobileMenu();
    initStickyHeader();
    initSmoothScrolling();
    initActiveNavLinks();
    initPortfolioFilter();
    initSkillsAnimation();
    initContactForm();
    initThemeToggle();
    initScrollProgress();
    initParticles();
    init3DEffects();
    initScrollAnimations();
    initSkillCharts();

    // --------------------------------------------------
    // FUNCTION DEFINITIONS
    // --------------------------------------------------

    function initPreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            window.addEventListener('load', function () {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => preloader.style.display = 'none'
                });
            });
        }
    }

    function initCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        if (cursor && cursorFollower) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

                gsap.to(cursorFollower, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });

            const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .service-item, .menu-toggle, .modal-close');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    gsap.to(cursorFollower, {
                        width: 60,
                        height: 60,
                        backgroundColor: 'rgba(108, 99, 255, 0.5)',
                        duration: 0.3
                    });
                });

                el.addEventListener('mouseleave', () => {
                    gsap.to(cursorFollower, {
                        width: 40,
                        height: 40,
                        backgroundColor: 'rgba(108, 99, 255, 0.3)',
                        duration: 0.3
                    });
                });
            });
        }
    }

    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', function () {
                this.classList.toggle('active');
                mobileMenu.classList.toggle('active');

                gsap.to(mobileMenu, {
                    right: mobileMenu.classList.contains('active') ? 0 : '-100%',
                    duration: 0.3,
                    ease: 'power2.inOut'
                });
            });

            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', function () {
                    menuToggle.classList.remove('active');
                    gsap.to(mobileMenu, {
                        right: '-100%',
                        duration: 0.3,
                        onComplete: () => mobileMenu.classList.remove('active')
                    });
                });
            });
        }
    }

    function initStickyHeader() {
        const header = document.querySelector('.header');
        if (header) {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 100) {
                    header.classList.add('sticky');
                    gsap.to(header, {
                        padding: '15px 0',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                } else {
                    header.classList.remove('sticky');
                    gsap.to(header, {
                        padding: '20px 0',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        }
    }

    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // First check if ScrollTo plugin is available
                    if (typeof gsap.utils.toArray !== 'undefined' && gsap.utils.toArray(targetElement).length) {
                        gsap.to(window, {
                            duration: 0.8,
                            ease: "power2.inOut",
                            scrollTo: {
                                y: targetElement,
                                offsetY: 80
                            }
                        });
                    } else {
                        // Fallback to native scrolling if GSAP ScrollTo isn't available
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Update the initActiveNavLinks function in script.js
    function initActiveNavLinks() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.main-nav a, .mobile-menu a');

        if (sections.length && navLinks.length) {
            window.addEventListener('scroll', function () {
                let current = '';

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;

                    if (window.scrollY >= sectionTop - 200) {
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

            // Add click event for smooth scrolling
            navLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Close mobile menu if open
                        const menuToggle = document.querySelector('.menu-toggle');
                        const mobileMenu = document.querySelector('.mobile-menu');
                        if (menuToggle && mobileMenu) {
                            menuToggle.classList.remove('active');
                            mobileMenu.classList.remove('active');
                            gsap.to(mobileMenu, {
                                right: '-100%',
                                duration: 0.3
                            });
                        }

                        // Scroll to section
                        gsap.to(window, {
                            scrollTo: {
                                y: targetElement,
                                offsetY: 80
                            },
                            duration: 0.8,
                            ease: 'power2.inOut'
                        });
                    }
                });
            });
        }
    }

    function initPortfolioFilter() {
        const filterItems = document.querySelectorAll('.portfolio-filter ul li');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const portfolioGrid = document.querySelector('.portfolio-grid');

        if (filterItems.length && portfolioItems.length) {
            // Initialize Isotope (if you want fancy filtering animations)
            // First, check if Isotope is loaded
            if (typeof Isotope !== 'undefined') {
                const iso = new Isotope(portfolioGrid, {
                    itemSelector: '.portfolio-item',
                    layoutMode: 'fitRows',
                    transitionDuration: '0.7s'
                });

                filterItems.forEach(item => {
                    item.addEventListener('click', function () {
                        // Remove active class from all filter items
                        filterItems.forEach(i => i.classList.remove('active'));
                        // Add active class to clicked item
                        this.classList.add('active');

                        const filterValue = this.getAttribute('data-filter');
                        iso.arrange({ filter: filterValue });
                    });
                });
            } else {
                // Fallback to simple filtering if Isotope isn't available
                filterItems.forEach(item => {
                    item.addEventListener('click', function () {
                        // Remove active class from all filter items
                        filterItems.forEach(i => i.classList.remove('active'));
                        // Add active class to clicked item
                        this.classList.add('active');

                        const filterValue = this.getAttribute('data-filter');

                        // Show/hide portfolio items based on filter
                        portfolioItems.forEach(item => {
                            if (filterValue === '*' || item.classList.contains(filterValue.replace('.', ''))) {
                                item.style.display = 'block';
                                setTimeout(() => {
                                    item.style.opacity = '1';
                                }, 10);
                            } else {
                                item.style.opacity = '0';
                                setTimeout(() => {
                                    item.style.display = 'none';
                                }, 300);
                            }
                        });
                    });
                });
            }

            // Initialize portfolio modals
            initPortfolioModals();
        }
    }

    function initPortfolioModals() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const modalsContainer = document.getElementById('portfolioModals');

        // Project data with descriptions and technologies
        const projectData = [
            {
                title: "Creative Agency",
                category: "Web Development",
                description: "A modern agency website with responsive design and smooth animations built for a creative studio specializing in digital marketing.",
                technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "Responsive Design"],
                link: "#"
            },
            {
                title: "Dashboard UI",
                category: "Web Development",
                description: "Interactive admin dashboard with real-time data visualization and customizable widgets for business analytics.",
                technologies: ["React", "Chart.js", "Tailwind CSS", "REST API"],
                link: "#"
            },
            {
                title: "Book E-commerce Website",
                category: "E-commerce",
                description: "Full-featured online bookstore with payment gateway integration, inventory management, and book recommendation system.",
                technologies: ["WordPress", "WooCommerce", "PHP", "MySQL", "jQuery"],
                link: "#"
            },
            {
                title: "Portfolio Website",
                category: "Web Development",
                description: "Custom portfolio website with unique animations, dark mode, and project showcase for a freelance photographer.",
                technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "Particles.js"],
                link: "#"
            },
            {
                title: "Task Manager",
                category: "Web Development",
                description: "Productivity app with drag-and-drop interface, team collaboration features, and cloud sync across devices.",
                technologies: ["React", "Node.js", "MongoDB", "Express"],
                link: "#"
            },
            {
                title: "Electronics Store",
                category: "E-commerce",
                description: "Online electronics shop with advanced product filtering, customer reviews, and comparison tools.",
                technologies: ["WordPress", "WooCommerce", "PHP", "MySQL"],
                link: "#"
            }
        ];

        // Create modals for each portfolio item
        portfolioItems.forEach((item, index) => {
            const project = projectData[index] || {
                title: 'Project',
                category: 'Web Design',
                description: 'A professional project showcasing my skills and expertise.',
                technologies: ['HTML5', 'CSS3', 'JavaScript'],
                link: '#'
            };

            const modalHTML = `
            <div class="modal" id="modal-${index}">
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <div class="modal-body">
                        <div class="modal-image">
                            <img src="${item.querySelector('img')?.src || ''}" alt="${project.title}">
                        </div>
                        <div class="modal-text">
                            <h3>${project.title}</h3>
                            <span class="modal-category">${project.category}</span>
                            <p>${project.description}</p>
                            <div class="modal-tech">
                                <h4>Technologies Used:</h4>
                                <ul>
                                    ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                                </ul>
                            </div>
                            <a href="${project.link}" class="btn btn-primary">View Project</a>
                        </div>
                    </div>
                </div>
            </div>
        `;

            modalsContainer.insertAdjacentHTML('beforeend', modalHTML);

            // Add click event to open modal
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = document.getElementById(`modal-${index}`);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Add close functionality to all modals
        document.querySelectorAll('.modal-close, .modal').forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal')) {
                    document.querySelectorAll('.modal').forEach(modal => {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                }
            });
        });

        // Prevent modal content from closing when clicking inside
        document.querySelectorAll('.modal-content').forEach(content => {
            content.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }

    function initSkillsAnimation() {
        const skillProgress = document.querySelectorAll('.skill-progress');

        if (skillProgress.length) {
            const skillsSection = document.querySelector('.about-text');
            if (skillsSection) {
                ScrollTrigger.create({
                    trigger: skillsSection,
                    start: 'top 80%',
                    onEnter: animateSkills
                });
            }

            function animateSkills() {
                skillProgress.forEach(progress => {
                    const width = progress.getAttribute('data-width');
                    gsap.to(progress, {
                        width: width,
                        duration: 1.5,
                        ease: 'power2.out'
                    });
                });
            }
        }
    }

    function initSkillCharts() {
        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;

        const canvas = document.createElement('canvas');
        canvas.className = 'skill-chart';
        skillsSection.appendChild(canvas);

        const skillsData = {
            labels: ['HTML/CSS', 'JavaScript', 'Wordpress', 'PHP', 'UI/UX', 'SEO', 'React'],
            datasets: [{
                data: [95, 90, 95, 70, 85, 90, 80],
                backgroundColor: [
                    'rgba(108, 99, 255, 0.7)',
                    'rgba(108, 99, 255, 0.6)',
                    'rgba(108, 99, 255, 0.5)',
                    'rgba(108, 99, 255, 0.4)',
                    'rgba(108, 99, 255, 0.3)',
                    'rgba(108, 99, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(108, 99, 255, 1)',
                    'rgba(108, 99, 255, 1)',
                    'rgba(108, 99, 255, 1)',
                    'rgba(108, 99, 255, 1)',
                    'rgba(108, 99, 255, 1)',
                    'rgba(108, 99, 255, 1)'
                ],
                borderWidth: 1
            }]
        };

        new Chart(canvas, {
            type: 'radar',
            data: skillsData,
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: 'rgba(108, 99, 255, 0.1)'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            backdropColor: 'transparent',
                            color: 'var(--text-color)'
                        },
                        pointLabels: {
                            color: 'var(--text-color)'
                        },
                        grid: {
                            color: 'rgba(108, 99, 255, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                elements: {
                    line: {
                        tension: 0.1
                    }
                }
            }
        });
    }


    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function () {
                validateField(this);
            });

            input.addEventListener('blur', function () {
                validateField(this);
            });
        });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                const formData = new FormData(contactForm);
                const formValues = Object.fromEntries(formData.entries());

                // Show success animation
                gsap.to(contactForm, {
                    opacity: 0.5,
                    duration: 0.3,
                    onComplete: () => {
                        contactForm.reset();

                        // Create success message
                        const successMsg = document.createElement('div');
                        successMsg.className = 'form-success';
                        successMsg.innerHTML = `
                            <i class="fas fa-check-circle"></i>
                            <h3>Thank you for your message!</h3>
                            <p>I'll get back to you as soon as possible.</p>
                        `;

                        contactForm.parentNode.insertBefore(successMsg, contactForm);
                        contactForm.style.display = 'none';

                        gsap.from(successMsg, {
                            y: 20,
                            opacity: 0,
                            duration: 0.5
                        });

                        // Reset after 5 seconds
                        setTimeout(() => {
                            gsap.to(successMsg, {
                                y: -20,
                                opacity: 0,
                                duration: 0.5,
                                onComplete: () => {
                                    successMsg.remove();
                                    contactForm.style.display = 'block';
                                    gsap.to(contactForm, {
                                        opacity: 1,
                                        duration: 0.3
                                    });
                                }
                            });
                        }, 5000);
                    }
                });
            } else {
                // Show error animation
                gsap.to(contactForm, {
                    x: [-5, 5, -5, 5, 0],
                    duration: 0.5,
                    ease: 'power1.inOut'
                });
            }
        });

        function validateField(field) {
            const group = field.closest('.form-group');
            const error = group.querySelector('.form-error');

            if (!field.value.trim()) {
                group.classList.add('error');
                if (error) error.textContent = 'This field is required';
                return false;
            }

            if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                group.classList.add('error');
                if (error) error.textContent = 'Please enter a valid email';
                return false;
            }

            group.classList.remove('error');
            return true;
        }
    }

    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        // Check for saved theme preference or use preferred color scheme
        const savedTheme = localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        // Apply the saved theme
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        // Toggle theme on button click
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);

            // Animate the toggle
            gsap.to(themeToggle, {
                rotation: 360,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        function updateThemeIcon(theme) {
            const icon = themeToggle.querySelector('i');
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }

    function initScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress-bar');
        if (!scrollProgress) return;

        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;

            scrollProgress.style.width = `${progress}%`;
        });
    }

    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#6c63ff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#6c63ff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }
    }

    function init3DEffects() {
        // Add 3D tilt effect to service items
        VanillaTilt.init(document.querySelectorAll(".service-item"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.05
        });

        // Add 3D tilt effect to portfolio items
        VanillaTilt.init(document.querySelectorAll(".portfolio-item"), {
            max: 10,
            speed: 300,
            glare: true,
            "max-glare": 0.1
        });
    }

    function initScrollAnimations() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Animate elements on scroll
            gsap.utils.toArray('[data-animation]').forEach(el => {
                const animation = el.dataset.animation;
                const delay = parseFloat(el.dataset.delay) || 0;

                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                        markers: false
                    },
                    opacity: 0,
                    y: animation === 'fadeInUp' ? 20 :
                        animation === 'fadeInDown' ? -20 : 0,
                    x: animation === 'fadeInLeft' ? -20 :
                        animation === 'fadeInRight' ? 20 : 0,
                    duration: 0.8,
                    delay: delay,
                    ease: 'power2.out'
                });
            });

            // Hero text animation
            const heroTitleLines = document.querySelectorAll('.hero-title .title-line');
            if (heroTitleLines.length) {
                heroTitleLines.forEach((line, index) => {
                    gsap.from(line, {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        delay: index * 0.2,
                        ease: 'power2.out'
                    });
                });
            }

            // Section header animations
            gsap.utils.toArray('.section-header').forEach(header => {
                gsap.from(header.querySelector('.section-title'), {
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });

                gsap.from(header.querySelector('.section-subtitle'), {
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'power2.out'
                });
            });

            // About section image animation
            const aboutImage = document.querySelector('.about-image');
            if (aboutImage) {
                // Force show the image (in case animations are interfering)
                gsap.set(aboutImage, { opacity: 1, visibility: 'visible' });

                // Additional animation if needed
                ScrollTrigger.create({
                    trigger: aboutImage,
                    start: "top 80%",
                    onEnter: () => {
                        gsap.to(aboutImage, {
                            opacity: 1,
                            x: 0,
                            duration: 1,
                            ease: "power2.out"
                        });
                    }
                });
            }

            // Service items stagger animation
            const serviceItems = document.querySelectorAll('.service-item');
            if (serviceItems.length) {
                gsap.from(serviceItems, {
                    scrollTrigger: {
                        trigger: '.services-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out'
                });
            }
        } else {
            // Fallback if GSAP isn't loaded
            document.querySelectorAll('[data-animation]').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        }
    }
});