const storyData = [
    {
        scene: 0,
        background: 'bg-scene1',
        speaker: 'Narrator',
        text: "Deep within Hacklantis lies the mysterious Toetree Forest… a place where the trees themselves seem alive, glowing faintly in the mist. Travelers say that once you enter, the paths twist endlessly, and no map can guide you out. Photos taken here are said to vanish, leaving only rumors and laughter behind."
    },
    {
        scene: 0,
        background: 'bg-scene1',
        speaker: 'Narrator',
        text: "And somehow… two familiar fools have wandered right into the heart of it. Luffy, chasing adventure as always, and Zoro, who probably just took the wrong turn again. Together, they stumble through the shadows of the forest, completely and utterly lost…"
    },
    {
        scene: 1,
        background: 'bg-scene1',
        speaker: 'Luffy',
        text: "Oi, Zoro, where are we? This forest looks weird."
    },
    {
        scene: 1,
        background: 'bg-scene1',
        speaker: 'Zoro',
        text: "Don't ask me. You're the one who said 'this way looks fun'…"
    },
    {
        scene: 2,
        background: 'bg-scene2',
        speaker: 'Luffy',
        text: "Hahaha, relax! We'll find the way out."
    },
    {
        scene: 2,
        background: 'bg-scene2',
        speaker: 'Zoro',
        text: "You? Find the way? You can't even find the kitchen on the Sunny."
    },
    {
        scene: 3,
        background: 'bg-scene3',
        speaker: 'Luffy',
        text: "Did you hear that? Sounded like… footsteps?"
    },
    {
        scene: 3,
        background: 'bg-scene3',
        speaker: 'Zoro',
        text: "Tch. Whatever it is, I'll cut it down."
    },
    {
        scene: 4,
        background: 'bg-scene4',
        speaker: 'Luffy',
        text: "Look! That path is glowing! Maybe it's the way out."
    },
    {
        scene: 4,
        background: 'bg-scene4',
        speaker: 'Zoro',
        text: "Or maybe it's a trap. Either way… we don't have a choice."
    },
    {
        scene: 5,
        background: 'bg-scene5',
        speaker: 'Luffy',
        text: "Alright! Let's go this way!"
    },
    {
        scene: 1,
        background: 'bg-scene5',
        speaker: 'Zoro',
        text: "Which way? You're pointing in three directions at once…"
    }
];

let currentLine = 0;
let isTyping = false;

const dialogueContainer = document.getElementById('dialogueContainer');
const speakerName = document.getElementById('speakerName');
const dialogueText = document.getElementById('dialogueText');
const nextButton = document.getElementById('nextButton');
const luffyChar = document.getElementById('luffyChar');
const zoroChar = document.getElementById('zoroChar');
const background = document.getElementById('background');
const choicesContainer = document.getElementById('choicesContainer');
const fadeOverlay = document.getElementById('fadeOverlay');
const storyContainer = document.getElementById('storyContainer');

function typeWriter(element, text, speed = 20) {
    element.textContent = '';
    isTyping = true;
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            isTyping = false;
        }
    }
    type();
}

function updateCharacters(speaker) {
    luffyChar.classList.remove('active');
    zoroChar.classList.remove('active');
    
    if (speaker === 'Luffy') {
        luffyChar.classList.add('active');
    } else if (speaker === 'Zoro') {
        zoroChar.classList.add('active');
    }
}

function changeBackground(newBgClass) {
    fadeOverlay.classList.add('active');
    
    setTimeout(() => {
        background.className = 'background ' + newBgClass;
        fadeOverlay.classList.remove('active');
    }, 250);
}

function showLine(lineIndex) {
    if (lineIndex >= storyData.length) {
        showChoices();
        return;
    }

    const line = storyData[lineIndex];
    
    if (lineIndex === 0 || storyData[lineIndex - 1].background !== line.background) {
        changeBackground(line.background);
    }
    
    speakerName.textContent = line.speaker;
    updateCharacters(line.speaker);
    typeWriter(dialogueText, line.text);
    
    if (!dialogueContainer.classList.contains('visible')) {
        dialogueContainer.classList.add('visible');
    }
}

function showChoices() {
    dialogueContainer.classList.remove('visible');
    luffyChar.classList.remove('active');
    zoroChar.classList.remove('active');
    choicesContainer.style.display = 'flex';
}
 
nextButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!isTyping) {
        currentLine++;
        showLine(currentLine);
    }
});

storyContainer.addEventListener('click', (e) => {
    if (e.target === nextButton || e.target.closest('.choices-container')) {
        return;
    }
    if (!isTyping && choicesContainer.style.display !== 'flex') {
        currentLine++;
        showLine(currentLine);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (!isTyping && choicesContainer.style.display !== 'flex') {
            currentLine++;
            showLine(currentLine);
        }
    }
});

const music = document.getElementById("bg-music");

// Unmute as soon as the user clicks anywhere
document.addEventListener("click", () => {
  music.muted = false;
  music.play().catch(err => console.log("Autoplay blocked:", err));
}, { once: true });


setTimeout(() => { showLine(0); }, 1000);
