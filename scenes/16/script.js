const crabAnimations = [];

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
        this.image = 'images/crab-walking-no-color.webp';
        this.element.style.backgroundImage = `url(${this.image})`;
        // Random color
        this.hue = (Math.random() * 15) + 310;
        this.element.style.filter = `sepia(50%) saturate(1000%) contrast(180%) hue-rotate(${this.hue}deg)`;
        // position
        this.element.style.position = 'absolute';
        this.x = -(Math.random() + 200);
        this.y = Math.random() * 50;
        this.element.style.left = `${this.x}px`;
        this.element.style.bottom = `${this.y}px`;
        // Speed
        this.speed = Math.random() * 1 + 0.3;
    }
    update(animProperty) {
        switch (animProperty) {
            case 1: // animation 1: Crabs walking sideways.
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
            case 2: // animation 2: stop moving and reposition crabs out of bounds.
                if (this.x < 0 || this.x > window.innerWidth - this.width) {
                    this.x = Math.random() * window.innerWidth;
                    this.element.style.left = `${this.x}px`;
                }
                break;
            case 3: // get ready for round 2.
                this.width = Math.random() * 150 + 50;
                this.element.style.width = `${this.width}px`;
                this.element.style.height = `${this.width * 0.8}px`;

                this.x = Math.random() * window.innerWidth - this.width;
                this.y = Math.random() * window.innerHeight - (this.width * 0.8);
                this.element.style.left = `${this.x}px`;
                this.element.style.bottom = `${this.y}px`;
            default: // Don't do anything.
                break;
        }
    }
    updateImage(image) {
        if (image !== 'random'){
            this.image = image;
            this.element.style.backgroundImage = `url(${this.image})`;
        }
    }
    hidden(bool){

    }
}

class crabController {
    constructor( ){
        this.crabs = [];
        this.animProperty = 1;
        this.updateImg = false;
        this.hide = false;
        this.show = false;
        this.image = 'images/crab-walking-no-color.webp';
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
            if (this.updateImg)
                crab.updateImage(this.image);
            crab.update(this.animProperty);
        });
        if (this.updateImg)
            this.updateImg = false;
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
let t79 = false;
let t82 = false;
let t86 = false;
let t90 = false;
let t94 = false;
let t98 = false;
let t102 = false;
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
        changeImage('images/crab-walking-no-color.webp');
        crabs(1);
        t44 = true;
    } else if (!t70 && currentTime >= 70) {
        console.log("Wait for it...");
        seconds29(false, false);
        changeImage('images/crab-still.webp');
        crabs(2);
        t70 = true;
    } else if (!t75 && currentTime >= 75) {
        console.log("Dun dun dun dududu dun dududu dun dododododo...");
        changeImage('images/dancing-crab1.webp');
        crabs();
        t75 = true;
    } else if (!t79 && currentTime >= 79) {
        console.log("...");
        changeImage('images/crab-dancing-blocky.webp');
        t79 = true;
    } else if (!t82 && currentTime >= 83) {
        console.log("...(x2)");
        changeImage('images/dancing-crab2.webp');
        t82 = true;
    } else if (!t86 && currentTime >= 86.3) {
        console.log("...(x3)");
        changeImage('images/dancing-crab4.webp');
        t86 = true;
    } else if (!t90 && currentTime >= 90) {
        console.log("...(x4)");
        changeImage('images/silly-crab.webp');
        t90 = true;
    } else if (!t94 && currentTime >= 93.7) {
        console.log("...(x5)");
        changeImage('images/dancing-crab3.webp');
        t94 = true;
    } else if (!t98 && currentTime >= 97.7) {
        console.log("...(x6)");
        changeImage('images/crab-yay.webp');
        t98 = true;
    } else if (!t102 && currentTime >= 101.7) {
        console.log("Finally...");
        changeImage('images/crab-walking-no-color.webp');
        t102 = true;
    } else if (!t105 && currentTime >= 104.7) {
        console.log("*sighs in relief*... Wait, wdym there's another round?");
        changeImage('images/crab-excited.webp');
        t102 = true;
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

function changeImage(img) {
    if (controller) {
        controller.image = img;
        controller.updateImg = true;
    }
}