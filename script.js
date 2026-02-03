const noBtn = document.getElementById("noBtn");
const placeholder = document.querySelector(".placeholder");

window.addEventListener("load", () => {
    const rect = placeholder.getBoundingClientRect();
    noBtn.style.left = rect.left + "px";
    noBtn.style.top = rect.top + "px";
});

document.addEventListener("mousemove", (e) => {
    const rect = noBtn.getBoundingClientRect();

    const dx = rect.left + rect.width / 2 - e.clientX;
    const dy = rect.top + rect.height / 2 - e.clientY;
    const dist = Math.hypot(dx, dy);

    if (dist < 160) {
        let x = rect.left + (dx / dist) * 20;
        let y = rect.top + (dy / dist) * 20;

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
