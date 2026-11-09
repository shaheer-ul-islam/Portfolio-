/**
 * Portfolio Website JavaScript
 * Features: Typing animation, scroll animations, mobile menu, project filtering, form handling
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Typing Animation
    // ==========================================
    const typingElement = document.getElementById('typingText');
    const phrases = [
        'AI Engineer',
        'Machine Learning Developer',
        'Full Stack Developer',
        'NLP Specialist',
        'Deep Learning Enthusiast'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before new phrase
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing animation
    type();

    // ==========================================
    // Navigation & Scroll Effects
    // ==========================================
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const themeToggle = document.getElementById('themeToggle');

    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
        applyTheme(nextTheme);
    });

    function applyTheme(theme) {
        const isLight = theme === 'light';
        document.body.classList.toggle('light-theme', isLight);
        themeToggle.innerHTML = isLight ?
            '<i class="fas fa-sun" aria-hidden="true"></i>' :
            '<i class="fas fa-moon" aria-hidden="true"></i>';
        themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
        localStorage.setItem('theme', theme);
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Update active nav link
        updateActiveNavLink();
    });

    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    const isActive = link.getAttribute('href') === `#${sectionId}`;
                    link.classList.toggle('active', isActive);
                    if (isActive) {
                        link.setAttribute('aria-current', 'true');
                    } else {
                        link.removeAttribute('aria-current');
                    }
                });
            }
        });
    }

    // ==========================================
    // Scroll Reveal Animations (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // Skills Progress Animation
    // ==========================================
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = `${width}%`;
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => skillsObserver.observe(bar));

    // ==========================================
    // Project Filtering
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    // ==========================================
    // Contact Form Handling (Frontend Only)
    // ==========================================
    class Neuron {
        constructor(weights = [], bias = 0) {
            this.weights = weights;
            this.bias = bias;
        }

        activate(value) {
            return value >= 0 ? 1 : 0;
        }

        predict(inputs) {
            const total = inputs.reduce((sum, input, index) => sum + input * (this.weights[index] || 0), this.bias);
            return {
                score: total,
                output: this.activate(total)
            };
        }
    }

    const urgencyKeywords = ['urgent', 'asap', 'immediately', 'deadline', 'critical', 'important', 'error', 'issue', 'help'];
    const urgencyNeuron = new Neuron(Array(urgencyKeywords.length).fill(1), -2);

    function buildInputVector(text) {
        const normalized = text.toLowerCase();
        return urgencyKeywords.map(keyword => normalized.includes(keyword) ? 1 : 0);
    }

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const data = Object.fromEntries(new FormData(contactForm));

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> <span>Sending...</span>';
        formStatus.classList.remove('success', 'error');

        const inputVector = buildInputVector(data.message || '');
        const urgency = urgencyNeuron.predict(inputVector).output === 1 ? 'high' : 'normal';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ ...data, urgency_level: urgency })
            });

            if (!response.ok) throw new Error(`Form endpoint responded with ${response.status}`);

            formStatus.textContent = `Message sent (priority: ${urgency}). I usually reply within 24 hours.`;
            formStatus.classList.add('success');
            contactForm.reset();
        } catch (error) {
            console.warn('Form submission failed, falling back to mailto:', error);
            const subject = encodeURIComponent(data.subject || 'Portfolio enquiry');
            const body = encodeURIComponent(
                `Name: ${data.name}\nEmail: ${data.email}\nPriority: ${urgency}\n\n${data.message}`
            );
            formStatus.textContent = 'Could not send automatically — opening your email app instead.';
            formStatus.classList.add('error');
            window.location.href = `mailto:work.shaheerulislam@gmail.com?subject=${subject}&body=${body}`;
        } finally {
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 4000);

            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.classList.remove('success', 'error');
            }, 8000);
        }
    });

    // ==========================================
    // Parallax Effect for Hero Orbs
    // ==========================================
    const orbs = document.querySelectorAll('.gradient-orb');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (window.innerWidth / 2 - e.clientX) / speed;
            const y = (window.innerHeight / 2 - e.clientY) / speed;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ==========================================
    // Add loading animation for images
    // ==========================================
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '1'; // Show image even if load fails
            console.warn('Image failed to load:', this.src);
        });
        
        // Fallback: set opacity to 1 after 2 seconds if still 0
        setTimeout(() => {
            if (img.style.opacity === '0') {
                img.style.opacity = '1';
            }
        }, 2000);
    });

    // ==========================================
    // Counter Animation for Stats
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent);
                let currentNumber = 0;
                const increment = finalNumber / 50;
                const duration = 2000;
                const stepTime = duration / 50;
                
                const counter = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        target.textContent = finalNumber + '+';
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentNumber) + '+';
                    }
                }, stepTime);
                
                counterObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach(stat => counterObserver.observe(stat));

    // ==========================================
    // Auto-Rotating Belts (skills icons + client logos)
    // ==========================================
    // Shared engine: idle rotation, scroll boost, reversed on scroll up,
    // drag to spin, hover to park so the label can be read.

    const hexToRgba = (hex, alpha) => {
        const value = hex.replace('#', '');
        const full = value.length === 3 ? value.split('').map((c) => c + c).join('') : value;
        const r = parseInt(full.slice(0, 2), 16);
        const g = parseInt(full.slice(2, 4), 16);
        const b = parseInt(full.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    function createMarquee(config) {
        const root = config.root;
        const ring = root ? root.querySelector('[data-marquee-ring]') : null;
        if (!ring) return null;

        const items = config.items || [];
        const buildItem = config.buildItem;
        const polarity = config.polarity === undefined ? 1 : config.polarity; // 1 = left, -1 = right
        const baseSpeed = config.baseSpeed || 42;
        const maxBoost = config.maxBoost || 2400;
        const boostFriction = config.boostFriction || 0.4167; // share of boost kept after 1s
        const scrollGain = config.scrollGain || 2.4;
        const dragGain = config.dragGain || 1.4;

        let loopWidth = 0;
        let copies = 2;
        let phase = 0; // continuous rotation position
        let pullOffset = 0; // temporary shift from dragging, settles back to 0
        let velocity = 0; // fling momentum from dragging
        let spinDirection = polarity;
        let boost = 0;
        let dragging = false;
        let dragTravel = 0;
        let lastPointerX = 0;
        let lastScroll = window.pageYOffset;
        let lastFrame = 0;
        let scrollTimer = 0;
        let scrolling = false;
        let reducedMotion = false;
        let hovered = false;
        let hoverEase = 1;

        function render() {
            if (!loopWidth) return;
            const total = phase + pullOffset;
            const shift = ((total % loopWidth) + loopWidth) % loopWidth;
            ring.style.transform = `translate3d(${-shift}px, 0, 0)`;
        }

        function fill() {
            ring.innerHTML = '';
            const available = root.offsetWidth;
            for (let copy = 0; copy < copies; copy++) {
                items.forEach((item) => ring.appendChild(buildItem(item)));
            }
            loopWidth = ring.scrollWidth / copies;
            while (loopWidth < available && copies < 8) {
                copies++;
                items.forEach((item) => ring.appendChild(buildItem(item)));
                loopWidth = ring.scrollWidth / copies;
            }
        }

        function clampBoost() {
            boost = Math.max(-maxBoost, Math.min(maxBoost, boost));
        }

        function frame(timestamp) {
            const delta = lastFrame ? Math.min(0.05, (timestamp - lastFrame) / 1000) : 0;
            lastFrame = timestamp;

            // Fling momentum from a drag, then settle back to the resting position
            if (Math.abs(velocity) > 1) pullOffset += velocity * delta;
            velocity *= Math.pow(0.02, delta);
            if (!dragging && pullOffset !== 0) {
                pullOffset -= pullOffset * Math.min(1, delta * 6);
                if (Math.abs(pullOffset) < 0.5) pullOffset = 0;
            }

            boost *= Math.pow(boostFriction, delta);
            if (Math.abs(boost) < 0.5) boost = 0;

            // Park the belt while the pointer is over it so labels stay readable
            const hoverTarget = hovered ? 0 : 1;
            hoverEase += (hoverTarget - hoverEase) * Math.min(1, delta * 7);
            if (hoverEase < 0.01) hoverEase = hoverTarget;

            phase += (reducedMotion ? 0 : spinDirection * (baseSpeed + boost) * hoverEase) * delta;
            render();

            requestAnimationFrame(frame);
        }

        window.addEventListener('scroll', () => {
            const current = window.pageYOffset;
            const delta = current - lastScroll;
            lastScroll = current;
            if (!delta || !loopWidth) return;

            spinDirection = (delta > 0 ? 1 : -1) * polarity;
            boost += delta * scrollGain * 60;
            clampBoost();

            if (!scrolling) {
                scrolling = true;
                root.classList.add('is-active');
            }
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                scrolling = false;
                root.classList.remove('is-active');
            }, 180);
        }, { passive: true });

        // Hovering parks the belt so the label can be read
        root.addEventListener('pointerenter', () => { hovered = true; });
        root.addEventListener('pointerleave', () => { hovered = false; });
        root.addEventListener('pointercancel', () => { hovered = false; });

        // Drag the belt by hand (works for mouse, pen and touch)
        root.addEventListener('pointerdown', (e) => {
            dragging = true;
            dragTravel = 0;
            lastPointerX = e.clientX;
            lastFrame = 0;
            if (root.setPointerCapture) root.setPointerCapture(e.pointerId);
        });

        root.addEventListener('pointermove', (e) => {
            if (!dragging) return;
            const movement = e.clientX - lastPointerX;
            lastPointerX = e.clientX;
            dragTravel += Math.abs(movement);
            pullOffset += movement;
            velocity = movement * 60;
            boost += movement * dragGain * 60;
            clampBoost();
            render();
        });

        const endDrag = (e) => {
            if (!dragging) return;
            dragging = false;
            if (root.hasPointerCapture && root.hasPointerCapture(e.pointerId)) {
                root.releasePointerCapture(e.pointerId);
            }
        };

        root.addEventListener('pointerup', endDrag);
        root.addEventListener('pointercancel', endDrag);

        // A drag spins the belt, a tap still follows the project link
        root.addEventListener('click', (e) => {
            if (dragTravel > 6) {
                e.preventDefault();
                e.stopPropagation();
            }
            dragTravel = 0;
        }, true);

        if (typeof window.matchMedia === 'function') {
            const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            reducedMotion = motionQuery.matches;
            if (motionQuery.addEventListener) {
                motionQuery.addEventListener('change', (event) => { reducedMotion = event.matches; });
            }
        }

        const remeasure = () => {
            fill();
            phase = loopWidth / 2;
            pullOffset = 0;
            render();
        };

        let resizeTimer = 0;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(remeasure, 200);
        });

        // Webfonts and image loads change tile widths, so re-measure once they settle
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(remeasure);
        }

        fill();
        remeasure();
        requestAnimationFrame(frame);

        return {
            get speed() { return spinDirection * (baseSpeed + boost) * hoverEase; },
            get boost() { return boost; },
            get direction() { return spinDirection; },
            get offset() { return phase + pullOffset; },
            get width() { return loopWidth; },
            get hovered() { return hovered; },
            get hoverEase() { return hoverEase; },
            remeasure
        };
    }

    // ==========================================
    // Belt 1: skills (icons, rotates to the left)
    // ==========================================
    const marqueeSkills = [
        { name: 'Python', icon: 'fab fa-python', color: '#3776ab' },
        { name: 'PHP', icon: 'fab fa-php', color: '#777bb4' },
        { name: 'JavaScript', icon: 'fab fa-js', color: '#f7df1e' },
        { name: 'SQL', icon: 'fas fa-database', color: '#38bdf8' },
        { name: 'Django', icon: 'fas fa-layer-group', color: '#44b78b' },
        { name: 'Flask', icon: 'fas fa-flask', color: '#e2e8f0' },
        { name: 'FastAPI', icon: 'fas fa-bolt', color: '#009688' },
        { name: 'PyTorch', icon: 'fas fa-fire', color: '#ee4c2c' },
        { name: 'TensorFlow', icon: 'fas fa-brain', color: '#ff6f00' },
        { name: 'Scikit-learn', icon: 'fas fa-chart-line', color: '#f7931e' },
        { name: 'LangChain', icon: 'fas fa-link', color: '#00a37a' },
        { name: 'LlamaIndex', icon: 'fas fa-diagram-project', color: '#f97316' },
        { name: 'Hugging Face', icon: 'fas fa-face-smile', color: '#ffd21e' },
        { name: 'OpenCV', icon: 'fas fa-eye', color: '#5c3ee8' },
        { name: 'NumPy', icon: 'fas fa-calculator', color: '#3b82c4' },
        { name: 'Pandas', icon: 'fas fa-table', color: '#7c3aed' },
        { name: 'Matplotlib', icon: 'fas fa-chart-pie', color: '#3b82f6' },
        { name: 'Streamlit', icon: 'fas fa-chart-area', color: '#ff4b4b' },
        { name: 'MySQL', icon: 'fas fa-server', color: '#00758f' },
        { name: 'PostgreSQL', icon: 'fas fa-hard-drive', color: '#336791' },
        { name: 'MongoDB', icon: 'fas fa-leaf', color: '#47a248' },
        { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: '#7952b3' },
        { name: 'HTML5', icon: 'fab fa-html5', color: '#e34f26' },
        { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#1572b6' },
        { name: 'Tailwind CSS', icon: 'fas fa-wind', color: '#06b6d4' },
        { name: 'Docker', icon: 'fab fa-docker', color: '#2496ed' },
        { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032' },
        { name: 'GitHub Actions', icon: 'fab fa-github', color: '#e6edf3' },
        { name: 'Arduino', icon: 'fas fa-robot', color: '#00979d' },
        { name: 'Jupyter', icon: 'fas fa-book', color: '#f37726' },
        { name: 'VS Code', icon: 'fas fa-code', color: '#007acc' }
    ];

    const buildSkillItem = (skill) => {
        const item = document.createElement('span');
        item.className = 'marquee-item skill-item';
        item.dataset.label = skill.name;
        item.setAttribute('aria-label', skill.name);
        item.style.setProperty('--brand', skill.color);
        item.style.setProperty('--brand-glow', hexToRgba(skill.color, 0.35));
        const icon = document.createElement('i');
        icon.className = skill.icon;
        icon.setAttribute('aria-hidden', 'true');
        item.appendChild(icon);
        return item;
    };

    // ==========================================
    // Belt 2: client projects (logos, rotates the other way)
    // ==========================================
    // Add future work here: { name, logo, link }
    // - logo: optimised .webp inside assets/img/clients/
    // (a styled monogram is shown if the file is missing)
    // - link: live URL, or '' when the project is not public yet
    const clientProjects = [
        { name: 'Arham', logo: 'assets/img/clients/arham.webp', link: '' },
        { name: 'Hayal', logo: 'assets/img/clients/hayal.webp', link: '' },
        { name: 'HB Groups', logo: 'assets/img/clients/hb.webp', link: '' },
        { name: 'Home Made Kitchen', logo: 'assets/img/clients/onlinehmd.webp', link: 'https://onlinehmd.com/' },
        { name: 'Niamat Shoes', logo: 'assets/img/clients/niamat.webp', link: 'https://niamatshoes.com' },
        { name: 'SCD', logo: 'assets/img/clients/scd.webp', link: '' },
        { name: 'Styloboutique', logo: 'assets/img/clients/stylo.webp', link: 'http://styloboutique.com/' },
        { name: 'MDC', logo: 'assets/img/clients/mdc.webp', link: 'https://maisondecouture.com.pk/' }
    ];

    const buildClientItem = (project) => {
        const hasLink = Boolean(project.link);
        const item = document.createElement(hasLink ? 'a' : 'span');
        item.className = 'marquee-item client-item';
        item.dataset.label = project.name;

        if (hasLink) {
            item.href = project.link;
            item.target = '_blank';
            item.rel = 'noopener';
            item.setAttribute('aria-label', project.name + ' — view live project');
        } else {
            item.setAttribute('aria-label', project.name);
        }

        const logo = document.createElement('img');
        const encode = (path) => path.replace(/\s+/g, '%20');
        logo.src = encode(project.logo);
        logo.alt = '';
        logo.loading = 'lazy';
        logo.decoding = 'async';
        logo.setAttribute('aria-hidden', 'true');

        // A styled monogram keeps the belt intact if a logo file is missing
        logo.addEventListener('error', () => {
            const monogram = document.createElement('span');
            monogram.className = 'client-monogram';
            monogram.setAttribute('aria-hidden', 'true');
            const name = project.name.trim();
            monogram.textContent = name.length <= 3
                ? name.toUpperCase()
                : name.split(/\s+/).map((word) => word[0]).join('').slice(0, 2).toUpperCase();
            item.replaceChildren(monogram);
        }, { once: true });

        item.appendChild(logo);
        return item;
    };

    const skillsBelt = createMarquee({
        root: document.querySelector('[data-skills-marquee]'),
        items: marqueeSkills,
        buildItem: buildSkillItem,
        polarity: 1,
        baseSpeed: 42
    });

    const clientsBelt = createMarquee({
        root: document.querySelector('[data-clients-marquee]'),
        items: clientProjects,
        buildItem: buildClientItem,
        polarity: -1,
        baseSpeed: 34
    });

    // Tuning handles
    window.belts = { skills: skillsBelt, clients: clientsBelt };
    window.skillsMarquee = skillsBelt;

    // ==========================================
    // Dynamic Artificial Neural Network Canvas Animation
    // ==========================================
    const annCanvas = document.getElementById('ann-canvas');
    if (annCanvas) {
        const ctx = annCanvas.getContext('2d');
        let width, height;
        let layers = [];
        let particles = [];
        
        function initANN() {
            // Setup canvas size to match the section exactly
            const section = document.getElementById('experience');
            if (!section) return;
            
            width = annCanvas.width = section.offsetWidth;
            height = annCanvas.height = section.offsetHeight;
            
            layers = [];
            particles = [];
            
            // Define layer structure: input -> hidden 1 -> hidden 2 -> output
            const numLayers = Math.floor(Math.random() * 2) + 4; // 4 to 5 layers
            const layerSpacing = width / (numLayers + 1);
            
            for (let i = 0; i < numLayers; i++) {
                const isInput = i === 0;
                const isOutput = i === numLayers - 1;
                let numNodes;
                
                if (isInput) numNodes = Math.floor(Math.random() * 3) + 4;
                else if (isOutput) numNodes = Math.floor(Math.random() * 2) + 3;
                else numNodes = Math.floor(Math.random() * 5) + 5; // Hidden layers
                
                const nodes = [];
                const paddingY = height * 0.15;
                const availableHeight = height - (paddingY * 2);
                const nodeSpacing = availableHeight / Math.max(1, (numNodes - 1));
                
                for (let j = 0; j < numNodes; j++) {
                    const yPos = numNodes === 1 
                        ? height / 2 
                        : paddingY + (j * nodeSpacing) + (Math.random() * 40 - 20); // Add some randomness
                        
                    nodes.push({
                        idx: j,
                        x: layerSpacing * (i + 1),
                        y: yPos,
                        radius: Math.random() * 2 + 3,
                        pulse: 0,
                        pulseDir: Math.random() > 0.5 ? 1 : -1,
                        pulseSpeed: Math.random() * 0.05 + 0.02
                    });
                }
                
                layers.push(nodes);
            }
            
            // Generate some data particles that will travel through connections slowly
            // Clear existing intervals if we re-init
            if (window.annInterval) clearInterval(window.annInterval);
            window.annInterval = setInterval(spawnParticle, 1000); // 1 particle per second
        }
        
        function spawnParticle() {
            if (layers.length < 2) return;
            // Pick a random node in the input layer
            const startLayer = 0;
            const startNodeIdx = Math.floor(Math.random() * layers[startLayer].length);
            
            // Pick a random node in the next layer
            const endNodeIdx = Math.floor(Math.random() * layers[startLayer + 1].length);
            
            particles.push({
                layerIdx: startLayer,
                startNodeIdx: startNodeIdx,
                targetNodeIdx: endNodeIdx,
                progress: 0,
                speed: Math.random() * 0.005 + 0.005, // Smooth, slightly slower speed
                trail: [] // to leave a glowing tail
            });
            
            // Highlight the starting node
            layers[startLayer][startNodeIdx].pulse = 1;
        }
        
        function animateANN() {
            ctx.clearRect(0, 0, width, height);
            
            const isLight = document.body.classList.contains('light-theme');
            const primaryColor = isLight ? 'rgba(79, 70, 229,' : 'rgba(99, 102, 241,';
            const secondaryColor = isLight ? 'rgba(6, 182, 212,' : 'rgba(6, 182, 212,'; 
            const nodeColor = isLight ? 'rgba(107, 114, 128,' : 'rgba(156, 163, 175,';
            
            // Draw connections (static)
            ctx.lineWidth = 1;
            for (let i = 0; i < layers.length - 1; i++) {
                const currentLayer = layers[i];
                const nextLayer = layers[i + 1];
                
                for (let currNode of currentLayer) {
                    for (let nxtNode of nextLayer) {
                        ctx.beginPath();
                        ctx.moveTo(currNode.x, currNode.y);
                        
                        const cp1x = currNode.x + (nxtNode.x - currNode.x) / 3;
                        const cp1y = currNode.y;
                        const cp2x = currNode.x + 2 * (nxtNode.x - currNode.x) / 3;
                        const cp2y = nxtNode.y;
                        
                        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nxtNode.x, nxtNode.y);
                        
                        // Very faint base connections
                        ctx.strokeStyle = nodeColor + '0.1)';
                        ctx.stroke();
                    }
                }
            }
            
            // Update and draw nodes
            for (let i = 0; i < layers.length; i++) {
                for (let node of layers[i]) {
                    // Update heartbeat pulse
                    node.pulse += node.pulseSpeed * node.pulseDir;
                    if (node.pulse >= 1) {
                        node.pulse = 1;
                        node.pulseDir = -1;
                    } else if (node.pulse <= 0) {
                        node.pulse = 0;
                        node.pulseDir = 1;
                    }
                    
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.radius + (node.pulse * 1.5), 0, Math.PI * 2);
                    
                    // Input layers are more primary colored, outputs more secondary
                    if (i === 0) {
                        ctx.fillStyle = primaryColor + (0.4 + node.pulse * 0.4) + ')';
                    } else if (i === layers.length - 1) {
                        ctx.fillStyle = secondaryColor + (0.4 + node.pulse * 0.4) + ')';
                    } else {
                        ctx.fillStyle = nodeColor + (0.3 + node.pulse * 0.4) + ')';
                    }
                    
                    if (node.pulse > 0.6) {
                        ctx.shadowBlur = 8;
                        ctx.shadowColor = (i === layers.length - 1 ? secondaryColor : primaryColor) + '0.6)';
                    } else {
                        ctx.shadowBlur = 0;
                    }
                    
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            }
            
            // Update and draw particles (data flow between nodes)
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                
                if (p.layerIdx >= layers.length - 1) {
                    particles.splice(i, 1);
                    continue;
                }
                
                const currNode = layers[p.layerIdx][p.startNodeIdx];
                const targetNode = layers[p.layerIdx + 1][p.targetNodeIdx];
                
                if (!currNode || !targetNode) {
                    particles.splice(i, 1);
                    continue;
                }
                
                p.progress += p.speed;
                
                if (p.progress >= 1) {
                    // Arrived at target node, trigger a bright pulse
                    targetNode.pulse = 1;
                    
                    // Move to next layer
                    p.layerIdx++;
                    p.progress = 0;
                    
                    if (p.layerIdx >= layers.length - 1) {
                        particles.splice(i, 1);
                        continue;
                    } else {
                        p.startNodeIdx = p.targetNodeIdx;
                        // Determine random next path
                        p.targetNodeIdx = Math.floor(Math.random() * layers[p.layerIdx + 1].length);
                    }
                } else {
                    // Calculate bezier curve position
                    const t = p.progress;
                    
                    const cp1x = currNode.x + (targetNode.x - currNode.x) / 3;
                    const cp1y = currNode.y;
                    const cp2x = currNode.x + 2 * (targetNode.x - currNode.x) / 3;
                    const cp2y = targetNode.y;
                    
                    const x = Math.pow(1-t, 3)*currNode.x + 3*Math.pow(1-t, 2)*t*cp1x + 3*(1-t)*Math.pow(t, 2)*cp2x + Math.pow(t, 3)*targetNode.x;
                    const y = Math.pow(1-t, 3)*currNode.y + 3*Math.pow(1-t, 2)*t*cp1y + 3*(1-t)*Math.pow(t, 2)*cp2y + Math.pow(t, 3)*targetNode.y;
                    
                    // Save for trail
                    p.trail.push({x, y});
                    if (p.trail.length > 20) p.trail.shift();
                    
                    // Draw particle
                    ctx.beginPath();
                    ctx.arc(x, y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = primaryColor + '1)';
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = primaryColor + '1)';
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    
                    // Draw blazing trail
                    if (p.trail.length > 1) {
                        ctx.beginPath();
                        ctx.moveTo(p.trail[0].x, p.trail[0].y);
                        for (let j = 1; j < p.trail.length; j++) {
                            ctx.lineTo(p.trail[j].x, p.trail[j].y);
                        }
                        const gradient = ctx.createLinearGradient(p.trail[0].x, p.trail[0].y, x, y);
                        gradient.addColorStop(0, primaryColor + '0)');
                        gradient.addColorStop(1, primaryColor + '0.8)');
                        
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = gradient;
                        ctx.stroke();
                    }
                }
            }
            
            runANN();
        }

        initANN();

        // Only paint while the section is on screen: saves CPU and battery on mobile
        let annVisible = true;
        let annFrame = 0;
        const prefersReducedMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function runANN() {
            if (!annVisible || prefersReducedMotion) return;
            annFrame = requestAnimationFrame(animateANN);
        }

        if ('IntersectionObserver' in window) {
            const annObserver = new IntersectionObserver((entries) => {
                const wasVisible = annVisible;
                annVisible = entries[0].isIntersecting;
                if (annVisible && !wasVisible) {
                    cancelAnimationFrame(annFrame);
                    runANN();
                } else if (!annVisible) {
                    cancelAnimationFrame(annFrame);
                }
            }, { threshold: 0 });
            annObserver.observe(document.getElementById('experience'));
            runANN();
        } else {
            runANN();
        }

        window.addEventListener('resize', () => {
            clearTimeout(window.resizeAnnTimer);
            window.resizeAnnTimer = setTimeout(initANN, 200);
        });
    }

    // ==========================================
    // Developer ID Card - Unified Physics Assembly
    // ==========================================
    (function initIDCard() {
        const anchor = document.getElementById('navbarCardAnchor');
        const ribbonSvg = document.getElementById('lanyardRibbonSvg');
        const strapPath = document.getElementById('ribbonStrapPath');
        const strapBackPath = document.getElementById('ribbonStrapBack');
        const creasePath = document.getElementById('ribbonCrease');
        const shadowPath = document.getElementById('ribbonShadowPath');
        const stitchLeft = document.getElementById('ribbonStitchLeft');
        const stitchRight = document.getElementById('ribbonStitchRight');
        const tensionPath = document.getElementById('ribbonTensionPath');
        const cardAssembly = document.getElementById('cardAssembly');
        const flipContainer = document.getElementById('cardFlipContainer');
        const hardware = cardAssembly ? cardAssembly.querySelector('.lanyard-hardware') : null;

        if (!anchor || !ribbonSvg || !strapPath || !cardAssembly || !flipContainer) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Hide card on all sections except home/hero
        const homeSection = document.getElementById('home');
        const sections = document.querySelectorAll('section[id]');
        if (sections.length && homeSection) {
            const visibilityObserver = new IntersectionObserver(() => {
                const homeRect = homeSection.getBoundingClientRect();
                const homeVisible =
                    homeRect.top < window.innerHeight && homeRect.bottom > 0;
                anchor.classList.toggle('is-scroll-hidden', !homeVisible);
            }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
            sections.forEach((section) => visibilityObserver.observe(section));
        }

        // Geometry & Layout Constants
        const ANCHOR_P0_X = 20; // local X center of mounting ring
        const ANCHOR_P0_Y = 16; // local Y center of mounting ring
        const BASE_STRAP_W = 14;

        // Physics Constants
        const G = 1350;             // Gravity (px/s^2)
        const K_STRETCH = 175;      // Elastic spring constant
        const C_RADIAL_DAMP = 18;   // Radial bounce damping
        const C_AIR = 0.95;         // Air drag
        const K_ROT = 45;           // Rotational alignment stiffness
        const C_ROT = 7.0;          // Rotational damping

        // Synchronized Flip Spring Constants
        const K_FLIP = 140;         // Snappy, silky flip response
        const C_FLIP = 16;          // Critical damping for clean settle

        let isTablet = window.innerWidth <= 1023;
        let restLanyardLen = isTablet ? 135 : 175;
        let cardWidth = isTablet ? 200 : 250;
        let L0 = restLanyardLen - (G / K_STRETCH);

        function updateDimensions() {
            isTablet = window.innerWidth <= 1023;
            restLanyardLen = isTablet ? 135 : 175;
            cardWidth = isTablet ? 200 : 250;
            L0 = restLanyardLen - (G / K_STRETCH);
        }
        window.addEventListener('resize', updateDimensions);

        // Physics State
        let x = 0;
        let y = reducedMotion ? (ANCHOR_P0_Y + restLanyardLen) : -50; // Entrance drop from above navbar
        let vx = 0;
        let vy = reducedMotion ? 0 : 220;
        let theta = 0;
        let omega = 0;
        let rotY = 0, vRotY = 0;
        let rotX = 0, vRotX = 0;

        // Synchronized 3D Flip State
        let targetFlipAngle = 0;
        let curFlipAngle = 0;
        let vFlipAngle = 0;
        let isFlipped = false;

        // Hover & Mouse Tilt
        let mouseTiltX = 0, mouseTiltY = 0;
        let curMouseTiltX = 0, curMouseTiltY = 0;
        let isHovered = false;

        // Interaction State
        let isDragging = false;
        let pointerDown = false;
        let dragMoved = false;
        let entering = !reducedMotion;
        let idleTime = 0;
        let lastTime = performance.now();
        let rafId = 0;

        let grabOffsetX = 0;
        let grabOffsetY = 0;
        let startPointerX = 0, startPointerY = 0;
        let pointerHistory = [];
        const DRAG_THRESHOLD = 7;

        // Render Ribbon SVG with smooth cubic bezier, thickness preservation & synchronized 3D twist
        function renderRibbon(targetX, targetY, targetTheta, targetRotY, flipAngle) {
            const p0x = ANCHOR_P0_X;
            const p0y = ANCHOR_P0_Y;
            const p1x = ANCHOR_P0_X + targetX;
            const p1y = targetY;

            const rx = p1x - p0x;
            const ry = p1y - p0y;
            const dist = Math.hypot(rx, ry) || 1;
            const s = dist / restLanyardLen;
            const w = BASE_STRAP_W / Math.sqrt(Math.max(1, s));

            // Gravity sag when ribbon is slack
            const sag = dist < restLanyardLen ? (restLanyardLen - dist) * 0.65 : 0;
            const handleLen = Math.max(dist * 0.32, 20);

            // Control point 1: leaves top mounting ring heading vertically down
            const c1x = p0x;
            const c1y = p0y + handleLen + sag;

            // Control point 2: enters card buckle aligned with card's rotation
            const ux = -Math.sin(targetTheta);
            const uy = -Math.cos(targetTheta);
            const c2x = p1x + ux * handleLen;
            const c2y = p1y + uy * handleLen + sag;

            // Total twist angle from top (0 deg) to bottom (flipAngle + targetRotY)
            const totalTwistDeg = flipAngle + targetRotY;
            const totalTwistRad = totalTwistDeg * (Math.PI / 180);

            // Check if ribbon has twisted past 90 deg (Mobius crossover point)
            const absTwist = Math.abs(totalTwistDeg);
            const hasCrossover = absTwist > 90;
            const tCrossover = hasCrossover ? Math.min(0.92, Math.max(0.08, 90 / absTwist)) : 2.0;

            const N = 24;
            const pLeft = [];
            const pRight = [];
            const pStitchA = [];
            const pStitchB = [];
            const pCenter = [];

            let creasePtL = null, creasePtR = null;

            for (let i = 0; i <= N; i++) {
                const t = i / N;
                const it = 1 - t;
                const it2 = it * it, it3 = it2 * it;
                const t2 = t * t, t3 = t2 * t;

                const px = it3 * p0x + 3 * it2 * t * c1x + 3 * it * t2 * c2x + t3 * p1x;
                const py = it3 * p0y + 3 * it2 * t * c1y + 3 * it * t2 * c2y + t3 * p1y;

                const dx = 3 * it2 * (c1x - p0x) + 6 * it * t * (c2x - c1x) + 3 * t2 * (p1x - c2x);
                const dy = 3 * it2 * (c1y - p0y) + 6 * it * t * (c2y - c1y) + 3 * t2 * (p1y - c2y);
                const len = Math.hypot(dx, dy) || 1;
                const nx = -dy / len;
                const ny = dx / len;

                // 3D twist narrows ribbon width along its length
                const twist = totalTwistRad * t;
                const cosT = Math.cos(twist);

                // Projected half-width (minimum 0.75px for fabric thickness edge-on)
                const hwSigned = (w / 2) * cosT;
                const hwAbs = Math.max(0.75, Math.abs(hwSigned));

                pLeft.push({ x: px + nx * hwAbs, y: py + ny * hwAbs });
                pRight.push({ x: px - nx * hwAbs, y: py - ny * hwAbs });

                // Stitch lines A and B corkscrew across the faces in 3D
                const stitchDist = Math.max(0.4, Math.abs(hwSigned) - 1.8) * Math.sign(cosT || 1);
                pStitchA.push({ x: px + nx * stitchDist, y: py + ny * stitchDist });
                pStitchB.push({ x: px - nx * stitchDist, y: py - ny * stitchDist });

                pCenter.push({ x: px, y: py });

                // Crossover pinch point record
                if (hasCrossover && Math.abs(t - tCrossover) < (0.6 / N)) {
                    creasePtL = { x: px + nx * hwAbs, y: py + ny * hwAbs };
                    creasePtR = { x: px - nx * hwAbs, y: py - ny * hwAbs };
                }
            }

            // Construct SVG path strings
            let dStrap = 'M ' + pLeft[0].x.toFixed(1) + ' ' + pLeft[0].y.toFixed(1);
            let dShadow = 'M ' + pLeft[0].x.toFixed(1) + ' ' + (pLeft[0].y + 4).toFixed(1);
            for (let i = 1; i <= N; i++) {
                dStrap += ' L ' + pLeft[i].x.toFixed(1) + ' ' + pLeft[i].y.toFixed(1);
                dShadow += ' L ' + pLeft[i].x.toFixed(1) + ' ' + (pLeft[i].y + 4).toFixed(1);
            }
            for (let i = N; i >= 0; i--) {
                dStrap += ' L ' + pRight[i].x.toFixed(1) + ' ' + pRight[i].y.toFixed(1);
                dShadow += ' L ' + pRight[i].x.toFixed(1) + ' ' + (pRight[i].y + 4).toFixed(1);
            }
            dStrap += ' Z';
            dShadow += ' Z';

            // Reverse face segment when twisted past 90 degrees
            let dBack = '';
            if (hasCrossover) {
                const startIdx = Math.floor(tCrossover * N);
                dBack = 'M ' + pLeft[startIdx].x.toFixed(1) + ' ' + pLeft[startIdx].y.toFixed(1);
                for (let i = startIdx + 1; i <= N; i++) {
                    dBack += ' L ' + pLeft[i].x.toFixed(1) + ' ' + pLeft[i].y.toFixed(1);
                }
                for (let i = N; i >= startIdx; i--) {
                    dBack += ' L ' + pRight[i].x.toFixed(1) + ' ' + pRight[i].y.toFixed(1);
                }
                dBack += ' Z';
            }

            let dStitchA = 'M ' + pStitchA[0].x.toFixed(1) + ' ' + pStitchA[0].y.toFixed(1);
            let dStitchB = 'M ' + pStitchB[0].x.toFixed(1) + ' ' + pStitchB[0].y.toFixed(1);
            let dCenter = 'M ' + pCenter[0].x.toFixed(1) + ' ' + pCenter[0].y.toFixed(1);

            for (let i = 1; i <= N; i++) {
                dStitchA += ' L ' + pStitchA[i].x.toFixed(1) + ' ' + pStitchA[i].y.toFixed(1);
                dStitchB += ' L ' + pStitchB[i].x.toFixed(1) + ' ' + pStitchB[i].y.toFixed(1);
                dCenter += ' L ' + pCenter[i].x.toFixed(1) + ' ' + pCenter[i].y.toFixed(1);
            }

            strapPath.setAttribute('d', dStrap);
            if (shadowPath) shadowPath.setAttribute('d', dShadow);
            if (strapBackPath) strapBackPath.setAttribute('d', dBack);
            if (stitchLeft) stitchLeft.setAttribute('d', dStitchA);
            if (stitchRight) stitchRight.setAttribute('d', dStitchB);
            if (tensionPath) {
                tensionPath.setAttribute('d', dCenter);
                const tensionOpacity = Math.max(0, Math.min(0.85, (s - 1) * 2.5));
                tensionPath.style.opacity = tensionOpacity;
            }

            if (creasePath) {
                if (creasePtL && creasePtR) {
                    creasePath.setAttribute('d', 'M ' + creasePtL.x.toFixed(1) + ' ' + creasePtL.y.toFixed(1) + ' L ' + creasePtR.x.toFixed(1) + ' ' + creasePtR.y.toFixed(1));
                    creasePath.style.opacity = '0.75';
                } else {
                    creasePath.setAttribute('d', '');
                    creasePath.style.opacity = '0';
                }
            }
        }

        function updateAssemblyTransform() {
            const totalRotY = rotY + curMouseTiltY;
            const totalRotX = rotX + curMouseTiltX;

            // Unified assembly in 3D perspective
            cardAssembly.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotateZ(${(theta * 180 / Math.PI).toFixed(2)}deg) rotateY(${totalRotY.toFixed(2)}deg) rotateX(${totalRotX.toFixed(2)}deg)`;

            // Card face rotation in frame sync
            flipContainer.style.transform = `rotateY(${curFlipAngle.toFixed(2)}deg)`;

            // Hardware rotation in frame sync with ribbon and card
            if (hardware) {
                hardware.style.transform = `translateX(-50%) rotateY(${curFlipAngle.toFixed(2)}deg)`;
            }

            // Ribbon continuously deforms and twists in lockstep
            renderRibbon(x, y, theta, totalRotY, curFlipAngle);
        }

        function toggleFlip() {
            if (isDragging) return;
            isFlipped = !isFlipped;
            targetFlipAngle = isFlipped ? 180 : 0;
        }

        // Pointer Drag & Interaction
        flipContainer.addEventListener('pointerdown', (e) => {
            if (reducedMotion) return;
            pointerDown = true;
            dragMoved = false;
            startPointerX = e.clientX;
            startPointerY = e.clientY;

            const anchorRect = anchor.getBoundingClientRect();
            grabOffsetX = e.clientX - (anchorRect.left + ANCHOR_P0_X + x);
            grabOffsetY = e.clientY - (anchorRect.top + y);

            pointerHistory = [{ t: performance.now(), x: e.clientX, y: e.clientY }];

            if (flipContainer.setPointerCapture) {
                try { flipContainer.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
            }
        });

        window.addEventListener('pointermove', (e) => {
            if (!pointerDown) {
                // Interactive hover 3D tilt
                if (!reducedMotion) {
                    const rect = flipContainer.getBoundingClientRect();
                    const pad = 80;
                    const inside = e.clientX >= rect.left - pad && e.clientX <= rect.right + pad &&
                                   e.clientY >= rect.top - pad && e.clientY <= rect.bottom + pad;
                    if (inside) {
                        const cx = rect.left + rect.width / 2;
                        const cy = rect.top + rect.height / 2;
                        mouseTiltX = -((e.clientY - cy) / (rect.height / 2)) * 7;
                        mouseTiltY = ((e.clientX - cx) / (rect.width / 2)) * 9;
                    } else {
                        mouseTiltX = 0; mouseTiltY = 0;
                    }
                }
                return;
            }

            const distFromStart = Math.hypot(e.clientX - startPointerX, e.clientY - startPointerY);
            if (!isDragging && distFromStart > DRAG_THRESHOLD) {
                isDragging = true;
                dragMoved = true;
                entering = false;
                cardAssembly.classList.add('is-dragging');
                anchor.classList.add('is-dragging');
            }

            if (isDragging) {
                const anchorRect = anchor.getBoundingClientRect();
                const rawX = e.clientX - grabOffsetX - (anchorRect.left + ANCHOR_P0_X);
                const rawY = e.clientY - grabOffsetY - anchorRect.top;

                // Keep card below mounting ring at navbar
                let targetY = Math.max(38, rawY);

                // Horizontal screen boundaries
                const minX = -(anchorRect.left + ANCHOR_P0_X) + (cardWidth / 2) + 10;
                const maxX = window.innerWidth - (anchorRect.left + ANCHOR_P0_X) - (cardWidth / 2) - 10;
                let targetX = Math.max(minX, Math.min(maxX, rawX));

                // Sensible elastic stretch resistance (allows generous dragging up to 550px+)
                const curDist = Math.hypot(targetX, targetY - ANCHOR_P0_Y);
                const maxFree = 520;
                if (curDist > maxFree) {
                    const excess = curDist - maxFree;
                    const clampedDist = maxFree + 75 * Math.tanh(excess / 75);
                    const scale = clampedDist / curDist;
                    targetX *= scale;
                    targetY = ANCHOR_P0_Y + (targetY - ANCHOR_P0_Y) * scale;
                }

                x = targetX;
                y = targetY;

                // Card tilts in direction of drag
                const targetTheta = Math.atan2(x, y - ANCHOR_P0_Y) * 0.85;
                theta += (targetTheta - theta) * 0.35;

                // Pointer velocity tracking for release momentum
                const now = performance.now();
                pointerHistory.push({ t: now, x: e.clientX, y: e.clientY });
                if (pointerHistory.length > 5) pointerHistory.shift();
            }
        });

        function handlePointerUp() {
            if (!pointerDown) return;
            pointerDown = false;

            if (isDragging) {
                isDragging = false;
                cardAssembly.classList.remove('is-dragging');
                anchor.classList.remove('is-dragging');

                // Compute release momentum from pointer history
                let relVx = 0, relVy = 0;
                if (pointerHistory.length >= 2) {
                    const first = pointerHistory[0];
                    const last = pointerHistory[pointerHistory.length - 1];
                    const dt = Math.max(0.008, (last.t - first.t) / 1000);
                    relVx = (last.x - first.x) / dt;
                    relVy = (last.y - first.y) / dt;
                }

                // Clamped release velocity
                vx = Math.max(-2400, Math.min(2400, relVx));
                vy = Math.max(-2400, Math.min(2400, relVy));

                // Card angular momentum
                omega = (vx / 80) * 8;
                vRotY = (vx / 90) * 6;
                vRotX = -(vy / 90) * 5;
            }
        }

        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('pointercancel', handlePointerUp);

        flipContainer.addEventListener('click', () => {
            if (!dragMoved && !isDragging) toggleFlip();
        });

        flipContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFlip();
            }
        });

        flipContainer.addEventListener('mouseenter', () => { isHovered = true; });
        flipContainer.addEventListener('mouseleave', () => {
            isHovered = false;
            mouseTiltX = 0;
            mouseTiltY = 0;
        });

        // Image load: hide then fade in on load
        const cardImages = flipContainer.querySelectorAll('img');
        cardImages.forEach((img) => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.7s ease';
            const show = () => { img.style.opacity = '1'; };
            img.addEventListener('load', show, { once: true });
            if (img.complete) show();
        });

        // Main Physics & Animation Loop
        function loop() {
            const now = performance.now();
            let dt = (now - lastTime) / 1000;
            if (dt > 0.033) dt = 0.033;
            if (dt < 0.001) dt = 0.001;
            lastTime = now;

            if (!reducedMotion && !isDragging) {
                if (entering) {
                    // Entrance drop: spring downwards from above navbar
                    const rx = x;
                    const ry = y - ANCHOR_P0_Y;
                    const dist = Math.hypot(rx, ry) || 1;
                    const ux = rx / dist;
                    const uy = ry / dist;

                    let fx = 0, fy = G;
                    if (dist > L0) {
                        const deltaL = dist - L0;
                        const vRadial = vx * ux + vy * uy;
                        const fTension = K_STRETCH * deltaL + C_RADIAL_DAMP * vRadial;
                        fx -= fTension * ux;
                        fy -= fTension * uy;
                    }
                    fx -= C_AIR * vx;
                    fy -= C_AIR * vy;

                    vx += fx * dt;
                    vy += fy * dt;
                    x += vx * dt;
                    y += vy * dt;

                    const targetTheta = Math.atan2(rx, ry);
                    const torque = -K_ROT * (theta - targetTheta) - 0.035 * fx - C_ROT * omega;
                    omega += torque * dt;
                    theta += omega * dt;

                    // When settled near rest, transition to normal mode
                    if (Math.abs(y - (ANCHOR_P0_Y + restLanyardLen)) < 1.0 && Math.abs(vy) < 2.0 && Math.abs(vx) < 2.0) {
                        entering = false;
                    }
                } else {
                    // Full elastic pendulum physics
                    const rx = x;
                    const ry = y - ANCHOR_P0_Y;
                    const dist = Math.hypot(rx, ry) || 1;
                    const ux = rx / dist;
                    const uy = ry / dist;

                    let fx = 0;
                    let fy = G;

                    if (dist > L0) {
                        const deltaL = dist - L0;
                        const vRadial = vx * ux + vy * uy;
                        // Non-linear spring tension + radial damping
                        const fSpring = K_STRETCH * deltaL + 0.08 * deltaL * deltaL;
                        const fRadialDamp = C_RADIAL_DAMP * vRadial;
                        const fTension = fSpring + fRadialDamp;
                        fx -= fTension * ux;
                        fy -= fTension * uy;
                    } else if (y < 40) {
                        // Soft barrier below navbar
                        fy += (40 - y) * 20;
                    }

                    // Air drag
                    fx -= C_AIR * vx;
                    fy -= C_AIR * vy;

                    // Position integration
                    vx += fx * dt;
                    vy += fy * dt;
                    x += vx * dt;
                    y += vy * dt;

                    // Rotational pendulum torque & lateral inertial lag
                    const targetTheta = Math.atan2(rx, ry);
                    const torque = -K_ROT * (theta - targetTheta) - 0.035 * fx - C_ROT * omega;
                    omega += torque * dt;
                    theta += omega * dt;

                    // 3D Torsion (Yaw / Twist)
                    const targetRotY = (vx * 0.03) + (omega * 8);
                    const torqueY = -28 * rotY - 5.5 * vRotY + targetRotY * 16;
                    vRotY += torqueY * dt;
                    rotY += vRotY * dt;

                    // 3D Pitch (Tilt X)
                    const targetRotX = -(vy * 0.015);
                    const torqueX = -32 * rotX - 6.0 * vRotX + targetRotX * 14;
                    vRotX += torqueX * dt;
                    rotX += vRotX * dt;

                    // Check if settled into resting equilibrium
                    const targetRestY = ANCHOR_P0_Y + restLanyardLen + (isHovered ? 8 : 0);
                    const isNearRest = Math.hypot(vx, vy) < 1.8 &&
                                       Math.abs(x) < 1.0 &&
                                       Math.abs(y - targetRestY) < 1.5 &&
                                       Math.abs(omega) < 0.06 &&
                                       Math.abs(theta) < 0.02;

                    if (isNearRest) {
                        // Gentle ambient idle sway (breathing pendulum)
                        idleTime += dt * 1.5;
                        const idleAngle = Math.sin(idleTime) * 0.016; // ~0.9 degrees
                        const idleX = Math.sin(idleTime) * 2.8;
                        const idleY = targetRestY + Math.cos(idleTime * 2) * 0.5;

                        x += (idleX - x) * 0.06;
                        y += (idleY - y) * 0.06;
                        theta += (idleAngle - theta) * 0.06;
                        rotY += (Math.sin(idleTime * 0.7) * 2.5 - rotY) * 0.06;
                        rotX += (-rotX) * 0.06;

                        vx *= 0.85;
                        vy *= 0.85;
                        omega *= 0.85;
                    }
                }
            }

            // Smooth mouse tilt on hover
            curMouseTiltX += (mouseTiltX - curMouseTiltX) * 0.14;
            curMouseTiltY += (mouseTiltY - curMouseTiltY) * 0.14;

            // Synchronized 3D Flip Spring integration
            if (!reducedMotion) {
                const flipDiff = targetFlipAngle - curFlipAngle;
                const aFlip = K_FLIP * flipDiff - C_FLIP * vFlipAngle;
                vFlipAngle += aFlip * dt;
                curFlipAngle += vFlipAngle * dt;
                if (Math.abs(flipDiff) < 0.05 && Math.abs(vFlipAngle) < 0.05) {
                    curFlipAngle = targetFlipAngle;
                    vFlipAngle = 0;
                }
            } else {
                curFlipAngle = targetFlipAngle;
                vFlipAngle = 0;
            }

            updateAssemblyTransform();
            rafId = requestAnimationFrame(loop);
        }

        if (reducedMotion) {
            cancelAnimationFrame(rafId);
            x = 0;
            y = ANCHOR_P0_Y + restLanyardLen;
            theta = 0;
            rotY = 0;
            rotX = 0;
            curMouseTiltX = 0;
            curMouseTiltY = 0;
            updateAssemblyTransform();
        } else {
            rafId = requestAnimationFrame(loop);
        }

        window.addEventListener('beforeunload', () => {
            cancelAnimationFrame(rafId);
        });
    })();

});
