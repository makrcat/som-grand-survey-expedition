var chest = document.getElementById("chest");
var key = document.getElementById("key");
var jellieBtn = document.getElementById("jellie-btn");
var jellieText = document.getElementById("jellie-text");
var jellieFloor = document.getElementById("cat-floor");
var jellieBox = document.getElementById("cat-box");
var finalBox = document.getElementById("final");
var text1 = document.getElementById("up");
var text2 = document.getElementById("2");
var text3 = document.getElementById("3");
var props3 = document.getElementById("props3");
var text4 = document.getElementById("4");
var text5 = document.getElementById("5");

var key_collected = false;

const jellie_talk = [["I am the guard of the treasure.", "Ok. Can I have it?"], 
                    ["You came all this way just for this?", "Yes, the chest is shiny, I want it!"],
                    ["Alright you ignored all the signs so I guess I can't do anything to get you to go away..", "Right, now let me pass!"],
                    ["But let me tell ya <a href='/scenes/65/'>The Forbidden Sector</a> is a place you don't want to miss.", "I don't care, now let me pass!"],
                    ["Yes yes, but be warned the secret is not what it seems to be.", "What does that even mean?"],
                    ["You'll find that out IF you continue to the treasure.<br>But if ye don't wanna risk it just go to <a href='/scenes/47/'>Wetwater Lake</a>", "Stop with the distractions and let me pass!!"],
                    ["Alright but don't tell me I didn't warn ya.<br>Goodbye.", "Bye, I guess?"]
                    ]
var jellie_talk_count = 0

jellieBtn.addEventListener("click", function(e){
    e.preventDefault();
    
    if(jellie_talk_count >= jellie_talk.length){
        // final phase
        jellieBox.style.display = "none";
        finalBox.style.display = "block";
        jellieFloor.style.height = "500vh";
        props3.style.display = "block";
        return;
    }
    
    
    jellieText.style.opacity = 0;
    jellieBtn.style.opacity = 0;
    
    setTimeout(function(){ 
        jellieText.innerHTML = jellie_talk[jellie_talk_count][0];
        jellieBtn.innerHTML = jellie_talk[jellie_talk_count][1];

        jellieText.style.opacity = 1;
        jellieBtn.style.opacity = 1;
        jellie_talk_count += 1;
    },500);
});

chest.addEventListener("click", function(e){
    e.preventDefault();
    if(key_collected){
        chest.classList.add("chest-open-anim");
        // open popup
        document.getElementById("fin").style.transform = "scale(1)";
    }
    else{
        chest.classList.remove("shake-anim");

        void chest.offsetWidth;

        chest.classList.add("shake-anim");
    }
    
}, false);


key.addEventListener("click", function(e){
    e.preventDefault();

    key.classList.add("shake-and-fall-anim");

    // phase 3
    key_collected = true;

    text2.innerText = "...";
    text3.remove();
    text4.innerText = "";
    text5.innerText = "";

    jellieBox.style.display = "flex";
    jellieBox.style.height = "100%";
    finalBox.style.display = "none";
    jellieFloor.style.height = "100vh";
    props3.style.display = "none";

    
}, false);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        
        // phase 2

        text1.hidden = true
        key.hidden = false

        text2.innerText = "If you can read this.. STOP!"

        text3.innerHTML = `
            You could visit all these wonderful places:
            <br>
            <a href="/scenes/48/">Pumice & Hummus</a>, <a href="/scenes/47/">Wetwater Lake</a>
            <br>
            or even <a href="/scenes/65/">The Forbidden Sector</a>
            <br>
            Don't they sound like fun?
        `
        text4.innerText = "Stop searching. Ya won't find it!"

        observer.unobserve(chest); 
        }
    });
});

observer.observe(chest);