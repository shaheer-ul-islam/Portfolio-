document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const handsContainer = document.getElementById("hands-animation");

    // observe both About and Skills
    const targetSections = document.querySelectorAll(".about, #skills");

    const activeSections = new Set();

    if (targetSections.length === 0) {
        console.warn("Theme Scroll: No sections found.");
        return;
    }

    const observerOptions = {
        root: null,
        threshold: 0.1, // Trigger earlier to blend seamless
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSections.add(entry.target);
            } else {
                activeSections.delete(entry.target);
            }
        });

        // Toggle State based on if ANY section is active
        if (activeSections.size > 0) {
            body.classList.add("dark-mode");
            if (handsContainer) handsContainer.classList.add("active");
        } else {
            body.classList.remove("dark-mode");
            if (handsContainer) handsContainer.classList.remove("active");
        }

    }, observerOptions);

    targetSections.forEach(section => observer.observe(section));
});
