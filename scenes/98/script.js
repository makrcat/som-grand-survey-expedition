
const purpleShades = [
    '#9b59b6', '#8e44ad', '#663399', '#9c88ff', '#a29bfe',
    '#6c5ce7', '#fd79a8', '#e84393', '#74b9ff', '#0984e3',
    '#b2bec3', '#dda0dd', '#da70d6', '#ba55d3', '#9370db',
    '#8a2be2', '#9400d3', '#4b0082', '#483d8b', '#6a5acd'
];

const coastalColors = [
    '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff',
    '#5f27cd', '#00d2d3', '#ff9f43', '#10ac84', '#ee5a24',
    '#0abde3', '#006ba6', '#f39c12', '#e74c3c', '#9b59b6'
];

const porpleFacts = [
    "Population: 7½ crabs",
    "National anthem: just one kazoo note held for 6 minutes",
    "Main export: confused looks",
    "Time zone: Whenever the tide feels like it",
    "Official bird: That one seagull (his name is Gerald)",
    "Average temperature: Surprisingly porple",
    "Founded: Last Tuesday, probably",
    "Mayor: A hermit crab named Steve",
    "Local delicacy: Sand sandwiches",
    "Weather forecast: 80% chance of existing",
    "Postal code: GLUB-GLUB",
    "Emergency services: Just yell really loud",
    "Tourist attractions: You're looking at it",
    "Local legend: The Great Porple Splash of '92",
    "Currency: Shiny pebbles and good vibes",
    "Transportation: Hop on one foot while humming",
    "Education system: Learn by osmosis from the sea",
    "National sport: Synchronized seagull watching",
    "Famous residents: Gerald the seagull (mentioned earlier)",
    "Geological age: Old enough to know better",
    "Tide schedule: Whenever it feels like showing up",
    "Local WiFi password: PorplePoint123",
    "Beach volleyball court: Currently underwater",
    "Lighthouse keeper: A very dedicated starfish",
    "Sunset rating: 11/10 would recommend",
    "Seashell collection status: Impressive but mysterious",
    "Local surf report: Waves exist, probably",
    "Fishing license required: Only if the fish ask",
    "Parking: Just leave it wherever, honestly",
    "Gift shop hours: Closed for the season (which season? Good question)"
];

const soundEffects = [
    () => playTone(440, 0.1), // A note
    () => playTone(523, 0.15), // C note
    () => playTone(659, 0.1), // E note
    () => playTone(200, 0.2), // Low boing
    () => playTone(800, 0.05), // High ping
    () => playTone(330, 0.3), // Ocean-like sound
    () => playTone(880, 0.08), // Seagull-ish
];

let clickCount = 0;
let shellCount = 0;
let totalDonated = parseInt(localStorage.getItem('porpleDonations') || '0');

function playTone(frequency, duration) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
        console.log('Audio not supported in this browser');
    }
}

function getRandomPurple() {
    return purpleShades[Math.floor(Math.random() * purpleShades.length)];
}

function getRandomCoastalColor() {
    return coastalColors[Math.floor(Math.random() * coastalColors.length)];
}

function getRandomFact() {
    return porpleFacts[Math.floor(Math.random() * porpleFacts.length)];
}

function getRandomSound() {
    return soundEffects[Math.floor(Math.random() * soundEffects.length)];
}

function collectShells() {
    const shellsFound = Math.floor(Math.random() * 3) + 1; // 1-3 shells per click
    shellCount += shellsFound;
    document.getElementById('shellCount').textContent = shellCount;
    
    // Update donate button state
    updateDonateButton();
    
    // Create floating shell animation
    for (let i = 0; i < shellsFound; i++) {
        setTimeout(() => createFloatingShell(), i * 200);
    }
}

function updateDonateButton() {
    const donateButton = document.getElementById('donateButton');
    if (shellCount > 0) {
        donateButton.disabled = false;
        donateButton.textContent = `Donate ${shellCount} Shells`;
    } else {
        donateButton.disabled = true;
        donateButton.textContent = 'No Shells to Donate';
    }
}

function donateShells() {
    if (shellCount > 0) {
        totalDonated += shellCount;
        const donatedAmount = shellCount;
        shellCount = 0;
        
        // Save to localStorage
        localStorage.setItem('porpleDonations', totalDonated.toString());
        
        // Update displays
        document.getElementById('shellCount').textContent = shellCount;
        document.getElementById('donatedCount').textContent = totalDonated;
        updateDonateButton();
        
        // Create donation animation
        createDonationAnimation(donatedAmount);
        
        // Play a special sound
        playTone(523, 0.3); // Longer C note for donation
        
        // Show thank you message on sign
        const signDisplay = document.getElementById('mainSign');
        const originalText = signDisplay.textContent;
        signDisplay.textContent = `🙏 Thank you for donating ${donatedAmount} shells to the Porple Preservation Society! 🙏`;
        
        setTimeout(() => {
            signDisplay.textContent = originalText;
        }, 3000);
    }
}

function createFloatingShell() {
    const shell = document.createElement('div');
    shell.innerHTML = '🐚';
    shell.style.position = 'fixed';
    shell.style.left = Math.random() * (window.innerWidth - 50) + 'px';
    shell.style.top = window.innerHeight + 'px';
    shell.style.fontSize = '1.5em';
    shell.style.pointerEvents = 'none';
    shell.style.zIndex = '1000';
    shell.style.animation = 'shellFloat 3s ease-out forwards';
    
    document.body.appendChild(shell);
    
    setTimeout(() => {
        if (document.body.contains(shell)) {
            document.body.removeChild(shell);
        }
    }, 3000);
}

function doMagic() {
    clickCount++;
    
    // Collect shells
    collectShells();
    
    // Change sky colors to purple variations only
    const sky = document.querySelector('.sky');
    const newColor1 = getRandomPurple();
    const newColor2 = getRandomPurple();
    const newColor3 = getRandomPurple();
    const newColor4 = getRandomPurple();
    
    sky.style.background = `linear-gradient(180deg, ${newColor1}, ${newColor2}, ${newColor3}, ${newColor4})`;
    
    // Show random fact on the sign
    const signDisplay = document.getElementById('mainSign');
    signDisplay.classList.remove('show');
    
    setTimeout(() => {
        signDisplay.textContent = getRandomFact();
        signDisplay.classList.add('show');
    }, 250);
    
    // Play random sound
    getRandomSound()();
    
    // Special effects for milestone clicks
    if (clickCount === 10) {
        signDisplay.textContent = "🎉 Congratulations! You've discovered the secret of Porple Point: It's just really, really porple! 🎉";
    } else if (clickCount === 25) {
        signDisplay.textContent = "🏆 PORPLE MASTER ACHIEVED! Gerald the seagull is impressed! 🏆";
    } else if (clickCount === 50) {
        signDisplay.textContent = "🌟 ULTIMATE PORPLE LEGEND! You are now an honorary member of the Porple Preservation Society! 🌟";
    } else if (clickCount === 75) {
        signDisplay.textContent = "🌊 COASTAL COMMANDER! The waves themselves bow to your clicking prowess! 🌊";
    } else if (clickCount === 100) {
        signDisplay.textContent = "🏝️ ISLAND EMPEROR! Porple Point officially declares you its ruler! All hail! 🏝️";
    }
    
    // Add some visual flair
    if (clickCount % 3 === 0) {
        createSplash();
    }
    
    // Special shell bonus
    if (clickCount % 10 === 0) {
        createShellBurst();
    }
}

function createSplash() {
    const splash = document.createElement('div');
    splash.innerHTML = '💦';
    splash.style.position = 'fixed';
    splash.style.left = Math.random() * window.innerWidth + 'px';
    splash.style.top = Math.random() * window.innerHeight + 'px';
    splash.style.fontSize = '2em';
    splash.style.pointerEvents = 'none';
    splash.style.zIndex = '1000';
    splash.style.animation = 'splashFade 2s ease-out forwards';
    
    document.body.appendChild(splash);
    
    setTimeout(() => {
        document.body.removeChild(splash);
    }, 2000);
}

function createDonationAnimation(amount) {
    // Create hearts floating up from donation button
    for (let i = 0; i < Math.min(amount, 10); i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💝';
            heart.style.position = 'fixed';
            heart.style.left = '60px';
            heart.style.top = '80px';
            heart.style.fontSize = '1.5em';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.animation = 'donationFloat 3s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
            }, 3000);
        }, i * 150);
    }
}

function createShellBurst() {
    const shells = ['🐚', '🦪', '⭐', '🐚', '🦀'];
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const shell = document.createElement('div');
            shell.innerHTML = shells[Math.floor(Math.random() * shells.length)];
            shell.style.position = 'fixed';
            shell.style.left = '50%';
            shell.style.top = '50%';
            shell.style.fontSize = '2em';
            shell.style.pointerEvents = 'none';
            shell.style.zIndex = '1000';
            
            const angle = (i / 8) * 2 * Math.PI;
            const distance = 200;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            shell.style.animation = `shellBurst 2s ease-out forwards`;
            shell.style.setProperty('--endX', endX + 'px');
            shell.style.setProperty('--endY', endY + 'px');
            
            document.body.appendChild(shell);
            
            setTimeout(() => {
                if (document.body.contains(shell)) {
                    document.body.removeChild(shell);
                }
            }, 2000);
        }, i * 100);
    }
}

function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes splashFade {
            0% { 
                opacity: 1; 
                transform: scale(0.5) translateY(0px); 
            }
            50% { 
                opacity: 0.8; 
                transform: scale(1.2) translateY(-20px); 
            }
            100% { 
                opacity: 0; 
                transform: scale(0.8) translateY(-40px); 
            }
        }
        
        @keyframes shellFloat {
            0% { 
                opacity: 1; 
                transform: translateY(0px) rotate(0deg); 
            }
            100% { 
                opacity: 0; 
                transform: translateY(-300px) rotate(360deg); 
            }
        }
        
        @keyframes shellBurst {
            0% { 
                opacity: 1; 
                transform: translate(-50%, -50%) scale(0.5); 
            }
            50% { 
                opacity: 1; 
                transform: translate(calc(-50% + var(--endX)), calc(-50% + var(--endY))) scale(1.2); 
            }
            100% { 
                opacity: 0; 
                transform: translate(calc(-50% + var(--endX)), calc(-50% + var(--endY))) scale(0.8); 
            }
        }
        
        @keyframes donationFloat {
            0% { 
                opacity: 1; 
                transform: translateY(0px) scale(0.8); 
            }
            50% { 
                opacity: 1; 
                transform: translateY(-100px) scale(1.2); 
            }
            100% { 
                opacity: 0; 
                transform: translateY(-200px) scale(0.6); 
            }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
    // Show initial sign
    setTimeout(() => {
        document.getElementById('mainSign').classList.add('show');
    }, 1000);
    
    // Initialize counters with saved values
    document.getElementById('donatedCount').textContent = totalDonated;
    updateDonateButton();
    
    // Add animations
    addAnimations();
    
    // Add some seashells to the beach
    const seashells = ['🐚', '🦪', '⭐', '🐚', '🦀'];
    seashells.forEach((shell, index) => {
        const shellElement = document.createElement('div');
        shellElement.innerHTML = shell;
        shellElement.className = 'seashell';
        shellElement.style.left = (15 + index * 20) + '%';
        shellElement.style.animationDelay = (index * 0.5) + 's';
        document.body.appendChild(shellElement);
    });
    
    console.log('🏝️ Welcome to the run-down Porple Point! Gerald the seagull says hello! 🐦');
    console.log('💰 Click the weathered sign to collect shells and discover Porple facts!');
    console.log('💝 Donate your shells to support the Porple Preservation Society!');
    if (totalDonated > 0) {
        console.log(`🎉 You've previously donated ${totalDonated} shells! Thank you for your support!`);
    }
});
