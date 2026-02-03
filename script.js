function moveButton() {
    const noBtn = document.getElementById('noBtn');
    
    // Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Get window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Get current position
    let currentX = noBtn.offsetLeft;
    let currentY = noBtn.offsetTop;

    // Calculate a "Short Hop" (move between 100px and 300px away)
    const angle = Math.random() * 2 * Math.PI;
    const distance = 150 + Math.random() * 150; 

    let newX = currentX + Math.cos(angle) * distance;
    let newY = currentY + Math.sin(angle) * distance;

    // BOUNDARY CHECK: Ensure it stays ON screen
    if (newX < 0) newX = 20;
    if (newX > windowWidth - btnWidth) newX = windowWidth - btnWidth - 20;
    
    if (newY < 0) newY = 20;
    if (newY > windowHeight - btnHeight) newY = windowHeight - btnHeight - 20;

    // Apply new position
    noBtn.style.position = 'absolute';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    
    // Clear margins so the precise top/left positioning works
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
