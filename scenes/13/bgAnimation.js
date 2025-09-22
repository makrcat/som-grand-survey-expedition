console.log("hi get out of the console :3");

// Set up canvas
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

// Stop/ start bg movement button
const isMovingBtn = document.getElementById("move");
let isMoving = true;

// Bg settings
const cellSize = 100;
const speedX = -0.4;
const speedY = 0.7;

let cells = [];
let lastTime = 0;
const fpsInterval = 1000 / 60;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cells = [];
  generateCells();
}

// Load Imgs
const imgsSource = [
  "./assets/sheep.png",
  "./assets/shamrock1.png",
  "./assets/hat.png",
  "./assets/rain.png",
  "./assets/lyre.png",
  "./assets/rainbow.png",
];

let bgImages = [];
for (let src of imgsSource) {
  const img = new Image();
  img.src = src;
  bgImages.push(img);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Shuffle helper function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate cells
function generateCells() {
  cells = [];
  // Use a slight buffer to ensure no gaps at the edges during movement
  const cols = Math.ceil(canvas.width / cellSize) + 2;
  const rows = Math.ceil(canvas.height / cellSize) + 2;

  // Start the grid off-screen to create a seamless loop
  const startX = -cellSize;
  const startY = -cellSize;

  for (let r = 0; r < rows; r++) {
    let rowImgs = shuffle([...bgImages]);

    for (let c = 0; c < cols; c++) {
      cells.push({
        type: "image",
        value: rowImgs[c % rowImgs.length],
        x: startX + c * cellSize,
        y: startY + r * cellSize,
      });
    }
  }
}

// Draw cells
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let cell of cells) {
    ctx.globalAlpha = 0.3;
    ctx.drawImage(
      cell.value,
      cell.x - cellSize / 2,
      cell.y - cellSize / 2,
      cellSize,
      cellSize
    );
  }
}

// Update cells' positions
function update(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const elapsed = timestamp - lastTime;

  if (elapsed > fpsInterval) {
    lastTime = timestamp - (elapsed % fpsInterval);

    for (let cell of cells) {
      cell.x += speedX;
      cell.y += speedY;

      // Wrap cells so they re-enter aligned
      if (cell.x > canvas.width + cellSize * 2.7) {
        cell.x -= canvas.width + cellSize * 2.7;
      } else if (cell.x < -cellSize * 2.7) {
        cell.x += canvas.width + cellSize * 2.7;
      }

      if (cell.y > canvas.height + cellSize * 2.7) {
        cell.y -= canvas.height + cellSize * 2.7;
      } else if (cell.y < -cellSize * 2.7) {
        cell.y += canvas.height + cellSize * 2.7;
      }
    }
  }
}

// Animation loop
let animationId;

function animate(timestamp) {
  update(timestamp);
  draw();
  animationId = requestAnimationFrame(animate);
}

// Start animation
animationId = requestAnimationFrame(animate);

// Button toggles movement
isMovingBtn.addEventListener("click", () => {
  isMoving = !isMoving;

  if (isMoving) {
    animationId = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(animationId);
  }
});
