//Sorry I had to use chaGPT becaz I have my maths mid term on monday , If spend my time on enitrely on coding I may not able to study so like 40-50% part here is ai gen 

document.addEventListener('DOMContentLoaded', () => {

    const containers = document.querySelectorAll('.container');
    const octopus = document.getElementById('octopus');
    const targetIndexes = [1, 2, containers.length - 1];
  
    const observer = new IntersectionObserver((entries) => {
      let shouldShow = false;
      entries.forEach(entry => {
        const index = Array.from(containers).indexOf(entry.target);
        if (targetIndexes.includes(index) && entry.isIntersecting) {
          shouldShow = true;
        }
      });
      if (shouldShow) octopus.classList.add('show');
      else octopus.classList.remove('show');
    }, { threshold: 0 });
  
    targetIndexes.forEach(i => observer.observe(containers[i]));

    const audio1 = document.getElementById('audio');
    const audioBtn1 = document.getElementById('audioBtn');
    const icon1 = audioBtn1.querySelector('.material-icons');
  
    audioBtn1.addEventListener('click', () => {
      if (audio1.paused) { audio1.play(); icon1.textContent = 'pause'; }
      else { audio1.pause(); icon1.textContent = 'play_arrow'; }
    });
    audio1.addEventListener('ended', () => { icon1.textContent = 'play_arrow'; });
  
    const audio2 = document.getElementById('audio-2');
    const audioBtn2 = document.getElementById('audioBtn2');
    const icon2 = audioBtn2.querySelector('.material-icons');
  
    audioBtn2.addEventListener('click', () => {
      if (audio2.paused) { audio2.play(); icon2.textContent = 'pause'; }
      else { audio2.pause(); icon2.textContent = 'play_arrow'; }
    });
    audio2.addEventListener('ended', () => { icon2.textContent = 'play_arrow'; });
  

    const modal = document.getElementById("decipherModal");
    const modalOpenBtn = document.querySelector(".btn"); 
    const modalCloseBtn = modal.querySelector(".close");
    const decodeBtn = document.getElementById("decodeBtn");
    const currentCodeEl = document.getElementById("currentCode");
    const resultEl = document.getElementById("decodeResult");
    const glubBtns = document.querySelectorAll(".glubBtn");
    const clearBtn = document.getElementById("clearBtn");
    const successAudio = document.getElementById("successAudio");
    const celebrationContainer = document.getElementById("celebration");
  
    let currentCode = [];
  
    const glubDictionary = {
      "glub": "Hi",
      "glub glub": "How are you",
      "blub": "I",
      "blub blub": "am coding",
      "slub": "Let's",
      "slub slub": "Let's explore",
      "plub": "Goodbye",
      "plub plub": "See you later"
    };
  

    modalOpenBtn.addEventListener('click', () => modal.style.display = 'flex');
  

    modalCloseBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
  
    function closeModal() {
      modal.style.display = 'none';
      currentCode = [];
      currentCodeEl.innerText = '';
      resultEl.innerText = '';
    }
  
  
    glubBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = e.target.innerText;
        currentCode.push(text);
        currentCodeEl.innerText = currentCode.join(" ");
        createBubble(e.target);
      });
    });
  

    clearBtn.addEventListener('click', () => {
      currentCode = [];
      currentCodeEl.innerText = '';
    });
  

    decodeBtn.addEventListener('click', () => {
        const codeStr = currentCode.join(" ").toLowerCase().trim();
    
        if (glubDictionary[codeStr]) {
       
            successAudio.src = "12.mp3";
            successAudio.play();
    
            if (codeStr === "glub glub") {
           
                decodeBtn.innerText = "Next Scene";
                decodeBtn.classList.add("nextSceneBtn");
                resultEl.innerText = "Monster has allowed!Yippe Now You shall pass to next page";
                triggerCelebration();
    
               
                decodeBtn.replaceWith(decodeBtn.cloneNode(true));
                const nextBtn = document.querySelector(".nextSceneBtn");
    
               
                nextBtn.addEventListener('click', () => {
                    window.location.href = "nextScene.html"; 
                });
            } else {
                resultEl.innerText = glubDictionary[codeStr];
                triggerCelebration();
            }
        } else {
            resultEl.innerText = "Unknown Glub code!";
        }
    });
    ;
  
    // ---------------------------
    // BUBBLE ANIMATION
    // ---------------------------
    function createBubble(button) {
      const bubble = document.createElement("div");
      bubble.classList.add("bubbleAnim");
      const rect = button.getBoundingClientRect();
      bubble.style.left = rect.left + rect.width / 2 + "px";
      bubble.style.top = rect.top + "px";
      document.body.appendChild(bubble);
      setTimeout(() => bubble.remove(), 1000);
    }
  
    // ---------------------------
    // CELEBRATION ANIMATION
    // ---------------------------
    function triggerCelebration() {
      for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        sparkle.style.left = Math.random() * celebrationContainer.offsetWidth + "px";
        sparkle.style.top = Math.random() * celebrationContainer.offsetHeight + "px";
        celebrationContainer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
      }
    }
  
  });
  