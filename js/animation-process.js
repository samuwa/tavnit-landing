// ==========================================
// PROCESS ANIMATION - POWERED BY ANIME.JS
// Elegant, smooth animation showing data flow
// ==========================================

function initProcessAnimation() {
  const container = document.getElementById('process-animation-container');
  if (!container || container.dataset.animationInitialized) return;

  // Wait for anime.js to load
  if (typeof anime === 'undefined') {
    setTimeout(() => initProcessAnimation(), 100);
    return;
  }

  container.dataset.animationInitialized = 'true';

  // Clear container
  container.innerHTML = '';
  container.style.cssText = `
    position: relative;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    overflow: visible;
  `;

  // Create animated elements
  createAnimatedParticles(container);

  // Start animation timeline
  startAnimationTimeline(container);
}

function createAnimatedParticles(container) {
  const colors = [
    { from: '#667eea', to: '#764ba2' },
    { from: '#7c6fef', to: '#8b5cf6' },
    { from: '#8b5cf6', to: '#667eea' }
  ];

  for (let i = 0; i < 3; i++) {
    const particle = document.createElement('div');
    particle.className = `particle particle-${i}`;
    particle.style.cssText = `
      position: absolute;
      left: -40px;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 10px;
      background: linear-gradient(90deg, ${colors[i].from}, ${colors[i].to});
      border-radius: 5px;
      opacity: 0;
      box-shadow: 0 0 20px ${colors[i].from}66;
    `;
    container.appendChild(particle);
  }
}

function startAnimationTimeline(container) {
  const particles = container.querySelectorAll('.particle');

  // Create timeline
  const tl = anime.timeline({
    easing: 'easeInOutQuad',
    loop: true,
    duration: 3000
  });

  particles.forEach((particle, index) => {
    tl.add({
      targets: particle,
      opacity: [0, 1],
      left: ['-40px', '50%'],
      translateX: [0, '-50%'],
      translateY: ['-50%', '-70%'],
      scale: [0.8, 1],
      duration: 1200,
      easing: 'easeOutCubic'
    }, index * 800) // Stagger start by 800ms

    .add({
      targets: particle,
      translateY: ['-70%', '-30%'],
      duration: 600,
      easing: 'easeInOutSine'
    }, '-=600')

    .add({
      targets: particle,
      opacity: [1, 0],
      left: ['50%', 'calc(100% + 40px)'],
      translateY: ['-30%', '-50%'],
      scale: [1, 0.8],
      duration: 1200,
      easing: 'easeInCubic'
    }, '-=0');
  });
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => initProcessAnimation(), 150);
  });
} else {
  setTimeout(() => initProcessAnimation(), 150);
}

// Re-initialize on window resize (debounced)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const container = document.getElementById('process-animation-container');
    if (container) {
      container.dataset.animationInitialized = 'false';
      initProcessAnimation();
    }
  }, 250);
});
