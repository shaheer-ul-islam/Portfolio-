/**
 * Resume Section Effects
 * 1. Scramble Text Effect
 * 2. Staggered Entry Animation
 */

document.addEventListener("DOMContentLoaded", () => {

    // --- Scramble Effect ---
    const scrambleElements = document.querySelectorAll(".scramble-target");
    const chars = "!<>-_\\/[]{}—=+*^?#________";

    const scrambleText = (el) => {
        const originalText = el.dataset.text || el.innerText;
        let iteration = 0;

        // Store original text if not already stored
        if (!el.dataset.text) el.dataset.text = originalText;

        clearInterval(el.interval);

        el.interval = setInterval(() => {
            el.innerText = originalText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(el.interval);
            }

            iteration += 1 / 3; // Speed of decoding
        }, 30);
    };

    const scrambleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scrambleText(entry.target);
                scrambleObserver.unobserve(entry.target); // Run once (scroll)
            }
        });
    }, { threshold: 0.5 });

    scrambleElements.forEach(el => {
        scrambleObserver.observe(el);

        // Add Hover Effect (Re-Scramble)
        el.addEventListener("mouseenter", () => {
            scrambleText(el);
        });
    });


    // --- Resume Item Stagger ---
    const resumeItems = document.querySelectorAll(".resume-item");

    const resumeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index relative to current batch? 
                // Simple approach: just add class. CSS handles transition.
                // For stagger, we can set style transition-delay.
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 100); // This index is per-entry-batch, usually 1

                resumeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    resumeItems.forEach((item, index) => {
        // Add staggered delay via inline style for cleaner cascading
        // We can't rely on entry index above for full page stagger, but sequential scroll is fine.
        // Let's just use the delay in JS logic or CSS.
        // Adding class is easiest.
        resumeObserver.observe(item);
    });
});
