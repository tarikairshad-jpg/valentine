function moveButton() {
    const noBtn = document.getElementById('noBtn');
    
    // Get window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate random position but keep it within some padding
    const randomX = Math.random() * (windowWidth - btnWidth - 40) + 20;
    const randomY = Math.random() * (windowHeight - btnHeight - 40) + 20;

    // Apply new position
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
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
