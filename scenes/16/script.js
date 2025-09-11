// Available Animations
const crabAnimations = [
    'crab-dancing-blocky',
    'crab-excited',
    'crab-yay',
    'dancing-crab1',
    'dancing-crab2',
    'dancing-crab3',
    'dancing-crab4',
    'minecraft-crab',
    'silly-crab'
];

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
            case 3: // animation 3: Crabs walking sideways (reversed).
                this.speed = 2;
                this.element.style.filter = `brightness(0)`;
                if (this.x < window.innerWidth) {
                    this.x -= this.speed;
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
            case 4: // animation 4: hue shift
                this.hue += 10;
                this.element.style.filter = `sepia(50%) saturate(1000%) contrast(180%) hue-rotate(${this.hue}deg)`;
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
    randomImage(){
        const index = Math.floor(Math.random() * crabAnimations.length);
        this.image = `images/${crabAnimations[index]}.webp`;
        this.element.style.backgroundImage = `url(${this.image})`;

        this.width = Math.random() * 150 + 50;
        const height = this.width * 0.8;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${height}px`;


        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight - height);

        this.element.style.left = `${this.x}px`;
        this.element.style.bottom = `${this.y}px`;
    }
}

class crabController {
    constructor( ){
        this.crabs = [];

        this.crabsElement = document.createElement('div');
        this.crabsElement.classList.add('crab-container');

        this.animProperty = 1;

        this.updateImg = false;
        this.hide = false;
        this.show = false;

        this.changeRandom = false;

        this.image = 'images/crab-walking-no-color.webp';
        this.spawnCrabs(20);
    }
    spawnCrabs(num){
        for (let i = 0; i < num; i++) {
            const crab1 = new crab();
            this.crabs.push(crab1);
            this.crabsElement.appendChild(crab1.element);
        }
    }
    appendCrabs(scene){
        scene.appendChild(this.crabsElement);
    }
    handleCrabs() {
        this.crabs.forEach(crab => {
            if (this.updateImg) crab.updateImage(this.image);
            if (this.hide) crab.element.hidden = true;
            if (this.show) crab.element.hidden = false;
            if (this.changeRandom) crab.randomImage();
            crab.update(this.animProperty);
        });
        if (this.updateImg) this.updateImg = false;
        if (this.hide) this.hide = false;
        if (this.show) this.show = false;
        if (this.changeRandom) this.changeRandom = false;
    }
    animate = () => {
        this.handleCrabs();
        requestAnimationFrame(this.animate);
    };
}

var player;
let hasStartedPlaying = false;
const scene = document.getElementById('scene');
scene.hidden = false;
const content = document.getElementById('content');
content.hidden = true;
let controller;

// Video loader
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
            width: '640',
            height: '390',
            videoId: 'LDU_Txk06tM',
            playerVars: {
                'rel': 0,
                'modestbranding': 0,
                'controls': 0,
            },
            events: {
                onStateChange: onPlayerStateChange
            }
    });
}

// Function to initiate/terminate timer
let interval;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        if (!hasStartedPlaying) {
            hasStartedPlaying = true;
            document.getElementById('info').hidden = true;
            document.getElementById('text-wrapper').style.display = 'none';
            document.getElementById('arrow').style.display = 'none';
            const videoWrapper = document.getElementById('video-wrapper');
            if (window.innerWidth > 600){
                videoWrapper.style.width = '622px';
                videoWrapper.style.height = '350px';
            } else {
                videoWrapper.style.width = '420px';
                videoWrapper.style.height = '236px';
            }
            interval = setInterval(checkVideoTime, 100);
        }
    } else if (event.data == YT.PlayerState.ENDED) {
        if (hasStartedPlaying) {
            hasStartedPlaying = false;
            clearInterval(interval);
            scene.hidden = true;
            content.hidden = false;
        }
    }
}

// Check points in the video
const t = {
    '29' : false,
    '36' : false,
    '44' : false,
    '70' : false,
    '75' : false,
    '79' : false,
    '82' : false,
    '86' : false,
    '90' : false,
    '94' : false,
    '98' : false,
    '102' : false,
    '105' : false,
    '129' : false,
    '138' : false,
    '140' : false,
    '144' : false,
    '148' : false,
    '152' : false,
    '155' : false,
    '159' : false,
    '163' : false,
    '167' : false,
    '185' : false
};

function checkVideoTime() {
    const currentTime = player.getCurrentTime();
    if (!t['29'] && currentTime >= 29) {
        console.log("The crabs are snapping!");
        seconds29(true, false);
        t['29'] = true;
    } else if (!t['36'] && currentTime >= 36) {
        console.log("More crabs!");
        t['36']= true;
        seconds36(true);
    } else if (!t['44'] && currentTime >= 44) {
        console.log("They are marching?");
        seconds29(false, true);
        seconds36(false);
        changeImage('images/crab-walking-no-color.webp');
        crabs(1);
        t['44']= true;
    } else if (!t['70'] && currentTime >= 70) {
        console.log("Wait for it...");
        seconds29(false, false);
        changeImage('images/crab-still.webp');
        crabs(2);
        t['70']= true;
    } else if (!t['75'] && currentTime >= 75) {
        console.log("Dun dun dun dududu dun dududu dun dododododo...");
        changeImage('images/dancing-crab1.webp');
        crabs();
        t['75']= true;
    } else if (!t['79'] && currentTime >= 78.8) {
        console.log("...");
        changeImage('images/crab-dancing-blocky.webp');
        t['79']= true;
    } else if (!t['82'] && currentTime >= 83) {
        console.log("...(x2)");
        changeImage('images/dancing-crab2.webp');
        t['82']= true;
    } else if (!t['86'] && currentTime >= 86.3) {
        console.log("...(x3)");
        changeImage('images/dancing-crab4.webp');
        t['86']= true;
    } else if (!t['90'] && currentTime >= 90) {
        console.log("...(x4)");
        changeImage('images/silly-crab.webp');
        t['90']= true;
    } else if (!t['94'] && currentTime >= 93.7) {
        console.log("...(x5)");
        changeImage('images/dancing-crab3.webp');
        t['94']= true;
    } else if (!t['98'] && currentTime >= 97.7) {
        console.log("...(x6)");
        changeImage('images/crab-yay.webp');
        t['98']= true;
    } else if (!t['102'] && currentTime >= 101.7) {
        console.log("Finally...");
        changeImage('images/minecraft-crab.webp');
        t['102'] = true;
    } else if (!t['105'] && currentTime >= 105.5) {
        controller.spawnCrabs(30);
        console.log("*sighs in relief*... Wait, wdym there's another round?");
        controller.crabsElement.hidden = true;
        crabs();
        changeImage('images/crab-still.webp');
        t['105'] = true;
    } else if (!t['129'] && currentTime >= 129) {
        console.log("Here it comes again...");
        controller.crabsElement.hidden = false;
        t['129'] = true;
    } else if (!t['138'] && currentTime >= 138) {
        console.log("...");
        crabs(4);
        controller.changeRandom = true;
        t['138'] = true;
    } else if (!t['140'] && currentTime >= 140) {
        console.log("...(x2)");
        controller.changeRandom = true;
        t['140'] = true;
    } else if (!t['144'] && currentTime >= 144) {
        console.log("...(x3)");
        controller.changeRandom = true;
        t['144'] = true;
    } else if (!t['148'] && currentTime >= 148) {
        console.log("...(x4)");
        controller.changeRandom = true;
        t['148'] = true;
    } else if (!t['152'] && currentTime >= 151.7) {
        console.log("...(x5)");
        controller.changeRandom = true;
        t['152'] = true;
    } else if (!t['155'] && currentTime >= 155) {
        console.log("...(x6)");
        controller.changeRandom = true;
        t['155'] = true;
    } else if (!t['159'] && currentTime >= 159) {
        console.log("...(x7)");
        controller.changeRandom = true;
        t['159'] = true;
    } else if (!t['163'] && currentTime >= 163) {
        console.log("...(x8)");
        controller.changeRandom = true;
        t['163'] = true;
    } else if (!t['167'] && currentTime >= 167) {
        console.log("Bye, bye crabs :)");
        changeImage('images/crab-walking-no-color.webp');
        crabs(3);
        t['167'] = true;
    } else if (!t['185'] && currentTime >= 185) {
        controller.crabsElement.remove();
        controller.crabs = [];
        controller = null;
        console.log("Good night :)");
        t['185'] = true;
    }
}

// Functions used in checkVideoTime ↑
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

function play() {
    player.playVideo();
}

// The cool easter egg (¯\_(ツ)_/¯)
const title = document.querySelector('.kablammo-title-text');
let MORF = 0;
let reverse = false;
const increment = 0.01;
titleAnimation();
function titleAnimation() {
    MORF = Math.max(0, Math.min(60, MORF + (reverse ? -increment : increment)));
    if (MORF <= 0 || MORF >= 60) {
        reverse = !reverse;
    }
    title.style.fontVariationSettings = `"MORF" ${MORF}`;
    requestAnimationFrame(titleAnimation);
}