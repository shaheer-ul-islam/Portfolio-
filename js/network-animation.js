/**
 * Neural Network Animation
 * Creates a canvas-based animation of connected nodes with flowing data pulses.
 */

const canvas = document.getElementById('neuro-network');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let pulses = [];

// Configuration
const config = {
    particleCount: 80, // Number of nodes
    connectionDistance: 150, // Max distance to connect nodes
    particleSpeed: 0.5, // Movement speed
    particleColor: 'rgba(5, 99, 187, 0.7)', // Accent color (matches CSS)
    lineColor: 'rgba(5, 99, 187, 0.2)',
    pulseSpeed: 2,
    pulseColor: '#0563bb' // Accent color
};

// Scroll Handler removed in favor of section-based styling

// Resize handling
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * config.particleSpeed;
        this.vy = (Math.random() - 0.5) * config.particleSpeed;
        this.size = Math.random() * 3 + 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = config.particleColor;
        ctx.fill();
    }
}

// Data Pulse Class (moves along connections)
class Pulse {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.progress = 0;
        this.speed = config.pulseSpeed / 100; // Normalized speed
        this.active = true;
    }

    update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
            this.active = false;
        }
    }

    draw() {
        if (!this.active) return;

        // Linear interpolation
        const x = this.start.x + (this.end.x - this.start.x) * this.progress;
        const y = this.start.y + (this.end.y - this.start.y) * this.progress;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = config.pulseColor;
        ctx.shadowBlur = 5;
        ctx.shadowColor = config.pulseColor;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// Initialize particles
function init() {
    particles = [];
    // Adjust particle count for smaller screens
    const count = window.innerWidth < 768 ? 40 : config.particleCount;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

init();

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Draw connections and spawn pulses
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < config.connectionDistance) {
                // Draw Line
                ctx.beginPath();
                ctx.strokeStyle = config.lineColor;
                ctx.lineWidth = 1 - dist / config.connectionDistance;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();

                // Randomly spawn a pulse
                if (Math.random() < 0.002) { // Chance to spawn pulse per frame per connection
                    pulses.push(new Pulse(p1, p2));
                }
            }
        }
    }

    // Update and draw pulses
    for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.update();
        pulse.draw();
        if (!pulse.active) {
            pulses.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

animate();
