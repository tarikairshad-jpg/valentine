let isAnimating = false;

document.addEventListener('mousemove', function(e) {
    const noBtn = document.getElementById('noBtn');
    
    if (!noBtn || noBtn.offsetParent === null) return;

    // Get button center
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    // Calculate distance to mouse
    const deltaX = e.clientX - btnCenterX;
    const deltaY = e.clientY - btnCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Trigger movement if mouse is within 150px
    if (distance < 150 && !isAnimating) {
        moveButtonAway(e.clientX, e.clientY);
        isAnimating = true;
        setTimeout(() => { isAnimating = false; }, 300);
    }
});

function moveButtonAway(mouseX, mouseY) {
    const noBtn = document.getElementById('noBtn');
    
    // 1. Switch to Fixed Positioning on first move
    // This allows us to move it anywhere on screen easily
    if (noBtn.style.position !== 'fixed') {
        const rect = noBtn.getBoundingClientRect();
        noBtn.style.position = 'fixed';
        noBtn.style.left = rect.left + 'px';
        noBtn.style.top = rect.top + 'px';
        // Clear margins that might interfere
        noBtn.style.margin = '0';
    }

    // 2. Calculate "Repulsion" Vector
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    let dirX = btnCenterX - mouseX;
    let dirY = btnCenterY - mouseY;

    // Normalize (make length 1)
    const length = Math.sqrt(dirX * dirX + dirY * dirY);
    if (length === 0) { dirX = 1; dirY = 0; }
    else { dirX /= length; dirY /= length; }

    // Move distance (jump 200px away)
    const moveDistance = 200;
    let newX = rect.left + (dirX * moveDistance);
    let newY = rect.top + (dirY * moveDistance);

    // 3. HARD Boundary Checks (Keep inside screen)
    const padding = 20; // Keep 20px from edge
    const btnWidth = rect.width;
    const btnHeight = rect.height;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // If it hits the Left/Right wall, clamp it
    if (newX < padding) newX = padding;
    if (newX + btnWidth > windowWidth - padding) newX = windowWidth - btnWidth - padding;
    
    // If it hits Top/Bottom wall, clamp it
    if (newY < padding) newY = padding;
    if (newY + btnHeight > windowHeight - padding) newY = windowHeight - btnHeight - padding;

    // Apply new coordinates
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
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
