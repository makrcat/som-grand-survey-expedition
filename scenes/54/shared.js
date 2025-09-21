//detect the page from where you came from
const urlSearchParams = new URLSearchParams(window.location.search);
if (urlSearchParams.has("from")) {
  localStorage.setItem("from-scene", urlSearchParams.get("from"));
  switch (urlSearchParams.get("from")) {
    case "97":
      localStorage.setItem("from", "north");
      break;
    case "11":
      localStorage.setItem("from", "n-east");
      break;
    case "6":
      localStorage.setItem("from", "west");
      break;
    case "self":
      break;
  }
} else {
  console.warn("URL did not include from varaible");
  localStorage.setItem("from", "central");
}

//do the change for ghp thing

Array.from(document.getElementsByClassName("change-for-ghp")).forEach(
  (elememt) => {
    if (
      elememt.tagName.toLowerCase() === "a" &&
      window.location.href.startsWith("https://xfn10x.github.io/scene-54/") &&
      !elememt.getAttribute("href").startsWith("/scene-54")
    ) {
      elememt.setAttribute("href", "/scene-54" + elememt.getAttribute("href"));

      console.log("Changed href to: " + elememt.getAttribute("href"));
    }
  }
);

function travelTo(scene, from, textId) {
  if (window.location.href.startsWith("https://xfn10x.github.io/")) {
    location.href =
      "/scene-54/scenes/54/travel.html?textid=" +
      textId +
      "&tfrom=" +
      from +
      "&to=/scenes/" +
      scene;
  } else {
    location.href =
      "/scenes/54/travel.html?textid=" +
      textId +
      "&tfrom=" +
      from +
      "&to=/scenes/" +
      scene;
  }
}
