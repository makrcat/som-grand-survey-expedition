"use strict"

document.addEventListener('DOMContentLoaded', function () {

    const startButton = document.getElementById("startButton");
    const introFrame = document.getElementById("intro-wrapper");
    const game = document.getElementById("game-wrapper");
    const fluidLabel = document.getElementById("fluid_amount");
    const introHeader = introFrame.querySelector('h2');
    const introParagraph = introFrame.querySelector('p');
    const introButton = introFrame.querySelector('button')
    const outroFrame = document.getElementById("outro-wrapper")
    const bgMap = document.getElementById("backgroundMap");
    const startHardModeBtn = document.getElementById("startHardMode");
    const hardModeWrapper = document.getElementById("hardMode-wrapper")



    var CACTUS_COUNT = 15;
    const CACTUS_WIDTH = 60; // px, adjust as needed
    const CACTUS_HEIGHT = 80; // px, adjust as needed
    const CACTUS_MIN_SCALE = 0.5;
    const CACTUS_MAX_SCALE = 2;
    const CACTUS_MIN_TOP_RATIO = 0.5; // Only spawn in lower half

    var placed = [];

    var maxHearts = 5;
    var hearts = 5;
    var fluid = 0;
    var requiredFluid = 10;
    var hasWon = false;
    var waterGain = 1;
    var damageDealt = 0.5;
    var isHardMode = false;

    startButton.onclick = function () {
        if (startButton.innerHTML == "Fill it!") {
            // Animate shrine: empty -> full -> mystical -> hide -> outro
            const shrineImg = document.getElementById('intro-image');
            if (!shrineImg) {
                outroFrame.style.display = "Flex";
                return;
            }
            introButton.disabled = true;
            shrineImg.src = 'assets/water_shrine_full.png';
            setTimeout(() => {
                shrineImg.src = 'assets/water_shrine_mystical.png';
                setTimeout(() => {
                    shrineImg.style.transition = 'opacity 0.7s';
                    shrineImg.style.opacity = '0';
                    setTimeout(() => {
                        introFrame.style.display = 'none';
                        outroFrame.style.display = 'flex';
                        shrineImg.style.opacity = '1';
                        introButton.disabled = false;
                    }, 2500);
                }, 2500);
            }, 1500);
            return;
        }
        hearts = maxHearts;
        fluid = 0;
        introFrame.style.display = "none";
        game.style.display = "block";
        // Remove existing cacti
        document.querySelectorAll('.cactus').forEach(el => el.remove());
        placed.length = 0;
        for (let i = 0; i < CACTUS_COUNT; i++) {
            spawnCacti();
        }
        updateHeartsAndFluid();
        startTumbleweedInterval();
    };

    function randomBetween(a, b) {
        return Math.random() * (b - a) + a;
    }

    function isOverlapping(rect1, rect2) {
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }

    function spawnCacti() {
        let tries = 0;
        let cactus, scale, left, top, rect;
        do {
            scale = randomBetween(CACTUS_MIN_SCALE, CACTUS_MAX_SCALE);
            // Only spawn in lower half
            const minTop = game.clientHeight * CACTUS_MIN_TOP_RATIO;
            const maxTop = game.clientHeight - CACTUS_HEIGHT * scale;
            top = randomBetween(minTop, maxTop > minTop ? maxTop : minTop);

            // Further up = smaller
            scale = CACTUS_MIN_SCALE + (CACTUS_MAX_SCALE - CACTUS_MIN_SCALE) * ((top - minTop) / ((game.clientHeight - CACTUS_HEIGHT * scale) - minTop));
            left = randomBetween(0, game.clientWidth - CACTUS_WIDTH * scale);

            rect = {
                left: left,
                top: top,
                right: left + CACTUS_WIDTH * scale,
                bottom: top + CACTUS_HEIGHT * scale
            };
            tries++;
            if (tries > 100) break; // Avoid infinite loop
        } while (placed.some(r => isOverlapping(r, rect)));

        placed.push(rect);

        cactus = document.createElement('img');
        cactus.src = 'assets/cactus1.png';
        cactus.className = 'cactus';
        cactus.style.left = `${left}px`;
        cactus.style.top = `${top}px`;
        const remBase = 16; // 1rem = 16px (default browser font size)
        cactus.style.width = `${(CACTUS_WIDTH * scale) / remBase}rem`;
        cactus.style.height = `${(CACTUS_HEIGHT * scale) / remBase}rem`;
        cactus.style.zIndex = Math.floor(top); // further up = lower z-index

        // Assign random correct click: 0 = left, 2 = right
        cactus.dataset.correctClick = Math.random() < 0.5 ? "0" : "2";

        // Mouse hover logic
        cactus.addEventListener('mouseenter', function () {
            showMouseAboveCactus(cactus);
        });
        cactus.addEventListener('mouseleave', function () {
            hideMouse();
        });

        // Listen for both left and right click
        cactus.addEventListener('mousedown', function (e) {
            handleCactiClick(cactus, e.button);
        });

        game.appendChild(cactus);
    }

    function showMouseAboveCactus(cactus) {
        const mouseImg = document.getElementById('mouse');
        mouseImg.style.display = 'block';
        mouseImg.style.position = 'absolute';
        mouseImg.style.left = cactus.style.left;
        mouseImg.style.width = cactus.style.width;
        mouseImg.style.top = `calc(${cactus.style.top} - 50px)`;
        mouseImg.style.zIndex = 1001;
        if (cactus.dataset.correctClick == "2") {
            mouseImg.style.transform = 'scaleX(-1)';
        } else {
            mouseImg.style.transform = 'scaleX(1)';
        }
    }
    
    function hideMouse() {
        const mouseImg = document.getElementById('mouse');
        mouseImg.style.display = 'none';
    }

    function handleCactiClick(c, button) {
        if (hasWon) return 1;
        if (c.dataset.clicked === 'true') return;
        c.dataset.clicked = 'true';

        // 0 = left, 2 = right
        const correct = c.dataset.correctClick === String(button);
        const animDuration = 400;

        // Create feedback symbol
        const feedback = document.createElement('div');
        feedback.className = 'cactus-feedback';
        feedback.style.left = c.style.left;
        feedback.style.top = `calc(${c.style.top} - 32px)`;
        feedback.style.width = c.style.width;
        feedback.style.color = correct ? 'deepskyblue' : '#d74b4bff';
        feedback.textContent = correct ? "+"+waterGain : "-"+damageDealt;

        game.appendChild(feedback);

        // Wiggle animation
        c.style.transition = `transform ${animDuration}ms cubic-bezier(.36,.07,.19,.97)`;
        let wiggleFrames = 8;
        let wiggle = 0;
        function doWiggle() {
            if (wiggle < wiggleFrames) {
                const angle = (wiggle % 2 === 0 ? -1 : 1) * 15;
                c.style.transform = `rotate(${angle}deg)`;
                wiggle++;
                setTimeout(doWiggle, animDuration / wiggleFrames);
            } else {
                c.style.transform = 'rotate(0deg)';
                c.style.transition = 'opacity 0.7s';
                c.style.opacity = '0';
                feedback.style.opacity = '0';
                setTimeout(() => {
                    if (feedback.parentNode) feedback.parentNode.removeChild(feedback);
                    if (c.parentNode) game.removeChild(c);
                }, 700);
            }
        }

        doWiggle();
        hideMouse();

        // Remove the cactus from placed array
        const index = placed.findIndex(r =>
            Math.abs(r.left - c.style.left.replace('px', '')) < 1 &&
            Math.abs(r.top - c.style.top.replace('px', '')) < 1
        );
        if (index !== -1) placed.splice(index, 1);
        // Game Logic 
        if (correct) {
            fluid += waterGain;
        } else {
            hearts -= damageDealt;
        }
        updateHeartsAndFluid();

        if (hearts <= 0) {
            console.log("Game over");
            introFrame.style.display = "flex";

            if (introHeader) introHeader.innerHTML = "You've pricked yourself to death!";
            if (introParagraph) introParagraph.innerHTML = "But don't worry, you can try again! Just be more careful this time and I am sure you will collect enough of this mysterious fluid. Good luck!<br/>P.S. You can withstand more pricks now.";
            if (introButton) introButton.innerHTML = "Try again!"
            game.style.display = "none";
            maxHearts += 1;
            hideMouse();
            return 0;
        }

        if (fluid >= requiredFluid) {
            console.log("Game won");
            introFrame.style.display = "flex";

            if (introHeader) introHeader.innerHTML = "You've done it!";
            if (introParagraph) introParagraph.innerHTML = "You managed to collect enough of this mysterious fluid to fill up the altar. What are you waiting for? Fill it!";
            if (introButton) introButton.innerHTML = "Fill it!"
            game.style.display = "none";
            hideMouse();
            return requiredFluid;
        }

        spawnCacti();
    }

    function updateHeartsAndFluid() {
        // Dynamically add heart images if maxHearts increases
        for (let i = 1; i <= maxHearts; i++) {
            let heartImg = document.getElementById(`heart_${i}`);
            if (!heartImg) {
                // Try to clone the last heart or create a new one if none exist
                const lastHeart = document.getElementById(`heart_${i - 1}`) || document.querySelector('img[id^="heart_"]');
                if (lastHeart) {
                    heartImg = lastHeart.cloneNode(true);
                    heartImg.id = `heart_${i}`;
                    lastHeart.parentNode.insertBefore(heartImg, lastHeart.nextSibling);
                } else {
                    heartImg = document.createElement('img');
                    heartImg.id = `heart_${i}`;
                    heartImg.src = 'assets/heart_full.png';
                    // You may need to append this to the correct parent, e.g. a container for hearts
                    fluidLabel.parentNode.insertBefore(heartImg, fluidLabel);
                }
            }
            if (hearts >= i) {
                heartImg.src = 'assets/heart_full.png';
            } else if (hearts >= i - 0.5) {
                heartImg.src = 'assets/heart_half.png';
            } else {
                heartImg.src = 'assets/heart_empty.png';
            }
        }
        // Remove extra hearts if maxHearts decreased
        let i = maxHearts + 1;
        while (true) {
            const extraHeart = document.getElementById(`heart_${i}`);
            if (!extraHeart) break;
            extraHeart.parentNode.removeChild(extraHeart);
            i++;
        }
        fluidLabel.innerHTML = `${fluid}/${requiredFluid}`;
    }

    // Call this whenever hearts changes
    updateHeartsAndFluid();

    let tumbleweedInterval;
    function startTumbleweedInterval() {
        if (tumbleweedInterval) clearInterval(tumbleweedInterval);
        function scheduleTumbleweed() {
            if (tumbleweedInterval) clearTimeout(tumbleweedInterval);
            if (game.style.display != "none") tumbleweed();
            const nextTime = Math.random() * 4000 + 8000; // 8000ms to 12000ms
            tumbleweedInterval = setTimeout(scheduleTumbleweed, nextTime);
        }
        scheduleTumbleweed();
    }

    function tumbleweed() {
        // Determine random direction: true = left to right, false = right to left
        const leftToRight = Math.random() < 0.5;

        // Use cactus size logic
        let scale = randomBetween(CACTUS_MIN_SCALE, CACTUS_MAX_SCALE);
        const minTop = game.clientHeight * CACTUS_MIN_TOP_RATIO;
        const maxTop = game.clientHeight - CACTUS_HEIGHT * scale;
        let top = randomBetween(minTop, maxTop > minTop ? maxTop : minTop);

        // Further up = smaller
        scale = CACTUS_MIN_SCALE + (CACTUS_MAX_SCALE - CACTUS_MIN_SCALE) * ((top - minTop) / ((game.clientHeight - CACTUS_HEIGHT * scale) - minTop));
        const remBase = 16;
        const width = (CACTUS_WIDTH * scale) / remBase;
        const height = (CACTUS_HEIGHT * scale) / remBase;

        // Create tumbleweed element
        const tumbleweed = document.createElement('img');
        tumbleweed.src = 'assets/tumbleweed.png';
        tumbleweed.className = 'tumbleweed';
        tumbleweed.style.position = 'absolute';
        tumbleweed.style.width = `${width}rem`;
        tumbleweed.style.height = `${height}rem`;
        tumbleweed.style.top = `${top}px`;
        tumbleweed.style.zIndex = Math.floor(top);

        // Start and end positions
        const startLeft = leftToRight ? -CACTUS_WIDTH * scale : game.clientWidth;
        const endLeft = leftToRight ? game.clientWidth : -CACTUS_WIDTH * scale;
        tumbleweed.style.left = `${startLeft}px`;

        // Animation: roll and bounce
        const duration = randomBetween(4000, 7000); // ms
        const bounceHeight = randomBetween(10, 30) * scale; // px

        // Keyframes for bounce and roll
        const keyframes = [
            {
                left: `${startLeft}px`,
                transform: `rotate(0deg) translateY(0px)`
            },
            {
                offset: 0.25,
                transform: `rotate(${leftToRight ? 180 : -180}deg) translateY(-${bounceHeight}px)`
            },
            {
                offset: 0.5,
                transform: `rotate(${leftToRight ? 360 : -360}deg) translateY(0px)`
            },
            {
                offset: 0.75,
                transform: `rotate(${leftToRight ? 540 : -540}deg) translateY(-${bounceHeight}px)`
            },
            {
                left: `${endLeft}px`,
                transform: `rotate(${leftToRight ? 720 : -720}deg) translateY(0px)`
            }
        ];

        tumbleweed.animate(keyframes, {
            duration: duration,
            easing: 'linear'
        });

        // Animate left property manually for compatibility
        tumbleweed.style.transition = `left ${duration}ms linear`;
        setTimeout(() => {
            tumbleweed.style.left = `${endLeft}px`;
        }, 10);

        // Remove tumbleweed after animation
        setTimeout(() => {
            if (tumbleweed.parentNode) tumbleweed.parentNode.removeChild(tumbleweed);
        }, duration + 100);

        game.appendChild(tumbleweed);
    }

    function listenForSecretWord(word = "hard") { // congrats, you found the secret word, now you ruined the game for you, yay
        // Please don't tell anyone, so others can have fun! Ty
        let buffer = "";
        document.addEventListener('keydown', function (e) {
            //if (getComputedStyle(game).display === "none") {
            //    return;
            //}
            if (e.key.length === 1) {
                buffer += e.key.toLowerCase();
                if (buffer.length > word.length) {
                    buffer = buffer.slice(-word.length);
                }
                if (buffer === word) {
                    initHardMode();
                    buffer = ""; 
                    console.log("Hard!!!");// Prevent repeated triggers
                }
            }
        });
    }
    listenForSecretWord();

    function initHardMode() {
        document.documentElement.style.filter = "grayscale(100%)";
        document.documentElement.style.setProperty('--color-background', '#222');
        document.documentElement.style.setProperty('--color-primary', '#f0f0f0');
        document.documentElement.style.setProperty('--color-secondary', '#383737');
        document.documentElement.style.setProperty('--color-secondary-hover', '#666');
        document.documentElement.style.setProperty('--color-fluid-text', '#f0f0f0');
        if (bgMap) {
            bgMap.style.filter = "invert(100%)";
        }
        if (hardModeWrapper) {
            hardModeWrapper.style.display = "flex";
        }
        game.style.display = "none";
        introFrame.style.display = "none";
        outroFrame.style.display = "none";
        if (startHardModeBtn) {
            startHardModeBtn.addEventListener("click", playHardMode);
        }
        return -1;
    }

    function playHardMode() {
        isHardMode = true;
        CACTUS_COUNT = 7
        requiredFluid = 50;
        fluid = 0;
        damageDealt = 2;
        hearts = 5;
        maxHearts = 5;

        document.getElementById("flashlight").style.display = "block";
        hardModeWrapper.style.display = "none";
        game.style.display = "block";
        // Remove existing cacti
        document.querySelectorAll('.cactus').forEach(el => el.remove());
        placed = [];
        placed.length = 0;
        for (let i = 0; i < CACTUS_COUNT; i++) {
            spawnCacti();
        }
        updateHeartsAndFluid();
        startTumbleweedInterval();

        let mouseX = 0;
        let mouseY = 0;
        let flashlight = document.getElementById("flashlight");

        function getMousePosition(e) {
            if (!isHardMode) return;
            mouseX = e.pageX;
            mouseY = e.pageY;
            flashlight.style.setProperty("--Xpos", mouseX + "px");
            flashlight.style.setProperty("--Ypos", mouseY + "px");
        }
        document.addEventListener("mousemove", getMousePosition);

    }
    document.addEventListener('contextmenu', event => event.preventDefault());
});

//Who doesn't like cacti?