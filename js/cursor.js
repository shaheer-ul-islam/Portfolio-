document.addEventListener("DOMContentLoaded", () => {
    const cursorDot = document.getElementById("cursor-dot");

    console.log("Cursor script loaded");

    let mouseX = 0;
    let mouseY = 0;

    // Track mouse position
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update main dot position immediately
        if (cursorDot) {
            cursorDot.style.left = mouseX + "px";
            cursorDot.style.top = mouseY + "px";
        }

        // Create Splash Effect
        createSplash(mouseX, mouseY);
    });

    function createSplash(x, y) {
        // Create multiple particles for "more visual" effect
        for (let i = 0; i < 3; i++) {
            const splash = document.createElement("div");
            splash.classList.add("cursor-splash");
            document.body.appendChild(splash);

            // Initial position
            splash.style.left = x + "px";
            splash.style.top = y + "px";

            // Larger scatter
            const randomX = (Math.random() - 0.5) * 60;
            const randomY = (Math.random() - 0.5) * 60;
            const randomSize = 6 + Math.random() * 8; // Random sizes

            splash.style.width = randomSize + "px";
            splash.style.height = randomSize + "px";

            splash.animate([
                { transform: `translate(-50%, -50%) translate(0px, 0px) scale(1)`, opacity: 0.8 },
                { transform: `translate(-50%, -50%) translate(${randomX}px, ${randomY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'ease-out',
                fill: 'forwards'
            });

            // Cleanup
            setTimeout(() => {
                splash.remove();
            }, 800);
        }
    }
});
