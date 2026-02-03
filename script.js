function moveButton() {
    const noBtn = document.getElementById('noBtn');
    
    // Get window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate random position
    // We subtract button size to keep it inside the window
    const randomX = Math.random() * (windowWidth - btnWidth);
    const randomY = Math.random() * (windowHeight - btnHeight);

    // Apply new position
    noBtn.style.position = 'fixed'; // Switch to fixed to move anywhere on screen
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

function nextPage() {
    // Hide the question screen
    document.getElementById('question-screen').classList.add('hidden');
    
    // Show the success screen
    document.getElementById('success-screen').classList.remove('hidden');
    
    // Optional: Add simple confetti effect
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
        
        // Add animation keyframes dynamically
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fall {
                to { transform: translateY(100vh) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}
