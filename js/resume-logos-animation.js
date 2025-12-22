/**
 * Resume Section Programming Logos Animation
 * Shows programming logos with low opacity when cursor moves over resume section
 */

(function() {
  'use strict';

  const resumeSection = document.getElementById('resume');
  const logosOverlay = document.getElementById('resumeLogosOverlay');
  
  if (!resumeSection || !logosOverlay) return;

  const logos = logosOverlay.querySelectorAll('.programming-logo');
  let lastShowTime = 0;
  const showInterval = 2000; // Show logos every 2 seconds when moving cursor
  let mouseX = 0;
  let mouseY = 0;

  // Hide all logos initially
  logos.forEach(logo => {
    logo.style.opacity = '0';
    logo.style.transform = 'scale(0.8) translateY(20px)';
  });

  // Function to show random logos with cursor interaction
  function showRandomLogos(e) {
    const now = Date.now();
    if (now - lastShowTime < showInterval) return;
    
    lastShowTime = now;
    
    // Hide all logos first
    logos.forEach(logo => {
      logo.classList.remove('visible');
      logo.style.opacity = '0';
      logo.style.transform = 'scale(0.7) translateY(30px) rotate(-10deg)';
      logo.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    // Show 4-6 random logos for better visibility
    const numToShow = Math.floor(Math.random() * 3) + 4;
    const shuffled = Array.from(logos).sort(() => 0.5 - Math.random());
    const toShow = shuffled.slice(0, numToShow);

    toShow.forEach((logo, index) => {
      setTimeout(() => {
        const rect = resumeSection.getBoundingClientRect();
        let x, y;
        
        // Position logos around cursor if available, otherwise random
        if (e) {
          const relativeX = e.clientX - rect.left;
          const relativeY = e.clientY - rect.top;
          // Position in a circle around cursor
          const angle = (index / toShow.length) * Math.PI * 2;
          const radius = 150 + Math.random() * 100;
          x = relativeX + Math.cos(angle) * radius - 45;
          y = relativeY + Math.sin(angle) * radius - 45;
          
          // Keep within bounds
          x = Math.max(50, Math.min(rect.width - 100, x));
          y = Math.max(50, Math.min(rect.height - 100, y));
        } else {
          x = Math.random() * (rect.width - 100) + 50;
          y = Math.random() * (rect.height - 100) + 50;
        }
        
        logo.style.left = x + 'px';
        logo.style.top = y + 'px';
        logo.classList.add('visible');
        logo.style.opacity = '0.65';
        logo.style.transform = 'scale(1) translateY(0) rotate(0deg)';
        
        // Add progress bar animation with delay
        const progressBar = logo.querySelector('.logo-progress');
        if (progressBar) {
          const progress = Math.random() * 30 + 70; // 70-100%
          setTimeout(() => {
            progressBar.style.width = progress + '%';
          }, 300);
        }
      }, index * 80);
    });

    // Hide logos after 4 seconds
    setTimeout(() => {
      toShow.forEach(logo => {
        logo.classList.remove('visible');
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.7) translateY(30px) rotate(-10deg)';
      });
    }, 4000);
  }

  // Track mouse movement with cursor following
  let mouseMoveTimeout;
  resumeSection.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update visible logos position slightly towards cursor
    logos.forEach(logo => {
      if (logo.classList.contains('visible')) {
        const rect = resumeSection.getBoundingClientRect();
        const logoRect = logo.getBoundingClientRect();
        const logoCenterX = logoRect.left + logoRect.width / 2;
        const logoCenterY = logoRect.top + logoRect.height / 2;
        
        const dx = (e.clientX - logoCenterX) * 0.05;
        const dy = (e.clientY - logoCenterY) * 0.05;
        
        const currentLeft = parseFloat(logo.style.left) || 0;
        const currentTop = parseFloat(logo.style.top) || 0;
        
        logo.style.left = (currentLeft + dx) + 'px';
        logo.style.top = (currentTop + dy) + 'px';
      }
    });
    
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(() => {
      showRandomLogos(e);
    }, 300);
  });

  // Show logos on section enter
  resumeSection.addEventListener('mouseenter', (e) => {
    showRandomLogos(e);
  });

  // Hide all logos on section leave
  resumeSection.addEventListener('mouseleave', () => {
    logos.forEach(logo => {
      logo.classList.remove('visible');
      logo.style.opacity = '0';
      logo.style.transform = 'scale(0.7) translateY(30px) rotate(-10deg)';
    });
  });

  // Add hover effect to individual logos
  logos.forEach(logo => {
    logo.addEventListener('mouseenter', function() {
      this.style.pointerEvents = 'auto';
    });
  });

  // Draw connection lines between visible logos
  function drawConnections() {
    // Remove existing connection lines
    document.querySelectorAll('.logo-connection').forEach(line => line.remove());
    
    const visibleLogos = Array.from(logos).filter(logo => logo.classList.contains('visible'));
    
    if (visibleLogos.length < 2) return;
    
    visibleLogos.forEach((logo1, i) => {
      visibleLogos.slice(i + 1).forEach(logo2 => {
        const rect1 = logo1.getBoundingClientRect();
        const rect2 = logo2.getBoundingClientRect();
        const sectionRect = resumeSection.getBoundingClientRect();
        
        const x1 = rect1.left + rect1.width / 2 - sectionRect.left;
        const y1 = rect1.top + rect1.height / 2 - sectionRect.top;
        const x2 = rect2.left + rect2.width / 2 - sectionRect.left;
        const y2 = rect2.top + rect2.height / 2 - sectionRect.top;
        
        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        
        // Only connect if logos are close enough
        if (distance < 250) {
          const line = document.createElement('div');
          line.className = 'logo-connection';
          line.style.position = 'absolute';
          line.style.left = x1 + 'px';
          line.style.top = y1 + 'px';
          line.style.width = distance + 'px';
          line.style.height = '2px';
          line.style.background = `linear-gradient(90deg, 
            rgba(5, 99, 187, 0.3) 0%, 
            rgba(0, 212, 255, 0.5) 50%, 
            rgba(5, 99, 187, 0.3) 100%)`;
          line.style.transformOrigin = '0 50%';
          line.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI}deg)`;
          line.style.zIndex = '0';
          line.style.pointerEvents = 'none';
          line.style.boxShadow = '0 0 10px rgba(5, 99, 187, 0.3)';
          line.style.animation = 'connectionFlow 2s ease-in-out infinite';
          
          logosOverlay.appendChild(line);
        }
      });
    });
  }

  // Update connections when logos move
  let connectionUpdateInterval;
  resumeSection.addEventListener('mouseenter', () => {
    connectionUpdateInterval = setInterval(drawConnections, 100);
  });

  resumeSection.addEventListener('mouseleave', () => {
    if (connectionUpdateInterval) {
      clearInterval(connectionUpdateInterval);
    }
    document.querySelectorAll('.logo-connection').forEach(line => line.remove());
  });

  // Initial show after page load
  setTimeout(() => {
    if (document.querySelector('#resume:hover')) {
      showRandomLogos();
    }
  }, 1000);
})();

