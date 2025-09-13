const MESSAGES = [
    "Sorry!",
    "So sorry!",
    "Very sorry!",
    "Super sorry!",
    "Really sorry!",
    "Extremely sorry!",
    "I'm sorry!",
    "😭",
    "😢",
    "Sad!",
    "So sad!",
    "Very sad!",
    "Super sad!",
    "Really sad!",
    "Extremely sad!",
    "It's so sad!",
    "This is very sad!",
    "I am extremely sad!",
];
const overlay = document.getElementById("overlay");
const messageContainer = document.getElementById("messages");

function getMessage() {
    const index = Math.floor(Math.random() * MESSAGES.length);
    return MESSAGES[index];
}
async function createMessage() {
    const text = getMessage();
    const element = document.createElement("div");
    element.classList.add("message");
    element.textContent = text;


    element.style.top = `${(Math.random() * 40) + 40}vh`;
    element.style.fontSize = `${(Math.random() * 10)}rem`
    const duration = `${(Math.random() * 25) + 5}s`;
    element.style.setProperty("--duration", duration);

    messageContainer.append(element);

    const start = `-${getComputedStyle(element).width}`;
    element.style.setProperty("--start", start);

    element.addEventListener("click", fadeOut);

    await new Promise(resolve => setTimeout(resolve, 30000));
    element.remove();
}

async function fadeOut(event) {
    const element = event.target;
    const time = (Math.random() * 3500) + 1500;
    element.style.transition = `${time}ms ease-in-out`;
    element.style.opacity = 0;
    await new Promise(resolve => setTimeout(resolve, time));
    element.remove();
}

async function main() {
    while (true) {
        const time = (Math.random() * 4500) + 500;
        await new Promise(resolve => setTimeout(resolve, time));
        createMessage();
    }
}
async function leave() {
    overlay.style.background = "black";
    overlay.style.transition = "2s ease-in-out";
    await new Promise(resolve => setTimeout(resolve, 2000));
    location.href = "/scenes/34/";
}


main();

overlay.style.background = "transparent";
document.getElementById("leave").addEventListener("click", leave);