
let gameInstance = null;

function resizeCanvas() {
    const canvas = document.getElementById("gameCanvas");

    let section = document.getElementById("canvasSection");
    const width = section.getBoundingClientRect().width
    const height = section.getBoundingClientRect().height
    console.log("SIZEWIDTH: " + width + " "  + height)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    if (!gameInstance){
        return; 
    }
    gameInstance.resize_game(Number(width), Number(height))
    
  }
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

document.getElementById("gameSectionReturn").addEventListener("click",(event)=>{
    if (gameInstance && gameInstance.shutdown_game) {
        gameInstance.shutdown_game(); // call c++ cleanup function
        gameInstance = null;
      }


    document.getElementById('websiteSection').style.display = "block";
    document.getElementById('gameSection').style.display = "none";

   
})
document.getElementById("playButton").addEventListener("click",(event)=>{
    document.getElementById('websiteSection').style.display = "none"
    document.getElementById('gameSection').style.display = "block";
    document.getElementById('gameCanvas').focus()
    
    
    MyGame({
        locateFile: function (path, prefix) {
        if (path.endsWith(".data")) {
            return "files/webGame/" + path;
        }
        return prefix + path;
        },
        canvas: document.getElementById('gameCanvas'),
    }).then((instance) => {
      console.log("WASM module loaded.");
      gameInstance = instance;
      resizeCanvas();
    });
})


document.getElementById("githubLink").addEventListener("click",(event)=>{
    window.open("https://github.com/Druidman/minecraft-clone-opengl", "_blank");
    console.log("GitHub logo clicked");
})




