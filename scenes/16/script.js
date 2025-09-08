class crab {
    constructor() {
        // Creating the crab element
        this.element = document.createElement('div');
        this.element.classList.add('crab');
        // Crab image
        this.element.style.backgroundImage = `url(images/crab-walking-no-color.gif)`;
        // Random color for crabs
        this.hue = (Math.random() * 25) + 300;
        this.element.style.filter = `sepia(50%) saturate(1000%) contrast(180%) hue-rotate(${this.hue}deg)`;
        // positioning crab
        this.element.style.left = `${1}px`;
    }
}

var player;
let hasStartedPlaying = false;
const state = {currentState: 'UNSTARTED'};

function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
            width: '640',
            height: '390',
            videoId: 'LDU_Txk06tM',
            playerVars: {
                'rel': 0,
                'modestbranding': 0,
                // 'controls': 0,
                // 'autoplay': 1,
                // 'loop': 1,
                // 'playlist': 'LDU_Txk06tM'
            },
            events: {
                onStateChange: onPlayerStateChange
            }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        if (!hasStartedPlaying) {
            hasStartedPlaying = true;
            setInterval(checkVideoTime, 500);
        }
        state.currentState = 'PLAYING';
    } else if (event.data == YT.PlayerState.PAUSED) {
        state.currentState = 'PAUSED';
    } else if (event.data == YT.PlayerState.ENDED) {
        if (hasStartedPlaying) {
            hasStartedPlaying = false;
        }
        state.currentState = 'ENDED';
    } else if (event.data == YT.PlayerState.BUFFERING) {
        state.currentState = 'BUFFERING';
    }
}

let t29 = false;
function checkVideoTime(scene) {
    const currentTime = player.getCurrentTime();
    if (currentTime >= 29 && !t29) {
        console.log("The crabs are snapping!");
        seconds29(true);
        t29 = true;
    }
}

function seconds29(bool){
    const twoThree = document.getElementById("tt1");
    twoThree.hidden = !bool;
}

function seconds44(scene) {
    if (state.currentState === 'PLAYING') { 

    }
}

document.addEventListener('DOMContentLoaded', () => {
    // const scene = document.getElementById('scene');
    // const crab1 = new crab();
    // scene.appendChild(crab1.element);
});