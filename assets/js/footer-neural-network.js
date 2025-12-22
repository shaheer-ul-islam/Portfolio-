/**
 * Footer Neural Network Animation
 * Creates a canvas-based neural network animation for the footer
 */

(function() {
  'use strict';

  const canvas = document.getElementById('footer-neural-network');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let connections = [];

  // Configuration
  const config = {
    particleCount: 50,
    connectionDistance: 120,
    particleSpeed: 0.3,
    particleColor: 'rgba(0, 255, 0, 0.6)',
    lineColor: 'rgba(0, 255, 0, 0.15)',
    pulseColor: 'rgba(0, 212, 255, 0.8)'
  };

  // Resize handling
  function resize() {
    const footer = canvas.parentElement;
    if (footer) {
      width = canvas.width = footer.offsetWidth;
      height = canvas.height = footer.offsetHeight;
    }
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
      this.size = Math.random() * 2 + 1;
      this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Keep particles in bounds
      this.x = Math.max(0, Math.min(width, this.x));
      this.y = Math.max(0, Math.min(height, this.y));

      this.pulse += 0.05;
    }

    draw() {
      const pulseSize = this.size + Math.sin(this.pulse) * 0.5;
      ctx.beginPath();
      ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = config.particleColor;
      ctx.fill();
      
      // Glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = config.particleColor;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Initialize particles
  function initParticles() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Draw connections
  function drawConnections() {
    connections = [];
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.connectionDistance) {
          const opacity = (1 - distance / config.connectionDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 255, 0, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          
          connections.push({
            from: particles[i],
            to: particles[j],
            distance: distance,
            opacity: opacity
          });
        }
      }
    }
  }

  // Draw data pulses along connections
  function drawPulses() {
    const time = Date.now() * 0.001;
    connections.forEach((conn, index) => {
      const pulseProgress = (time * 0.5 + index * 0.1) % 1;
      const pulseX = conn.from.x + (conn.to.x - conn.from.x) * pulseProgress;
      const pulseY = conn.from.y + (conn.to.y - conn.from.y) * pulseProgress;
      
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
      ctx.fillStyle = config.pulseColor;
      ctx.shadowBlur = 8;
      ctx.shadowColor = config.pulseColor;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw connections
    drawConnections();

    // Draw pulses
    drawPulses();

    requestAnimationFrame(animate);
  }

  // Initialize and start
  initParticles();
  animate();

  // Reinitialize on resize
  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
})();

