// Terminal code
let commandHistory = [];
let commandHistoryIndex = 0;
let inputElement = document.querySelector(".terminal-input");
inputElement.value = "";
inputElement.focus();







document.querySelector(".terminal-input").addEventListener("keydown", (e) => {
  if (e.keyCode == 38 || e.keyCode == 40) {
    commandHistory.push("");
    if (commandHistory.length == 0) return;
    if (e.keyCode == 38) {
      if (commandHistory[commandHistoryIndex - 1]) commandHistoryIndex--;
    } else {
      if (commandHistoryIndex + 1 < commandHistory.length)
        commandHistoryIndex++;
      else {
        inputElement.value = "";
        commandHistory.pop();
        return;
      }
    }
    inputElement.value = commandHistory[commandHistoryIndex];
    commandHistory.pop();
  }
  if (e.keyCode != 13) return;

  let input = inputElement.value;
  inputElement.value = "";

  commandHistory.push(input);
  commandHistoryIndex = commandHistory.length;

  let inputLine = document.createElement("div");

  inputLine.innerHTML = `<span class="terminal-text">you@anxious.island:~$&nbsp;<span class="terminal-input" style="inline-block">${input}</span>`;
  newLine(inputLine.innerHTML);

  let keywords = input.split(" ");

  runCommand(keywords, input);
});

function runCommand(keywords, input) {
  if (gameRunning) {
    runGameCommand(keywords, input);
    return;
  } else {
    newLine("An error has occured. please reload the site")
  }
}

function runGameCommand(keywords, input) {
  switch (keywords[0]) {
    case "what?":
      window[activePlace]();
      break;
    case "exit":
      endGame();
      break;
    case "goto":
      if (hasItem("map")) {
        if (keywords[1] === undefined) {
          newLine("Go to where?");
          return;
        }
        goToPlace(keywords[1]);
      }
      else newLine("But you don't have a map");
      break;
    case "1":
      gameInput(1);
      break;
    case "2":
      gameInput(2);
      break;
    case "3":
      gameInput(3);
      break

    default:
      newLine(
        "Invalid input. Please type a number to select an option. '1', '2', '3', or 'what?' to have the last text repeated."
      );
  }
}

function newLine(content, className, options) {
  let line = document.createElement("span");
  line.classList.add("line");
  if (className) line.classList.add(className);
  line.innerHTML = content;
  document.querySelector(".lines").append(line);
  let shell = document.getElementById("shell");
  shell.scrollTop = shell.scrollHeight;

  if (options) {
    newLine("<br>");
    for (let i = 0; i < options.length; i++) {
      newLine(options[i]);
    }
    newLine("<br>");
  }

  return line;
}

function newDialog(image, speaker, text, className) {
  activePerson = speaker;
  let newLine = document.createElement("div");
  let textContainer = document.createElement("div");
  let speakerImage = document.createElement("img");
  let speakerName = document.createElement("p");
  let dialogText = document.createElement("p");

  speakerImage.src = image;
  speakerImage.style.width = "150px";
  speakerImage.style.height = "150px";
  speakerName.innerHTML = people[speaker].name;
  dialogText.innerHTML = text;

  if (className) newLine.classList.add(className);
  newLine.classList.add("dialog");
  newLine.style.display = "grid";
  newLine.style.gridTemplateColumns = "150px auto";

  newLine.append(speakerImage);
  newLine.append(textContainer);
  textContainer.append(speakerName);
  textContainer.append(dialogText);

  document.querySelector(".lines").append(newLine);

  let itemsNeededByPerson = itemsNeeded(speaker);
  if (itemsNeededByPerson) {
    let itemsNeededString = itemsNeededByPerson.join(", ");
    return true;
  }

  return false;
}

function clearTerminal() {
  document.querySelector(".lines").innerHTML = "";
}


function goToPlace(number) {
  let place = "";
  switch (number) {
      case "1":
          place = "bedroom";
          break;
      case "2":
          place = "oldmanHouse";
          break;
      case "3":
          place = "femaleNeighbor";
          break;
      case "4":
          place = "park";
          break;
      case "5":
          place = "store";
          break;
      default:
          newLine("Invalid location");
          return;
  }
  goSomewhere(place);
}

