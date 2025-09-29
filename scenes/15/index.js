document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelectorAll(".grid input[type='button']");

    button.forEach(button =>{
        button.addEventListener("click", () =>{
            const secondImage = button.getAttribute("data-second");
            const sceneNumber = button.getAttribute("data-scene");
            button.style.backgroundImage = `url('${secondImage}')`;
            button.disabled = true;

            if(button.id === "cut17"){
                button.style.backgroundSize = "100px 100px";
                button.style.backgroundPosition = "center";
                button.style.backgroundRepeat = "no-repeat";
                setTimeout(() =>{
                    alert("You Found A Shell :D \n Now hand it over");
                }, 50);
            }else if(button.id === "cut4"){
                button.style.backgroundSize = "100px 100px";
                button.style.backgroundPosition = "center";
                button.style.backgroundRepeat = "no-repeat";
                setTimeout(() =>{
                    alert("Oh you found a scroll. I bet you wonder where it sends you. Well I know. You're going to Anti-Anti-Ireland now.");
                    if (sceneNumber) {
                    window.location.href = `/scenes/${sceneNumber}/`;
                    }
                }, 50);
            }else if(button.id === "cut22"){
                button.style.backgroundSize = "100px 100px";
                button.style.backgroundPosition = "center";
                button.style.backgroundRepeat = "no-repeat";
                setTimeout(() =>{
                    alert("Oh you found a map. That map should send you to B.L.O.R.T. Do I know what that stands for? No. Bye Bye though.")
                    if (sceneNumber) {
                    window.location.href = `/scenes/${sceneNumber}/`;
                    }
                }, 50);
            }else if(button.id === "cut44"){
                button.style.backgroundSize = "100px 100px";
                button.style.backgroundPosition = "center";
                button.style.backgroundRepeat = "no-repeat";
                setTimeout(() =>{
                    alert("Oh you found my avocado. Thanks. Was wondering where it went. They're pretty expensive yk.")
                }, 50);
            }else if(button.id === "cut28"){
                button.style.backgroundSize = "100px 100px";
                button.style.backgroundPosition = "center";
                button.style.backgroundRepeat = "no-repeat";
                setTimeout(() =>{
                    alert("...\nWhy is that here.")
                }, 50);
            }else if(button.id === "cut8"){
                button.style.backgroundSize = "100px 67px";
                button.style.backgroundPosition = "center";
                button.style.backgroundRepeat = "no-repeat";
                setTimeout(() =>{
                    alert("WOW. You really just destroyed that Turkey's home. You should feel ashamed of yourself.")
                }, 50);
            }else{
                setTimeout(() =>{
                    alert("YOU FOUND... \nNOTHING!!!");
                }, 50);
            }
        });
    });
});
