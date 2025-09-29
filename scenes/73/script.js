
const wall = document.getElementById('wall');
const cooling = document.getElementById('cooling');
const heatSpot = document.getElementById('heatSpot');
const tempValueEl = document.getElementById('tempValue');
const psiValueEl = document.getElementById('psiValue');
const soundToggle = document.getElementById('soundToggle');
const hint = document.getElementById('hint');
const frostBtn = document.getElementById('frostBtn');
const dyeToggle = document.getElementById('dyeToggle');


const lighter = document.getElementById('lighter');
let clickCount = 0;
let lighterActive = false;
let lighterPicked = false;
let hoverTimer = null;
const requiredClicks = Math.floor(Math.random() * 3) + 3; // random 3-5
let ambient = { ctx: null, node: null, filter: null, gain: null, enabled: false };
let steamInterval = null;
let currentTemp = -20.0; // °C
let currentPsi = 1.2; // bar
let oscillation = { tempAmp: 0.4, psiAmp: 0.03 };
let revealed = false;
let instrumentsLoopStarted = false;
let bubbleSpawnInterval = null;

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

function initAmbientNoise() {
  try {
    if (!ambient.ctx) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const bufferSize = 2 * ctx.sampleRate;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer; noise.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass'; filter.frequency.value = 450; filter.Q.value = 0.7;
      const gain = ctx.createGain();
      gain.gain.value = 0.0; // start muted
      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start();
      ambient.ctx = ctx; ambient.node = noise; ambient.filter = filter; ambient.gain = gain;
    }
  } catch (e) { /* ignore */ }
}

function setAmbientEnabled(on) {
  if (!ambient.ctx) return;
  ambient.enabled = !!on;
  const target = ambient.enabled ? 0.06 : 0.0; // very soft airflow
  const now = ambient.ctx.currentTime;
  ambient.gain.gain.cancelScheduledValues(now);
  ambient.gain.gain.linearRampToValueAtTime(target, now + 0.25);
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
    
  }
});

// Pick up lighter
lighter.addEventListener('click', function() {
  if (!lighterPicked) {
    playLighterSound();
    lighterPicked = true;
    lighter.classList.add('flame');
    lighter.style.transition = 'none';
    lighter.style.zIndex = '100';
    lighter.style.pointerEvents = 'none';
    lighter.style.position = 'fixed';
    lighter.style.opacity = '1';
    window.addEventListener('mousemove', moveLighter);
    // Start showing heat spot when over wall
  }
});

function moveLighter(e) {
  lighter.style.left = (e.clientX - 0) + 'px';
  lighter.style.top = (e.clientY - 0) + 'px';
  // Move heat spot if inside wall
  const rect = wall.getBoundingClientRect();
  const x = e.clientX; const y = e.clientY;
  const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  if (inside) {
    wall.classList.add('heating');
    heatSpot.style.left = (x - rect.left) + 'px';
    heatSpot.style.top = (y - rect.top) + 'px';
  } else {
    wall.classList.remove('heating');
  }
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
      wall.classList.remove('heating');
      // Start effects after reveal
      revealed = true;
      initAmbientNoise();
      // Turn sound ON by default, toggle shows current state
      if (soundToggle && !soundToggle.classList.contains('on')) {
        soundToggle.classList.add('on');
        soundToggle.classList.remove('off');
        soundToggle.textContent = 'ON';
        soundToggle.setAttribute('aria-pressed', 'true');
      }
      setAmbientEnabled(true);
      startSteamPuffs();
      if (!instrumentsLoopStarted) { animateInstruments(); instrumentsLoopStarted = true; }
      // Remove hint after reveal
      if (hint) hint.style.display = 'none';
      startDynamicBubbles();
      // Ensure arrows and flows are in sync
      syncFlowArrows();
    }, 1800);
  }
});
wall.addEventListener('mouseleave', function(e) {
  if (hoverTimer) {
    clearTimeout(hoverTimer);
    hoverTimer = null;
  }
});

function startSteamPuffs() {
  const overlay = document.getElementById('steamOverlay');
  if (steamInterval) clearInterval(steamInterval);
  steamInterval = setInterval(() => {
    // Create a puff
    const puff = document.createElement('div');
    puff.style.position = 'absolute';
    const x = 40 + Math.random() * (overlay.clientWidth - 80);
    const size = 40 + Math.random() * 60;
    puff.style.left = x + 'px';
    puff.style.bottom = '-20px';
    puff.style.width = size + 'px';
    puff.style.height = size + 'px';
    puff.style.borderRadius = '50%';
    puff.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35), rgba(255,255,255,0.05) 60%, rgba(255,255,255,0) 70%)';
    puff.style.filter = 'blur(1.5px)';
    puff.style.opacity = '0.0';
    puff.style.pointerEvents = 'none';
    overlay.appendChild(puff);
    // animate
    const rise = 40 + Math.random() * 80;
    const drift = (Math.random() - 0.5) * 40;
    const duration = 1600 + Math.random() * 1200;
    const start = performance.now();
    function frame(t) {
      const p = Math.min(1, (t - start) / duration);
      puff.style.transform = `translate(${drift * p}px, ${-rise * p}px)`;
      puff.style.opacity = (p < 0.2 ? p * 5 : 1 - (p - 0.2) / 0.8);
      if (p < 1) requestAnimationFrame(frame); else overlay.removeChild(puff);
    }
    requestAnimationFrame(frame);
  }, 900);
}

function animateInstruments() {
  const tempNeedle = cooling.querySelector('.gauge.temp .needle');
  const psiNeedle = cooling.querySelector('.gauge.psi .needle');
  // animate to a target temp and psi then gently oscillate
  const targetTemp = -23 - Math.random() * 7; // -23..-30
  const targetPsi = 1.1 + Math.random() * 0.3; // 1.1..1.4
  const start = performance.now();
  const startTemp = currentTemp;
  const startPsi = currentPsi;
  const duration = 1800;
  function lerp(a,b,t){return a+(b-a)*t}
  function ease(t){return 1- Math.pow(1-t,3)} // smooth
  function tick(t) {
    const p = Math.min(1, (t - start)/duration);
    currentTemp = lerp(startTemp, targetTemp, ease(p));
    currentPsi = lerp(startPsi, targetPsi, ease(p));
    updateDisplay();
  // map temp and pressure to angles
  const tAngle = -50 + ((currentTemp + 40) / 40) * 100; // -40..0C -> -50..50deg
  const pAngle = -30 + ((currentPsi - 0.8) / 0.8) * 120; // 0.8..1.6 bar -> -30..90deg
  if (tempNeedle) tempNeedle.style.transform = `rotate(${tAngle}deg)`;
  if (psiNeedle) psiNeedle.style.transform = `rotate(${pAngle}deg)`;
    if (p < 1) requestAnimationFrame(tick); else oscillate();
  }
  function oscillate() {
    const t0 = performance.now();
    function loop(t) {
      const s = (t - t0) / 1000;
      const dT = Math.sin(s * 1.8) * oscillation.tempAmp;
      const dP = Math.cos(s * 1.2) * oscillation.psiAmp;
      const temp = currentTemp + dT;
      const psi = currentPsi + dP;
      tempValueEl.textContent = temp.toFixed(1) + '°C';
      psiValueEl.textContent = psi.toFixed(2) + ' bar';
      const tAngle = -50 + ((temp + 40) / 40) * 100;
      const pAngle = -30 + ((psi - 0.8) / 0.8) * 120;
      if (tempNeedle) tempNeedle.style.transform = `rotate(${tAngle}deg)`;
      if (psiNeedle) psiNeedle.style.transform = `rotate(${pAngle}deg)`;
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(tick);
}

function updateDisplay() {
  tempValueEl.textContent = currentTemp.toFixed(1) + '°C';
  psiValueEl.textContent = currentPsi.toFixed(2) + ' bar';
}

// Sound toggle wiring
if (soundToggle) {
  soundToggle.addEventListener('click', () => {
    initAmbientNoise();
    const on = !soundToggle.classList.contains('on');
    soundToggle.classList.toggle('on', on);
    soundToggle.classList.toggle('off', !on);
    soundToggle.textContent = on ? 'ON' : 'OFF';
    soundToggle.setAttribute('aria-pressed', on ? 'true' : 'false');
    setAmbientEnabled(on);
  });
}

// Interactions: valve toggles pressure amplitude; fan click boosts RPM
const valve = document.querySelector('.valve');
if (valve) {
  const toggleValve = () => {
    valve.classList.toggle('closed');
    const closed = valve.classList.contains('closed');
    oscillation.psiAmp = closed ? 0.01 : 0.03;
  };
  valve.addEventListener('click', toggleValve);
  valve.addEventListener('keydown', (e)=>{ if (e.key==='Enter' || e.key===' ') { e.preventDefault(); toggleValve(); }});
}
const fan = document.querySelector('.fan');
if (fan) {
  const toggleBoost = () => {
    fan.classList.toggle('boost');
    document.querySelector('.pipes.cover')?.classList.toggle('boost');
    document.querySelector('.pump')?.classList.toggle('boost');
    // slight reservoir slosh
    document.querySelector('.reservoir .glass')?.classList.add('slosh');
    setTimeout(()=>document.querySelector('.reservoir .glass')?.classList.remove('slosh'), 650);
  };
  fan.addEventListener('click', toggleBoost);
  fan.addEventListener('keydown', (e)=>{ if (e.key==='Enter' || e.key===' ') { e.preventDefault(); toggleBoost(); }});
}

// Hide the hint after first click interaction
let firstClick = false;
wall.addEventListener('click', () => {
  if (hint && !firstClick) { hint.style.display = 'none'; firstClick = true; }
}, { once: false });

// Flow direction reverse via valve shift+click
if (valve) {
  valve.addEventListener('click', (e) => {
    if (e.shiftKey) {
      document.querySelector('.pipes.cover')?.classList.toggle('reverse');
    }
  });
}

function startDynamicBubbles() {
  const bubblesContainer = document.querySelector('.reservoir .bubbles');
  if (!bubblesContainer) return;
  if (bubbleSpawnInterval) clearInterval(bubbleSpawnInterval);
  bubbleSpawnInterval = setInterval(() => {
    const span = document.createElement('span');
    span.style.left = (10 + Math.random()*80) + '%';
    span.style.width = span.style.height = (6 + Math.random()*10) + 'px';
    span.style.animationDuration = (2.8 + Math.random()*1.8) + 's';
    bubblesContainer.appendChild(span);
    setTimeout(()=> { span.remove(); }, 5000);
  }, 450);
}

// Reservoir tap-to-ripple
const glass = document.querySelector('.reservoir .glass');
if (glass) {
  const ripple = (x, y) => {
    const r = document.createElement('span');
    r.className = 'ripple';
    r.style.left = x + 'px';
    r.style.top = y + 'px';
    glass.appendChild(r);
    setTimeout(()=> r.remove(), 950);
  };
  glass.addEventListener('click', (e) => {
    const rect = glass.getBoundingClientRect();
    ripple(e.clientX - rect.left, e.clientY - rect.top);
  });
}

// Frost Mode: temporary deep-freeze effect
if (frostBtn) {
  frostBtn.addEventListener('click', () => {
    document.body.classList.add('frost');
    frostBtn.disabled = true;
    // Pull temp target down and increase steam briefly
    currentTemp -= 3; updateDisplay();
    const overlay = document.getElementById('steamOverlay');
    if (overlay) {
      overlay.style.transition = 'opacity 0.3s';
      const prev = overlay.style.opacity || '';
      overlay.style.opacity = '1';
      setTimeout(()=> { overlay.style.opacity = prev || ''; overlay.style.transition = ''; }, 1200);
    }
    setTimeout(() => { document.body.classList.remove('frost'); frostBtn.disabled = false; }, 1500);
  });
}

// Dye Toggle: cyan <-> cyberpunk
if (dyeToggle) {
  dyeToggle.addEventListener('click', () => {
    const cyber = document.body.classList.toggle('dye-cyber');
    dyeToggle.textContent = cyber ? 'CYBER' : 'CYAN';
    dyeToggle.setAttribute('aria-pressed', cyber ? 'true' : 'false');
  });
}

// Keep arrows visually consistent with boost/reverse classes (no-op hook for future logic)
function syncFlowArrows() {
  // Arrows are pseudo-elements; they follow same duration/direction as coolant via CSS classes.
}
