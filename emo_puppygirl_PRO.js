// ===== CONFIG =====
const CONFIG = {
    starCount: 24,
    pawCount: 12,
    trailCount: 8,
    starCharacters: ['✧', '☆', '⋆', '･'],
    colors: [
        '#ff9ff3', '#feca57', '#ff6b6b', 
        '#48dbfb', '#1dd1a1', '#f368e0'
    ]
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return; // Skip animations if user prefers reduced motion
    }

    initDynamicElements();
    initCursorTrail();
});

// ===== DYNAMIC ELEMENTS =====
function initDynamicElements() {
    const container = document.querySelector('.dynamic-elements');
    
    // Create stars
    for (let i = 0; i < CONFIG.starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.innerHTML = CONFIG.starCharacters[i % CONFIG.starCharacters.length];
        star.style.setProperty('--color', CONFIG.colors[i % CONFIG.colors.length]);
        star.style.setProperty('--delay', `${i * 0.3}s`);
        star.style.setProperty('--duration', `${8 + Math.random() * 4}s`);
        star.style.left = `${Math.random() * 90 + 5}%`;
        star.style.top = `${Math.random() * 90 + 5}%`;
        container.appendChild(star);
    }
    
    // Create paws
    for (let i = 0; i < CONFIG.pawCount; i++) {
        const paw = document.createElement('div');
        paw.className = 'floating-paw';
        paw.innerHTML = '🐾';
        paw.style.setProperty('--delay', `${i * 2}s`);
        paw.style.left = `${Math.random() * 90 + 5}%`;
        container.appendChild(paw);
    }
}

// ===== CURSOR TRAIL =====
function initCursorTrail() {
    const trailContainer = document.querySelector('.cursor-trail');
    const trailElements = [];
    
    // Create trail elements
    for (let i = 0; i < CONFIG.trailCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail__dot';
        dot.style.setProperty('--size', `${20 - (i * 2)}px`);
        dot.style.setProperty('--opacity', `${1 - (i * 0.12)}`);
        dot.innerHTML = '🐾';
        trailContainer.appendChild(dot);
        trailElements.push(dot);
    }
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let lastFrameTime = performance.now();
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth trail animation
    function updateTrail(time) {
        const deltaTime = time - lastFrameTime;
        lastFrameTime = time;
        
        trailElements.forEach((dot, i) => {
            const delay = i * 15;
            setTimeout(() => {
                dot.style.left = `${mouseX - 10 + (i * 0.5)}px`;
                dot.style.top = `${mouseY - 10 + (i * 0.5)}px`;
            }, delay);
        });
        
        requestAnimationFrame(updateTrail);
    }
    
    requestAnimationFrame(updateTrail);
}