class crab {
    constructor(scene) {
        // Creating the crab element
        this.element = document.createElement('div');
        this.element.classList.add('crab');
        // Crab image
        this.image = new Image();
        this.image.src = 'images/crab-walking-no-color.gif';
        // Random color for crabs
        this.hue = Math.floor(Math.random() * 40 - 20) + 360 % 360;
        this.element.style.filter = `hue-rotate(${this.hue}deg) saturate(200%)`;

        scene.appendChild(this.element);
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
        console.log("Video is playing.");
    } else if (event.data == YT.PlayerState.PAUSED) {
        state.currentState = 'PAUSED';
        console.log("Video is paused.");
    } else if (event.data == YT.PlayerState.ENDED) {
        if (hasStartedPlaying) {
            hasStartedPlaying = false;
        }
        state.currentState = 'ENDED';
        console.log("Video has ended.");
    } else if (event.data == YT.PlayerState.BUFFERING) {
        state.currentState = 'BUFFERING';
        console.log("Video is buffering.");
    }
}

let t44 = false;
function checkVideoTime(scene) {
    const currentTime = player.getCurrentTime();
    if (currentTime >= 44 && !t44) {
        console.log("The crabs are coming!");
        seconds44(scene);
        t44 = true;
    }
}

function seconds44(scene) {
    if (state.currentState === 'PLAYING') {

    }
}

document.addEventListener('DOMContentLoaded', () => {
    const scene = document.getElementById('scene');
    const crab1 = new crab(scene);
});