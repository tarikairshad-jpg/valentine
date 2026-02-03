const noBtn = document.getElementById("noBtn");

document.addEventListener("mousemove", (e) => {
    const rect = noBtn.getBoundingClientRect();

    // Calculate distance from center
    const dx = rect.left + rect.width / 2 - e.clientX;
    const dy = rect.top + rect.height / 2 - e.clientY;
    const dist = Math.hypot(dx, dy);

    // Trigger movement if close
    if (dist < 160) {
        // 1. Switch to fixed if not already (allows free floating)
        if (noBtn.style.position !== "fixed") {
            noBtn.style.position = "fixed";
            noBtn.style.left = rect.left + "px";
            noBtn.style.top = rect.top + "px";
        }

        // 2. Move away logic (Your original math)
        let x = rect.left + (dx / dist) * 20;
        let y = rect.top + (dy / dist) * 20;

        // 3. Keep on screen
        const pad = 10;
        x = Math.max(pad, Math.min(window.innerWidth - rect.width - pad, x));
        y = Math.max(pad, Math.min(window.innerHeight - rect.height - pad, y));

        noBtn.style.left = x + "px";
        noBtn.style.top = y + "px";
    }
});

function nextPage() {
    document.getElementById("question-screen").classList.add("hidden");
    document.getElementById("success-screen").classList.remove("hidden");
}
