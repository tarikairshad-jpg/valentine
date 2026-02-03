window.addEventListener("load", () => {
    const noBtn = document.getElementById("noBtn");
    const rect = noBtn.getBoundingClientRect();
    noBtn.style.position = "fixed";
    noBtn.style.left = rect.left + "px";
    noBtn.style.top = rect.top + "px";
});

document.addEventListener("mousemove", (e) => {
    const noBtn = document.getElementById("noBtn");
    if (!noBtn) return;

    const rect = noBtn.getBoundingClientRect();

    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const dx = btnX - e.clientX;
    const dy = btnY - e.clientY;
    const distance = Math.hypot(dx, dy);

    if (distance < 180) {
        const move = 18;

        let newX = rect.left + (dx / distance) * move;
        let newY = rect.top + (dy / distance) * move;

        const padding = 12;
        newX = Math.max(padding, Math.min(window.innerWidth - rect.width - padding, newX));
        newY = Math.max(padding, Math.min(window.innerHeight - rect.height - padding, newY));

        noBtn.style.left = newX + "px";
        noBtn.style.top = newY + "px";
    }
});

function nextPage() {
    document.getElementById("question-screen").classList.add("hidden");
    document.getElementById("success-screen").classList.remove("hidden");
    createConfetti();
}

function createConfetti() {
    const colors = ["#ff4d4d", "#ff9999", "#ffcccc"];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-10px";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        document.body.appendChild(confetti);
    }

    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes fall {
            to { transform: translateY(100vh) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}
