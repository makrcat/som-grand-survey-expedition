class crab {
    constructor() {
        // Creating the crab element
        this.element = document.createElement('div');
        this.element.classList.add('crab');
        // Dimensions
        this.width = Math.random() * 150 + 50;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.width * 0.8}px`;
        // Crab image
        this.element.style.backgroundImage = `url(images/crab-walking-no-color.webp)`;
        // Random color
        this.hue = (Math.random() * 15) + 310;
        this.element.style.filter = `sepia(50%) saturate(1000%) contrast(180%) hue-rotate(${this.hue}deg)`;
        // position
        this.element.style.position = 'absolute';
        this.x = - (Math.random() + 200);
        this.y = Math.random() * 50;
        this.element.style.left = `${this.x}px`;
        this.element.style.bottom = `${this.y}px`;
        // Speed
        this.speed = Math.random() * 1 + 0.3;
    }
    update(animProperty) {
        switch (animProperty) {
            case 1: // animation 1: Crabs walking sideways.
                this.element.style.backgroundImage = `url(images/crab-walking-no-color.webp)`;
                if (this.x < window.innerWidth) {
                    this.x += this.speed;
                } else {
                    this.speed = Math.random() * 1 + 0.3;
                    this.width = Math.random() * 150 + 50;
                    this.element.style.width = `${this.width}px`;
                    this.element.style.height = `${this.width * 0.8}px`;
                    this.y = Math.random() * 50;
                    this.element.style.bottom = `${this.y}px`;
                    this.x = - this.width;
                }
                this.element.style.left = `${this.x}px`;
                break;
            default:
                this.element.style.backgroundImage = `url(images/crab-still.webp)`;
                if (this.x < 0 || this.x > window.innerWidth - this.width) {
                    this.x = Math.random() * window.innerWidth;
                    this.element.style.left = `${this.x}px`;
                }
                break;
        }
    }
}

class crabController {
    constructor( ){
        this.crabs = [];
        this.animProperty = 1;
        this.spawnCrabs(20);
    }
    spawnCrabs(num){
        for (let i = 0; i < num; i++) {
            this.crabs[i] = new crab();
        }
    }
    appendCrabs(scene){
        const crabs = document.createElement('div');
        crabs.classList.add('crab-container');
        this.crabs.forEach(crab => {
            crabs.appendChild(crab.element);
        });
        scene.appendChild(crabs);
    }
    handleCrabs() {
        this.crabs.forEach(crab => {
            crab.update(this.animProperty);
        });
    }
    animate = () => {
        this.handleCrabs();
        requestAnimationFrame(this.animate);
    };
}

var player;
let hasStartedPlaying = false;
const state = {currentState: 'UNSTARTED'};
const scene = document.getElementById('scene');
let controller;

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
let t36 = false;
let t44 = false;
let t70 = false;
let t75 = false;
function checkVideoTime() {
    const currentTime = player.getCurrentTime();
    console.log(currentTime);
    if (!t29 && currentTime >= 29) {
        console.log("The crabs are snapping!");
        seconds29(true, false);
        t29 = true;
    } else if (!t36 && currentTime >= 36) {
        console.log("More crabs!");
        t36 = true;
        seconds36(true);
    } else if (!t44 && currentTime >= 44) {
        console.log("They are marching?");
        seconds29(false, true);
        seconds36(false);
        crabs(1);
        t44 = true;
    } else if (!t70 && currentTime >= 70) {
        console.log("Wait for it...");
        seconds29(false, false);
        crabs();
        t70 = true;
    } else if (!t75 && currentTime >= 75) {
        console.log("Dun dun dun dududu dun dududu dun dododododo...");
        crabs(2);
        t70 = true;
    }
}

function seconds29(bool, resize){
    const twoThree = document.getElementById("tt1");
    if (bool) {
        twoThree.hidden = !bool;
    } else if (resize) {
        twoThree.style.height = '80px';
    } else {
        twoThree.hidden = !bool;
        twoThree.style.height = '100%';
    }
}

function seconds36(bool) {
    const twoThree2 = document.getElementById("tt2");
    twoThree2.hidden = !bool;

}

function crabs(animProperty) {
    if (!controller) {
        controller = new crabController();
        controller.appendCrabs(scene);
        controller.animate();
    }

    controller.animProperty = animProperty;
}

// document.addEventListener('DOMContentLoaded', () => {
//     const scene = document.getElementById('scene');
//     const crabs = new crabController();
//     crabs.appendCrabs(scene);
//     crabs.animate();
// });