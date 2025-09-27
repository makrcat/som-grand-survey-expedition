function startGame() {
  
  gameRunning = true;
  firstvisit = true

  newLine(
    "You have been sailing for days, and finally see land! you quickly make your way over, and as you get close you notice a single house on the island. <br>"
  );
  newLine(
    "You land on the island, and begin to walk over to his house<br> <br>"
  );
  house();
}

function gameInput(number) {
  let input = number;
  lastGameInput = input;
  goSomewhere(nextPlaces[input - 1]);
}

function goSomewhere(place) {
  lastPlace = activePlace;
  activePlace = place;
  window[place]();
}

const rooms = {
  bedroom: {
    clean: false
  },
  kitchen: {
    clean: false
  }
}

function house() {
    newLine('You reach the house and notice it seems to be very old and falling apart, and notice a light is on inside', "",
      ['Press "1" to knock on the door.']);
    nextPlaces = ["A", "A", "A"];

}

function A() {
    newLine('The door creaks open and you notice a man inside. "A visitor!" he says. he then begins whispering to himself, "This is the first visitor we have had in years. what if she does not like us? what if she attacks me?" he does not seem to realize you can hear him.', "",
      ['Press "1" to explain your situation.', 'Press "2" to ask who he is', 'Press "3" to ask where you are']);
    nextPlaces = ["A1", "A2", "A3"];
}

function A1() {
    newLine('You explain to the man how you have been sailing for days and desperately need food and water. The man nods earnestly, and says he ended up here in a similar way. <br> <br>', "",);
    C()

}

function A2() {
    newLine('You ask the man who he is. he explains that he was a sailor traveling to Mount Unhappiness, but ended up getting <a href="https://shipwrecked.hackclub.com/">shipwrecked</a> on this island, and is not willing to leave. "What if my boat sinks? What if I end up on the <a href="/scenes/82">island that tries to bite you?</a> I could get bitten!"', "");
C()
}

function A3() {
    newLine('You ask the man where you are. He explains that you are on a strange uncharted island off the coast of Mount Unhappiness', "",);
C()
}

function C(){
if (firstvisit == true) {
newLine('The man notices its very late, and offers to let you sleep in his hut for the night.', "",
      ['Press 1 to accept his offer', 'Press 2 to ask more questions']);
nextPlaces = ["C1", "C"];
firstvisit = false
} else {
newLine('', "",
      ['Press "1" to explain your situation.', 'Press "2" to ask who he is', 'Press "3" to ask where you are']);
nextPlaces = ["A1", "A2", "A3"];
firstvisit = true
}

}

function C1(){

newLine('You follow him to his guest room and sleep for the night. You dream of countless horrible scenarios, and watch your own death countless times. It feels like years have passed by the time you wake up. ', "",);
C2()
}

function C2(){

newLine('You wake up in the morning and the man invites you to breakfest. He explains how the tide seasons on this island make it so the next 3 days are your only period where it will be possible to escape. He says if this is your choice, he will help you as best as he can, but warns you the dangers of the trip.', "",
      ['Press "1" to stay on the island.', 'Press "2" to try to escape']);
nextPlaces = ["END1", "D"];
}

function D(){

newLine('You decide to try and escape. This is the first of your 3 days. The man explains that the tides today are rough, but not horrible. "What if it gets worse? What if this is my last chance" you think to yourself.', "",
      ['Press "1" to try and escape today', 'Press "2" to wait']);
nextPlaces = ["END2", "D2"];

}

function D2(){

newLine('This is the second of your 3 days. The man explains that the tides today are very light, but there is a chance of a storm forming. "What if the storm forms? I have one more day, maybe I just wait..." you think to yourself', "",
      ['Press "1" to try and escape today', 'Press "2" to wait']);
nextPlaces = ["END3", "D3"];

}


function D3(){

newLine('This is the third of your 3 days. The man explains that the tides today are very harsh, and there is little chance of survival. "Maybe I should just stay here..." you think to yourself', "",
      ['Press "1" to try and escape today', 'Press "2" to give up']);
nextPlaces = ["END2", "END1"];

}

function END1() {
newLine('End 1/3: The Cowardly Ending: You stay on the island as it slowly drives you insane.', "", ['Press "1" to play again', 'Press "2" to visit Mildly Angry Mountains', 'Press "3" to visit Mount Unhappiness'])
nextPlaces = ["again", "mam", "mu"];
}

function END2() {
newLine('End 2/3: The Bad Ending: You attempt to leave the island, but the tide is too harsh, and you slam into the rocks', "", ['Press "1" to play again', 'Press "2" to visit Mildly Angry Mountains', 'Press "3" to visit Mount Unhappiness'])
nextPlaces = ["again", "mam", "mu"];
}

function END3() {
newLine('End 3/3: The Good Ending: You make it off the island, and rejoin society', "", ['Press "1" to play again', 'Press "2" to visit Mildly Angry Mountains', 'Press "3" to visit Mount Unhappiness'])
nextPlaces = ["again", "mam", "mu"];
}

function again() {
  location.reload()
}


function mam() {
  window.location.href = "/scenes/14"
}

function mu() {
  window.location.href = "/scenes/84"
}

