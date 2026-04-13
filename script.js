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

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
        applyTheme(nextTheme);
    });

    function applyTheme(theme) {
        const isLight = theme === 'light';
        document.body.classList.toggle('light-theme', isLight);
        themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
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
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
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

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Analyzing...</span>';

        const inputVector = buildInputVector(data.message || '');
        const prediction = urgencyNeuron.predict(inputVector);
        const urgency = prediction.output === 1 ? 'high' : 'normal';

        setTimeout(() => {
            formStatus.textContent = `Local analysis complete. Detected urgency: ${urgency.toUpperCase()}. Sending message...`;
            formStatus.classList.remove('error');
            formStatus.classList.add('success');
            
            // Create a new form to submit to Formspree with the urgency info
            const formspreeForm = document.createElement('form');
            formspreeForm.action = 'https://formspree.io/f/xeevqpwe';
            formspreeForm.method = 'POST';
            formspreeForm.style.display = 'none';
            
            // Add all form fields
            Object.keys(data).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = data[key];
                formspreeForm.appendChild(input);
            });
            
            // Add urgency analysis
            const urgencyInput = document.createElement('input');
            urgencyInput.type = 'hidden';
            urgencyInput.name = 'urgency_level';
            urgencyInput.value = urgency;
            formspreeForm.appendChild(urgencyInput);
            
            document.body.appendChild(formspreeForm);
            formspreeForm.submit();
            
            // Reset original form
            contactForm.reset();
            submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Sent!</span>';
            
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.classList.remove('success');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }, 700);
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
            
            requestAnimationFrame(animateANN);
        }
        
        initANN();
        animateANN();
        
        window.addEventListener('resize', () => {
            if (annCanvas) {
                clearTimeout(window.resizeAnnTimer);
                window.resizeAnnTimer = setTimeout(initANN, 200);
            }
        });
    }

});
