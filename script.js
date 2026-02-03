let isAnimating = false;

document.addEventListener('mousemove', function(e) {
    const noBtn = document.getElementById('noBtn');
    
    if (!noBtn || noBtn.offsetParent === null) return;

    // Get button center
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    // Calculate distance
    const deltaX = e.clientX - btnCenterX;
    const deltaY = e.clientY - btnCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // INCREASED Proximity: Now triggers at 200px (was 100px)
    if (distance < 200 && !isAnimating) {
        moveButtonAway(e.clientX, e.clientY);
        isAnimating = true;
        // Shorter lock (300ms) makes it feel more responsive
        setTimeout(() => { isAnimating = false; }, 300);
    }
});

function moveButtonAway(mouseX, mouseY) {
    const noBtn = document.getElementById('noBtn');
    
    // Get current position (pixels)
    // We use offsetLeft/Top to get relative to parent, which works well with absolute positioning
    let currentX = noBtn.offsetLeft;
    let currentY = noBtn.offsetTop;

    // Get Button Center again for calculation
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    // Calculate vector FROM mouse TO button (Repulsion)
    let dirX = btnCenterX - mouseX;
    let dirY = btnCenterY - mouseY;

    // Normalize vector (length 1)
    const length = Math.sqrt(dirX * dirX + dirY * dirY);
    if (length === 0) { dirX = 1; dirY = 0; } // Prevent division by zero
    else { dirX /= length; dirY /= length; }

    // Move by a fixed distance (e.g., 150px)
    const moveDistance = 150;
    let newX = currentX + (dirX * moveDistance);
    let newY = currentY + (dirY * moveDistance);

    // STRICT BOUNDARIES
    const padding = 100; // Increased padding to keep it well on screen
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Clamp X
    if (newX < padding) newX = padding;
    if (newX > windowWidth - btnWidth - padding) newX = windowWidth - btnWidth - padding;
    
    // Clamp Y
    if (newY < padding) newY = padding;
    if (newY > windowHeight - btnHeight - padding) newY = windowHeight - btnHeight - padding;

    // Apply
    noBtn.style.position = 'absolute';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    
    // Clear margins so the smooth transition works from center
    noBtn.style.marginLeft = '0';
    noBtn.style.marginTop = '0';
}

function nextPage() {
    document.getElementById('question-screen').classList.add('hidden');
    document.getElementById('success-screen').classList.remove('hidden');
    createConfetti();
}

function createConfetti() {
    const colors = ['#ff4d4d', '#ff9999', '#ffcccd'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
    }
    
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall {
            to { transform: translateY(100vh) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}
