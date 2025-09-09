document.addEventListener('DOMContentLoaded', () => {
  const counterElement = document.getElementById("counter");
  let attackCount = localStorage.getItem("dragonAttackCount") || 0;
  counterElement.innerText = attackCount;

  const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let input = [];
  window.addEventListener("keydown", (e) => {
    input.push(e.keyCode);
    if (input.toString().includes(konami)) {
      alert("✨ You summoned the Splorgon Dragon! ✨");
      input = [];
    }
  });

  const hotspots = document.querySelectorAll('.hotspot');
  const tooltip = document.getElementById('tooltip');

  const sounds = {
    'hands-off': new Audio('sounds/voice/hands-off.mp3'),
    'dragon-poke': new Audio('sounds/voice/dragon-poke.mp3')
  };
  sounds['hands-off'].volume = 0.7;
  sounds['dragon-poke'].volume = 1.0;

  hotspots.forEach(spot => {
    spot.dataset.clickCount = 0;
    spot.dataset.originalSound = spot.dataset.sound;

    const originalSound = new Audio(spot.dataset.originalSound);
    originalSound.volume = parseFloat(spot.dataset.volume) || 1.0;

    spot.addEventListener('mouseenter', () => {
      tooltip.innerText = spot.dataset.rune;
      tooltip.style.display = 'block';
    });
    spot.addEventListener('mousemove', e => {
      tooltip.style.left = (e.clientX + 15) + 'px';
      tooltip.style.top = (e.clientY - 20) + 'px';
    });
    spot.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
    spot.addEventListener('click', () => {
      let count = parseInt(spot.dataset.clickCount, 10);
      count++;

      if (spot.id === 'dragon-img') {
        handleDragonClick(spot, count, originalSound);
      } else if (spot.id === 'island') {
        null
      } else {
        handleTreeClick(spot, count, originalSound);
      }

      spot.dataset.clickCount = count;
    });


  });

  function handleTreeClick(spot, count, sound) {
    const cycle = count % 4;
    if (cycle === 1) {
      sound.currentTime = 0;
      sound.play();
    } else if (cycle === 2 || cycle === 3) {
      sounds['hands-off'].currentTime = 0;
      sounds['hands-off'].play();
    } else {
      sound.currentTime = 0;
      sound.play();
    }
  }

  function handleDragonClick(spot, count, sleepingSound) {
    const dragonImg = spot;

    if (count % 4 === 1) {
      sleepingSound.currentTime = 0;
      sleepingSound.play();
      if (dragonImg.src.includes('dragon-attack')) {
        dragonImg.style.opacity = '0';
        setTimeout(() => {
          dragonImg.src = 'images/dragon-sleeping.png';
          dragonImg.style.opacity = '1';
        }, 500);
      }
    } else if (count % 4 === 2 || count % 4 === 3) { // are you regreting?
      sounds['dragon-poke'].currentTime = 0;
      sounds['dragon-poke'].play();

      if (!dragonImg.src.includes('dragon-attack')) {
        dragonImg.style.opacity = '0';
        setTimeout(() => {
          dragonImg.src = 'images/dragon-attack.png';
          dragonImg.style.opacity = '1';

          const fireball = document.getElementById('fireball');
          fireball.classList.add('animate');

          const overlay = document.getElementById('fire-overlay');
          setTimeout(() => {
            overlay.style.display = 'block';
            requestAnimationFrame(() => {
              overlay.style.opacity = '1';
            });
            setTimeout(() => {
              overlay.style.opacity = '0';
              setTimeout(() => {
                overlay.style.display = 'none';
              }, 300);
            }, 200);
          }, 800);

          fireball.addEventListener('animationend', () => {
            fireball.classList.remove('animate');
          }, { once: true });

          attackCount++;
          counterElement.innerText = attackCount;
          localStorage.setItem("dragonAttackCount", attackCount);
        }, 500);
      }
    } else {
      sleepingSound.currentTime = 0;
      sleepingSound.play();
      dragonImg.style.opacity = '0';
      setTimeout(() => {
        dragonImg.src = 'images/dragon-sleeping.png';
        dragonImg.style.opacity = '1';
      }, 500);
    }
  }
});