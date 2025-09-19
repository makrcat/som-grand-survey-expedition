const first = document.getElementById("first-text");
const second = document.getElementById("second-text");
const third = document.getElementById("third-text");
const fact = document.getElementById("fact");

const texts = [
  { //for going to scene 54 <---> 97
    first:
      "When you were getting on the boat, a lot of people were getting off.",
    second: "And lots of people got on.",
    third: "It seems like lots of people are traveling from Hotland and back,",
    fact: `The <b>RTT to Hotland Ferry</b> is the most popular choice for
        getting to Hotland.`,
  },
  { //for going to scene 97 <- 54 when from-scene = 97, without finding the secrets
    first:
      "The route is just as popular as before.",
    second: "You do catch a glimse of something you didnt notice before...",
    third: "The bottom of the boat, which you though was just black, is pulsing...",
    fact: `<b>You missed some secrets.</b>`,
  },
  { //for going to scene 97 <- 54 when from-scene = 97, with the secrets found
    first:
      "The route is just as popular as before.",
    second: "Just as you suspected, the ferry is powered by sculk",
    third: "It seems like lots of people are traveling from Hotland and back,",
    fact: `The <b>RTT to Hotland Ferry</b> is the most popular choice for
        getting to Hotland.`,
  },
];

const countdowntext = document.getElementById("countdown");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const timerMax = 16;
var timer = timerMax;

function setText(id) {
  const text = texts[id] 
  first.innerHTML = text.first
  second.innerHTML = text.second
  third.innerHTML = text.third
  fact.innerHTML = text.fact
}

function updateHref() {
  urlSearchParams;
  countdowntext.innerHTML = `Redirecting in ${timer}... <a href="${urlSearchParams.get(
    "to"
  )}">Travel now</a>`;
}

async function showText() {
  await delay(1000);
  //just make this a list to be easier
  const array = [first, second, third, fact];

  array.forEach(async (element, index) => {
    await delay(3000 * index);
    for (let colour = 0; colour < 255; colour++) {
      await delay(10);
      element.style.setProperty(
        "-webkit-text-fill-color",
        `rgb(${colour}, ${colour}, ${colour})`
      );
    }
  });
}

async function countDownToRedirect() {
  for (let i = 0; i < timerMax; i++) {
    await delay(1000);
    timer--;
    updateHref();
  }
  countdowntext.innerHTML = "Redirecting...";
  if (window.location.href.startsWith("https://xfn10x.github.io/")) {
    location.href = "/scene-54/" + urlSearchParams.get("to");
  } else {
    location.href = urlSearchParams.get("to");
  }
}

setText(urlSearchParams.get("textid"))
updateHref();

showText();
countDownToRedirect();
