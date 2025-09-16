
const wall = document.getElementById('wall');
const cooling = document.getElementById('cooling');


const lighter = document.getElementById('lighter');
let clickCount = 0;
let lighterActive = false;
let lighterPicked = false;
let hoverTimer = null;
const requiredClicks = Math.floor(Math.random() * 3) + 3; // random 3-5

// Crack effect
function createCrackEffect() {
  const crack = document.createElement('div');
  crack.style.position = 'absolute';
  crack.style.top = '50%';
  crack.style.left = '50%';
  crack.style.transform = 'translate(-50%, -50%)';
  // Crack grows with each click
  const minSize = 120;
  const maxSize = 340;
  const size = minSize + ((maxSize - minSize) * (clickCount / requiredClicks));
  crack.style.width = size + 'px';
  crack.style.height = size + 'px';
  crack.style.borderRadius = '50%';
  // More realistic crack: jagged edges and multiple shadows
  crack.style.boxShadow = `0 0 60px 20px #b3e5fc, 0 0 0 80px #81d4fa inset, 0 0 0 2px #fff, 0 0 0 8px #90caf9 inset`;
  crack.style.background = 'repeating-radial-gradient(circle at 60% 40%, #e3f2fd 0 10px, #b3e5fc 10px 20px, transparent 20px 40px)';
  crack.style.pointerEvents = 'none';
  crack.style.opacity = '0';
  crack.style.transition = 'opacity 0.5s';
  wall.appendChild(crack);
  setTimeout(() => { crack.style.opacity = '1'; }, 50);
  setTimeout(() => { crack.style.opacity = '0'; }, 900);
  setTimeout(() => { wall.removeChild(crack); }, 1400);
}

// Play crack sound
function playCrackSound() {
  const audio = new Audio("ice-break-14765.mp3");
  audio.volume = 0.4;
  audio.play();
}

// Play lighter sound
function playLighterSound() {
  const audio = new Audio("lighter.mp3");
  audio.volume = 0.3;
  audio.play();
}

wall.addEventListener('click', function(e) {
  if (wall.classList.contains('revealed') || lighterActive) return;
  clickCount++;
  createCrackEffect();
  playCrackSound();
  if (clickCount >= requiredClicks && !lighterActive) {
    lighterActive = true;
    lighter.classList.add('visible');
    setTimeout(() => { lighter.style.opacity = '1'; }, 100);
    playLighterSound();
  }
});

// Pick up lighter
lighter.addEventListener('click', function() {
  if (!lighterPicked) {
    lighterPicked = true;
    lighter.classList.add('flame');
    lighter.style.transition = 'none';
    lighter.style.zIndex = '100';
    lighter.style.pointerEvents = 'none';
    lighter.style.position = 'fixed';
    lighter.style.opacity = '1';
    window.addEventListener('mousemove', moveLighter);
  }
});

function moveLighter(e) {
  lighter.style.left = (e.clientX - 0) + 'px';
  lighter.style.top = (e.clientY - 0) + 'px';
}

// Hover lighter over wall to break
wall.addEventListener('mouseenter', function(e) {
  if (lighterPicked && !wall.classList.contains('revealed')) {
    hoverTimer = setTimeout(() => {
      wall.classList.add('revealed');
      cooling.classList.add('revealed');
      cooling.style.opacity = '0';
      setTimeout(() => { cooling.style.opacity = '1'; }, 100);
      createCrackEffect();
      playCrackSound();
  lighter.style.display = 'none';
  window.removeEventListener('mousemove', moveLighter);
    }, 1800);
  }
});
wall.addEventListener('mouseleave', function(e) {
  if (hoverTimer) {
    clearTimeout(hoverTimer);
    hoverTimer = null;
  }
});
