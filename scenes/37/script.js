// Eastern Upside-Down Island — enhanced client-side interactions
(function(){
  const flipBtn = document.getElementById('flip-btn');
  const hcBtn = document.getElementById('hc-btn');
  const particlesBtn = document.getElementById('particles-btn');
  const atmosphereBtn = document.getElementById('atmosphere-btn');
  const particlesContainer = document.getElementById('particles');
  const mysticalAnchor = document.getElementById('mystical-anchor');

  let flipped = true; // start flipped
  let particlesActive = true;
  let atmosphereActive = false;

  // Initialize flip state
  document.body.style.transform = 'rotate(180deg)';
  document.body.style.transition = 'transform 300ms ease';
  flipBtn.textContent = 'Unflip World';

  // Set initial link transform fix
  document.querySelectorAll('.exit.flip').forEach(a => {
    a.style.transform = 'scaleX(-1)';
  });

  // World flip functionality
  flipBtn?.addEventListener('click', () => {
    flipped = !flipped;
    document.body.style.transition = 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)';
    
    if(flipped){
      document.body.style.transform = 'rotate(180deg)';
      flipBtn.textContent = 'Unflip World';
      document.querySelectorAll('.exit.flip').forEach(a => {
        a.style.transform = 'scaleX(-1)';
      });
      // Reverse particle direction when flipped
      document.documentElement.style.setProperty('--particle-speed', '15s');
    } else {
      document.body.style.transform = 'none';
      flipBtn.textContent = 'Flip World';
      document.querySelectorAll('.exit.flip').forEach(a => {
        a.style.transform = 'none';
      });
      // Slower particles when right-side up
      document.documentElement.style.setProperty('--particle-speed', '20s');
    }
  });

  // High contrast toggle
  hcBtn?.addEventListener('click', () => {
    const on = document.body.classList.toggle('hc');
    hcBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });

  // Particle system toggle
  particlesBtn?.addEventListener('click', () => {
    particlesActive = !particlesActive;
    particlesContainer.style.opacity = particlesActive ? '1' : '0';
    particlesBtn.setAttribute('aria-pressed', particlesActive ? 'true' : 'false');
  });

  // Mystical atmosphere toggle
  atmosphereBtn?.addEventListener('click', () => {
    atmosphereActive = !atmosphereActive;
    document.body.classList.toggle('mystical-atmosphere', atmosphereActive);
    atmosphereBtn.setAttribute('aria-pressed', atmosphereActive ? 'true' : 'false');
  });

  // Discovery section interactions
  const discoveryTriggers = document.querySelectorAll('.discovery-trigger');
  discoveryTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const discoveryType = trigger.dataset.discovery;
      const content = document.getElementById(`${discoveryType}-content`);
      
      if (content) {
        const isHidden = content.hasAttribute('hidden');
        
        // Close all other discoveries
        document.querySelectorAll('.discovery-content').forEach(el => {
          el.setAttribute('hidden', '');
        });
        
        // Toggle this discovery
        if (isHidden) {
          content.removeAttribute('hidden');
          trigger.style.background = 'linear-gradient(135deg, rgba(111,231,255,.2), rgba(16, 12, 40, .8))';
        } else {
          content.setAttribute('hidden', '');
          trigger.style.background = 'linear-gradient(135deg, var(--card), rgba(16, 12, 40, .7))';
        }
      }
    });
  });

  // Interactive anchor effects
  let anchorClickCount = 0;
  mysticalAnchor?.addEventListener('click', () => {
    anchorClickCount++;
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 10px; height: 10px;
      background: radial-gradient(circle, rgba(111,231,255,.8), transparent);
      border-radius: 50%;
      animation: rippleExpand 1s ease-out forwards;
      pointer-events: none;
    `;
    mysticalAnchor.appendChild(ripple);
    
    // Add ripple animation
    if (!document.getElementById('ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes rippleExpand {
          to { 
            width: 200px; height: 200px; 
            opacity: 0; 
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 1000);
    
    // Special effects based on click count
    if (anchorClickCount === 3) {
      showAnchorMessage("The anchor resonates with ancient power...");
    } else if (anchorClickCount === 7) {
      showAnchorMessage("Reality shimmers around the anchor...");
      // Temporarily make particles more active
      document.documentElement.style.setProperty('--particle-speed', '8s');
      setTimeout(() => {
        document.documentElement.style.setProperty('--particle-speed', flipped ? '15s' : '20s');
      }, 5000);
    }
  });

  // Show mystical messages
  function showAnchorMessage(text) {
    let messageEl = document.getElementById('anchor-message');
    
    if (!messageEl) {
      messageEl = document.createElement('div');
      messageEl.id = 'anchor-message';
      messageEl.style.cssText = `
        position: fixed;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(8, 6, 20, .95);
        border: 1px solid rgba(111,231,255,.4);
        border-radius: 12px;
        padding: 20px 30px;
        color: var(--accent-2);
        font-style: italic;
        text-align: center;
        backdrop-filter: blur(8px);
        z-index: 1000;
        animation: messageFloat 3s ease-out forwards;
        pointer-events: none;
      `;
      document.body.appendChild(messageEl);
      
      // Add message animation
      if (!document.getElementById('message-styles')) {
        const style = document.createElement('style');
        style.id = 'message-styles';
        style.textContent = `
          @keyframes messageFloat {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -60%) scale(0.9); }
          }
        `;
        document.head.appendChild(style);
      }
    }
    
    messageEl.textContent = text;
    messageEl.style.display = 'block';
    
    setTimeout(() => {
      messageEl.style.display = 'none';
    }, 3000);
  }

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
      flipBtn.click();
    } else if (e.key === 'h' || e.key === 'H') {
      hcBtn.click();
    } else if (e.key === 'p' || e.key === 'P') {
      particlesBtn.click();
    } else if (e.key === 'a' || e.key === 'A') {
      atmosphereBtn.click();
    } else if (e.key === ' ') {
      e.preventDefault();
      mysticalAnchor.click();
    }
  });

  // Initialize particle drift variations
  document.querySelectorAll('.particle').forEach((particle, index) => {
    const drift = [-30, -20, -10, 10, 20, 30][index % 6];
    particle.style.setProperty('--drift', `${drift}px`);
  });

  console.log('🌌 Eastern Upside-Down Island enhanced! Press F to flip, H for high contrast, P for particles, A for atmosphere, or SPACE to interact with the anchor.');
})();
