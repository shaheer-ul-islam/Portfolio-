/**
 * Laser Flow Background Animation (Vanilla JS Canvas)
 * Mimics React Bits LaserFlow effect with moving horizontal/vertical beams.
 */

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('laser-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // Configuration
    const config = {
        beamColor: '#0563bb', // Accent Color
        beamWidth: 2,
        speed: 1.5,
        beamCount: 15,
        glowBlur: 15
    };

    let beams = [];

    class Beam {
        constructor(isHorizontal) {
            this.isHorizontal = isHorizontal;
            this.active = true;
            this.init();
        }

        init() {
            if (this.isHorizontal) {
                this.y = Math.random() * height;
                this.x = Math.random() < 0.5 ? -100 : width + 100;
                this.vx = (Math.random() < 0.5 ? 1 : -1) * (config.speed + Math.random());
                this.len = Math.random() * 300 + 100;
            } else {
                this.x = Math.random() * width;
                this.y = Math.random() < 0.5 ? -100 : height + 100;
                this.vy = (Math.random() < 0.5 ? 1 : -1) * (config.speed + Math.random());
                this.len = Math.random() * 300 + 100;
            }
            this.color = config.beamColor;
        }

        update() {
            if (this.isHorizontal) {
                this.x += this.vx;
                if ((this.vx > 0 && this.x > width + 200) || (this.vx < 0 && this.x < -200)) {
                    this.active = false; // Reset or recycle
                    this.init();
                }
            } else {
                this.y += this.vy;
                if ((this.vy > 0 && this.y > height + 200) || (this.vy < 0 && this.y < -200)) {
                    this.active = false;
                    this.init();
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.shadowBlur = config.glowBlur;
            ctx.shadowColor = this.color;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = config.beamWidth;

            if (this.isHorizontal) {
                // Gradient tail
                const grad = ctx.createLinearGradient(this.x, this.y, this.x - (this.len * Math.sign(this.vx)), this.y);
                grad.addColorStop(0, this.color);
                grad.addColorStop(1, 'transparent');
                ctx.strokeStyle = grad;

                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - (this.len * Math.sign(this.vx)), this.y);
            } else {
                const grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y - (this.len * Math.sign(this.vy)));
                grad.addColorStop(0, this.color);
                grad.addColorStop(1, 'transparent');
                ctx.strokeStyle = grad;

                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.y - (this.len * Math.sign(this.vy)));
            }
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
    }

    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;

        // Re-init beams if needed
        beams = [];
        for (let i = 0; i < config.beamCount; i++) {
            beams.push(new Beam(Math.random() > 0.5));
        }
    }

    window.addEventListener('resize', resize);
    resize();

    // Theme Awareness
    function updateTheme() {
        const isDark = document.body.classList.contains('dark-mode');
        if (isDark) {
            canvas.style.mixBlendMode = 'screen';
            canvas.style.opacity = '0.6';
            config.beamColor = '#0563bb'; // Bright Blue
        } else {
            canvas.style.mixBlendMode = 'multiply'; // Visible on white
            canvas.style.opacity = '0.4';
            config.beamColor = '#0563bb'; // Same blue, but darkens background
        }

        // Force refresh beam colors immediately
        beams.forEach(b => b.color = config.beamColor);
    }

    // Observe Body Class Changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Initial check
    updateTheme();


    function animate() {
        ctx.clearRect(0, 0, width, height);
        // Semi-transparent fade for tail effect? No, clean clear is better for lasers.

        beams.forEach(beam => {
            beam.update();
            beam.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
});
