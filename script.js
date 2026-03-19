// Sci-Fi HUD Animations

document.addEventListener("DOMContentLoaded", () => {
    // 1. Hacker / Scramble Text Effect for Headers
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ_*#@/[]";
    const scramblers = document.querySelectorAll(".scramble-text");

    scramblers.forEach(el => {
        el.addEventListener("mouseover", event => {
            let iteration = 0;
            const originalText = event.target.dataset.value || event.target.innerText;
            if (!event.target.dataset.value) event.target.dataset.value = originalText;

            clearInterval(event.target.scrambleInterval);

            event.target.scrambleInterval = setInterval(() => {
                event.target.innerText = originalText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) return originalText[index];
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");

                if (iteration >= originalText.length) {
                    clearInterval(event.target.scrambleInterval);
                }
                iteration += 1 / 3;
            }, 30);
        });
    });

    // 2. Dynamic Fake Data Generation
    // Add elements with class .sys-data to have their numbers randomly update
    const dataElements = document.querySelectorAll(".sys-data");

    setInterval(() => {
        dataElements.forEach(el => {
            const currentVal = parseFloat(el.innerText);
            if (!isNaN(currentVal)) {
                // Randomly fluctuate by a small percentage
                const fluctuation = (Math.random() - 0.5) * 5;
                el.innerText = (currentVal + fluctuation).toFixed(2);
            } else {
                // Generate random data string
                el.innerText = "SYS." + Math.floor(Math.random() * 9999);
            }
        });
    }, 1500);
});
