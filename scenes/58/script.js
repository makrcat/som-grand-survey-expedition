

function start() {
    startGame();
    console.log("started")
    fadeOutStart();

    const audio = document.getElementById("bgm");
    audio.muted = false;
    audio.currentTime = 0;
    audio.play();
}



function fadeOutStart() {
    document.getElementById("gps").classList.add("fadeout");
}

function putthatback() {
    document.getElementById("gps").classList.remove("fadeout");
}

function startGame() {
    const woof = document.getElementById("woof");
    const arf = document.getElementById("arf");
    const alien = document.getElementById("alien");
    const bell = document.getElementById("bell");
    const drum = document.getElementById("drum");
    const pop = document.getElementById("pop");
    const mp_e = document.getElementById("mp_e");
    const fireSOUND = document.getElementById("fireSOUND");

    // horrible way of doing this but it's ok lmao
    const spriteBig = document.getElementById("big");
    const spriteSmall = document.getElementById("small");

    const spritePuff = document.getElementById("puff");
    const spritePlant = document.getElementById("plant");
    const spriteOg = document.getElementById("og");
    const spritePink = document.getElementById("pink");
    const spriteGreen = document.getElementById("green");
    const spriteFire = document.getElementById("fire");
    const spriteBlue = document.getElementById("blue");


    const thingys = [
        new thingy(spriteBig, "big_idle1.png", "big_idle2.png", "big_sing.png", "q", woof),
        new thingy(spriteSmall, "small_idle1.png", "small_idle2.png", "small_sing.png", "w", arf),
        new thingy(spritePuff, "puff1.png", "puff2.png", "puff3.png", "e", pop),
        new thingy(spritePlant, "plant1.png", "plant2.png", "plant3.png", "a", mp_e),
        new thingy(spriteOg, "og1.png", "og2.png", "og3.png", "s", drum),
        new thingy(spritePink, "pink1.png", "pink2.png", "pink3.png", "d", alien),
        new thingy(spriteGreen, "green1.png", "green2.png", "green3.png", "z", alien),
        new thingy(spriteFire, "fire1.png", "fire2.png", "fire2.png", "c", fireSOUND),


        new thingy(spriteBlue, "blue1.png", "blue2.png", "blue3.png", "x", bell),
    ];

    setInterval(() => {
        thingys.forEach(thingy => thingy.updateIdle());
    }, 500);
}

class thingy {
    constructor(element, idle1, idle2, singImg, charKey, audioEl) {
        this.element = element;
        this.idle1 = idle1;
        this.idle2 = idle2;
        this.singImg = singImg;
        this.charKey = charKey;
        this.currentIdle = this.idle1;
        this.isSinging = false;

        this.audioEl = audioEl;
        this.element.src = this.currentIdle;

        window.addEventListener("keydown", (e) => {
            if (e.key.toLowerCase() === this.charKey.toLowerCase()) {
                this.startSing();
            }
        });

        window.addEventListener("keyup", (e) => {
            if (e.key.toLowerCase() === this.charKey.toLowerCase()) {
                this.stopSing();
            }
        });
    }

    updateIdle() {
        if (this.isSinging) return;

        this.currentIdle = (this.currentIdle === this.idle1) ? this.idle2 : this.idle1;
        this.element.src = this.currentIdle;
    }

    startSing() {
        if (!this.isSinging) {
            this.isSinging = true;
            this.element.src = this.singImg;
            this.element.style.filter = "brightness(1.3) drop-shadow(0 0 10px goldenrod)";

            this.audioEl.currentTime = 0;
            this.audioEl.play();
        }
    }

    stopSing() {
        if (this.isSinging) {
            this.isSinging = false;
            this.element.src = this.currentIdle;
            this.element.style.filter = "none";
        }
    }
}


let loaderRotation = 0;

window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "c") {
        loaderRotation -= 5;
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.transform = `rotate(${loaderRotation}deg)`;
        }
    }
});

