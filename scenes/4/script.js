// Hug image paths + names
const hugImages = [
  { src: "assets/Back-hug.png", name: "Back Hug" },
  { src: "assets/Bear-hug.png", name: "Bear Hug" },
  { src: "assets/Buddy-hug-1.png", name: "Buddy Hug" },
  { src: "assets/Catcher-hug.png", name: "Catcher Hug" },
  { src: "assets/Cuddled-hug.png", name: "Cuddled Hug" },
  { src: "assets/Flirty-hug-1.png", name: "Flirty Hug" },
  { src: "assets/Hug-around-the-waist.png", name: "Hug Around the Waist" },
  { src: "assets/Long-hug.png", name: "Long Hug" },
  { src: "assets/One-side-hug.png", name: "One-side Hug" },
  { src: "assets/Patting-hug-1.png", name: "Patting Hug" },
  { src: "assets/Polite-hug_.png", name: "Polite Hug" },
  { src: "assets/Side-hug.png", name: "Side Hug" },
  { src: "assets/Ragdoll-hug.png", name: "Ragdoll Hug" },
  { src: "assets/Self-hug-1.png", name: "Self Hug" },
  { src: "assets/Slow-dance-hug-1.png", name: "Slow Dance Hug" },
  { src: "assets/Straddle-hug.png", name: "Straddle Hug" },
  { src: "assets/The-eye-to-eye-hug-1.png", name: "Eye-to-Eye Hug" },
  { src: "assets/The-friend-hug.png", name: "Friend Hug" },
  { src: "assets/The-head-on-shoulder-hug-1.png", name: "Head-on-Shoulder Hug" },
  { src: "assets/The-Heart-To-Heart-hug.png", name: "Heart-to-Heart Hug" },
  { src: "assets/Tight-hug.png", name: "Tight Hug" },
  { src: "assets/x2.png", name: "London bridge hug" },
  { src: "assets/x3.png", name: "The twirling-you-around hug" },
  { src: "assets/x4.png", name: "The resting-heads-on-each-other hug" }
];

// Track already collected hugs
let countedHugs = new Set();

function showRandomHug() {
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popupContent");

  // Random hug index
  const randomIndex = Math.floor(Math.random() * hugImages.length);

  // Count only first-time hugs
  if (!countedHugs.has(randomIndex)) {
    countedHugs.add(randomIndex);
  }

  // Update counter
  document.getElementById("hugCounter").innerText =
    `Hugs collected: ${countedHugs.size} / ${hugImages.length}`;

  // Show completion popup if all hugs collected
  if (countedHugs.size === hugImages.length) {
    popupContent.innerHTML = `
      <p style="font-size:18px; text-align:center; margin:20px 0;">
        Traveller, you have collected all the 24 hugs! Congratulations! 🎉 <br> 
        You are worthy of visiting two secret locations.
      </p>
      <a href="/scenes/36/" style="color:#ff6f61; text-decoration:underline; display:block; text-align:center; margin-bottom:10px;">
        The Sea of Glub.
      </a>
      <a href="/scenes/72/" style="color:#ff6f61; text-decoration:underline; display:block; text-align:center; margin-bottom:10px;">
        The River Glub.
      </a>
      <button class="close-btn" onclick="closePopup()">Close</button>
    `;
  } else {
    // Show hug image + name
    popupContent.innerHTML = `
      <img src="${hugImages[randomIndex].src}" alt="Random Hug">
      <p style="margin-top:10px; font-weight:bold;">${hugImages[randomIndex].name}</p>
      <button class="close-btn" onclick="closePopup()">Close</button>
    `;
  }

  popup.classList.add("show");
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.classList.remove("show");
}

// ESC key closes popup
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closePopup();
});

// Clicking outside popup closes it
document.getElementById("popup").addEventListener("click", e => {
  if (e.target.id === "popup") closePopup();
});

// Hook up the main button
document.getElementById("hugButton").addEventListener("click", e => {
  e.preventDefault();
  showRandomHug();
});
