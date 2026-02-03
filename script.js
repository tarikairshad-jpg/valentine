const noBtn = document.getElementById("noBtn");

document.addEventListener("mousemove", (e) => {
    const rect = noBtn.getBoundingClientRect();

    // Calculate distance from center of button
    const dx = rect.left + rect.width / 2 - e.clientX;
    const dy = rect.top + rect.height / 2 - e.clientY;
    const dist = Math.hypot(dx, dy);

    // If mouse is close (within 200px)
    if (dist < 200) {
        
        // 1. Convert to fixed position if it isn't already
        // This stops it from being stuck in the layout
        if (noBtn.style.position !== "fixed") {
            noBtn.style.position = "fixed";
            noBtn.style.left = rect.left + "px";
            noBtn.style.top = rect.top + "px";
        }

        // 2. Calculate "Away" direction
        // We move it 20 pixels away in the direction of the mouse
        let x = rect.left + (dx / dist) * 20;
        let y = rect.top + (dy / dist) * 20;

        // 3. Keep inside screen (Padding 20px)
        const pad = 20;
        x = Math.max(pad, Math.min(window.innerWidth - rect.width - pad, x));
        y = Math.max(pad, Math.min(window.innerHeight - rect.height - pad, y));

        // 4. Apply new position
        noBtn.style.left = x + "px";
        noBtn.style.top = y + "px";
    }
});

function nextPage() {
    document.getElementById("question-screen").classList.add("hidden");
    document.getElementById("success-screen").classList.remove("hidden");
}
