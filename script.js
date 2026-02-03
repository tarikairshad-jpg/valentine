let isAnimating = false;

document.addEventListener('mousemove', function(e) {
    const noBtn = document.getElementById('noBtn');
    
    if (!noBtn || noBtn.offsetParent === null) return;

    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
        Math.pow(e.clientX - btnCenterX, 2) + 
        Math.pow(e.clientY - btnCenterY, 2)
    );

    if (distance < 100 && !isAnimating) {
        moveButton();
        isAnimating = true;
        setTimeout(() => { isAnimating = false; }, 400);
    }
});

function moveButton() {
    const noBtn = document.getElementById('noBtn');
    
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let currentX = noBtn.offsetLeft;
    let currentY = noBtn.offsetTop;

    const angle = Math.random() * 2 * Math.PI;
    const jumpDistance = 150 + Math.random() * 100;

    let newX = currentX + Math.cos(angle) * jumpDistance;
    let newY = currentY + Math.sin(angle) * jumpDistance;

    const padding = 50;

    if (newX < padding) newX = padding;
    if (newX > windowWidth - btnWidth - padding) newX = windowWidth - btnWidth - padding;
    
    if (newY < padding) newY = padding;
    if (newY > windowHeight - btnHeight - padding) newY = windowHeight - btnHeight - padding;

    noBtn.style.position = 'absolute';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    
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
