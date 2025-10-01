let liftButton = document.getElementById("liftButton")
let swoleCoinDisplay = document.getElementById("swoleCoinDisplay")

let increaseWeight = document.getElementById("increaseWeight")
let gymBro = document.getElementById("gymBro")
let jock = document.getElementById("jock")
let protein = document.getElementById("protein")
let altar = document.getElementById("altar")
let hole = document.getElementById("hole")

let leave53 = document.getElementById("leave53")
let leave77 = document.getElementById("leave77")
let leave92 = document.getElementById("leave92")

let lorePage = document.getElementById("lorePage")
let loreContainer = document.getElementById("loreContainer")
let choice1 = document.getElementById("choice1")
let choice2 = document.getElementById("choice2")

let swoleCoins = 0;
let lorePages = 0;
let lorePageCost = 1;
let multiplier = 1;
let multiplierCost = 25;
let gymBros = 0;
let gymBroCost = 50;
let jocks = 0
let jockCost = 500
let proteins = 0
let proteinCost = 5000
let altars = 0
let altarCost = 50000
let holes = 0
let holeCost = 500000

const loreTexts = [
    "I remember him. He was once but a skinny man. Could barely lift a rock. The kids would always bully him, what a shame. If only I could help.",
    "I figured out a way to talk with him, but it puts me in quite the inconvenient form. Though now thanks to him I started to bring him down the path of the Swole.",
    "He's gotten stronger. He's now not only able to lift rocks now, but even trees. That's not supposed to happen. I'm scared.",
    "I... He isn't even following logic now. He's become a shop lifter. Literally. I just watched him lift a store and somehow didn't damage it whatsoever. He claims that he lifted the space itself??? I don't even know at this point.",
    "He started a religion. I'm the god. I don't even know what's going on at this point. I am literally just the spirit of a knight. How am I a god now???",
    "The followers gave him a title. He's now the Gym Messiah. They've gone insane. I tried telling them that but all they did was flex their muscles so hard the light blinded me. I don't have eyes.",
    "He's lifting concepts now. CONCEPTS. I DIDN'T TEACH HIM ANY OF THIS. HE JUST LIFTED THE CONCEPT OF FRIENDSHIP. NOW HIM AND HIS FOLLOWERS ARE CLOSER THAN EVER. I DON'T KNOW WHAT'S GOING ON. PLEASE SEND HELP",
    "I don't even know what's going on. He's now the Earth Shaker, Breaker Of Valleys. While doing squats the earth shakes and when he does bicep curls, the earth splits to make valleys.",
    "He just broke the concept of logic. I assumed he did that long ago but seems not. Now he's become Swole itself. Everywhere Swole exists, he exists. He eternally lifts everywhere and anytime. I don't know anymore. I'm just gonna sleep."
]

function displaySwoleCoinAmount(){
    swoleCoinDisplay.innerText = "You have " + Math.round(swoleCoins) + " Swole Coins";
}

liftButton.addEventListener('click', function(){
    swoleCoins += multiplier;
    displaySwoleCoinAmount()
})

choice1.addEventListener('click', function(){
    let p = document.createElement("p")
    p.innerText = "Congrats. You have ascended to Swole.\n(Make sure to check out the other scenes. There isn't anything else here)"
    choices.appendChild(p)
})

choice2.addEventListener('click', function(){
    let p = document.createElement("p")
    p.innerText = "Oh uh. Yeah nothing special happens from clicking this button. You can continue to play the game I guess.\n(Make sure to check out the other scenes. There isn't anything else here)"
    choices.appendChild(p)
})

lorePage.addEventListener('click', function(){
    if(lorePages >= 9){
        alert("Sorry. No More Pages")
    }
    else if(swoleCoins >= lorePageCost){
        swoleCoins -= lorePageCost
        lorePageCost *= 1
        lorePages++
        displaySwoleCoinAmount()
        lorePage.innerText = "Would you like get a mysterious page for " + Math.round(lorePageCost) + " Swole Coin"
        if(lorePages<= loreTexts.length){
            let p = document.createElement("p")
            p.innerText = loreTexts[lorePages -1]
            loreContainer.appendChild(p)
        }
        if(lorePages === 9){
            choice1.style.display = "block"
            choice2.style.display = "block"
        }
    }else{
        alert("Not Enough Swole Coins")
    }
})

increaseWeight.addEventListener('click', function(){
    if(swoleCoins>= multiplierCost){
        swoleCoins-= multiplierCost;
        multiplierCost*=1.3;
        multiplier++;
        displaySwoleCoinAmount()
        increaseWeight.innerText = "Increase weight for " + Math.round(multiplierCost) + " Swole Coins";
    }else{
        alert("Not Enough Swole Coins")
    }
})

gymBro.addEventListener('click', function(){
    if(swoleCoins>= gymBroCost){
        swoleCoins-= gymBroCost;
        gymBroCost*=1.3;
        gymBros++;
        displaySwoleCoinAmount()
        gymBro.innerText = "Get a gym bro for " + Math.round(gymBroCost) + " Swole Coins";
    }else{
        alert("Not Enough Swole Coins")
    }
})

jock.addEventListener('click', function(){
    if(swoleCoins >= jockCost){
        swoleCoins -= jockCost
        jockCost *= 1.3
        jocks++
        displaySwoleCoinAmount()
        jock.innerText = "Get a jock for " + Math.round(jockCost) + " Swole Coins"
    }else{
        alert("Not Enough Swole Coins")
    }
})

protein.addEventListener('click', function(){
    if(swoleCoins >= proteinCost){
        swoleCoins -= proteinCost
        proteinCost *= 1.3
        proteins++
        displaySwoleCoinAmount()
        protein.innerText = "Get a protein powder factory for " + Math.round(jockCost) + " Swole Coins"
    }else{
        alert("Not Enough Swole Coins")
    }
})

altar.addEventListener('click', function(){
    if(swoleCoins >= altarCost){
        swoleCoins -= altarCost
        altarCost *= 1.3
        altars++
        displaySwoleCoinAmount()
        altar.innerText = "Get an Altar Of Swole for " + Math.round(jockCost) + " Swole Coins"
    }else{
        alert("Not Enough Swole Coins")
    }
})

hole.addEventListener('click', function(){
    if(swoleCoins >= holeCost){
        swoleCoins -= holeCost
        holes++
        displaySwoleCoinAmount()
        hole.innerText = "Make another Swole Hole for " + Math.round(holeCost) + " Swole Coins"
    }else{
        alert("Not Enough Swole Coins")
    }
})

setInterval(function(){
    swoleCoins += gymBros
    swoleCoins += (jocks * 10)
    swoleCoins += (proteins * 100)
    swoleCoins += (altars * 1000)
    swoleCoins += (holes * 10000)
    displaySwoleCoinAmount()
},60000)

setInterval(function(){
    if(Math.random() < 0.25){
        triggerRandomEvent();
    }
}, 60000)

leave53.addEventListener('click', function(){
    window.location.href = '/scenes/53/'
})

leave77.addEventListener('click', function(){
    window.location.href = '/scenes/77/'
})

leave92.addEventListener('click', function(){
    window.location.href = '/scenes/92/'
})

function triggerRandomEvent(){
    let eventChance = Math.random()
    gainPerSec = gymBros + (jocks * 10) + (proteins * 100) + (altars * 1000) + (holes * 10000)
    if(eventChance < 0.25){
        let bonus = 3*gainPerSec
        alert("That lift really hit.\n+" + bonus + " Swole Coins!")
        swoleCoins += bonus
    }else if(eventChance < 0.5){
        alert("Your comrades just locked in.\nYour gains are doubled for 30 seconds!")
        gymBros *=2
        jocks *=2
        proteins *=2
        altars *=2
        holes *=2
        setTimeout(()=> {Math.round(gymBros/=2), Math.round(jocks/=2), Math.round(proteins/=2), Math.round(altars/=2), Math.round(holes/=2)}, 30000)
    }else if(eventChance < 0.75){
        alert("Sloth has found its way in.\nAll your workers fall asleep for 15 seconds.")
        let savedGymBros = gymBros;
        let savedJocks = jocks;
        let savedProteins = proteins;
        let savedAltars = altars;
        let savedHoles = holes;
        gymBros = 0
        jocks = 0
        proteins = 0
        altars = 0
        holes = 0

        setTimeout(()=> {gymBros += savedGymBros, jocks += savedJocks, proteins += savedProteins, altars += savedAltars, holes += savedHoles}, 15000)
    }else{
        alert("You have gotten in the temp.\nx777 Swole Coins per click for 7 seconds")
        multiplier *= 777
        setTimeout(()=> {Math.round(multiplier/=777)}, 7000)
    }
}