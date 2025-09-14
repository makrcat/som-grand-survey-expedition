const randoms = [
  1.913, 1.894, 1.932, 1.877, 2.002, 1.856, 1.915, 1.941, 1.882, 1.918, 1.905,
  1.967, 1.888, 1.936, 1.899, 1.92, 1.873, 1.957, 1.912, 1.879, 1.943, 1.901,
  1.927, 1.885, 1.917, 1.91, 1.95, 1.872, 1.934, 1.898, 1.923, 1.881, 1.915,
  1.946, 1.89, 1.919, 1.884, 1.929, 1.894, 1.921, 1.906, 1.939, 1.877, 1.918,
  1.902, 1.931, 1.889, 1.925, 1.883, 1.916,
];

const weathers = [
  0, 1, 4, 1, 0, 0, 2, 1, 0, 1, 1, 0, 1, 2, 0, 1, 0, 0, 3, 1, 0, 2, 1, 0, 1, 0,
  1, 1, 0, 0, 1, 3, 0, 1, 0, 2, 1, 0, 1, 0, 0, 1, 1, 0, 2, 0, 1, 0, 0, 1, 1, 0,
  1, 2, 0, 0, 1, 1, 0, 3, 1, 0, 0, 1, 2, 0, 1, 0, 0, 1, 1, 0, 1, 0, 2, 1, 0, 1,
  0, 0, 1, 1, 0, 1, 0, 0, 3, 1, 0, 4, 0, 1, 2, 0, 1, 0, 0, 4, 3, 4,
];

const locationSelection = document.getElementById("location-selection");
const hliIndicator = document.getElementById("hli-indic");
const hliDisplay = document.getElementById("location-selection-display");

var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
var diff =
  now -
  start +
  (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
var oneDay = 1000 * 60 * 60 * 24;
var day = Math.floor(diff / oneDay);
console.log("Day of year: " + day);

const IT = randoms[Math.round(day / 50)];
var ILT = Math.round(IT * 100 - 100);
var ITI = 1;

document.getElementById("IT-display").innerHTML = IT + "<sup>*IT</sup>";
function updateILT() {
  ILT = Math.round((IT * 100 - 100) * (1 + ITI / 2));
  document.getElementById("ILT-display").innerText = ILT;
}

function getPosFromLocation(location, xory) {
  switch (xory) {
    case "x":
      switch (location) {
        case "north":
        case "n-east":
          break;
        case "west":
          return 8;
          break;
        case "central":
          return 108;
          break;
        default:
          break;
      }
      break;

    default:
      switch (location) {
        case "north":
        case "n-east":
          return 146;
          break;
        case "west":
          return 28;
          break;
        case "central":
          return 60;
          break;
        default:
          break;
      }
      break;
  }
}

// load image on canvas
var image = new Image();
image.onload = () => {
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  var context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);

  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  function updateITI(index) {
    ITI = (imageData.data[index] / 87).toString().substring(0, 4);
    hliIndicator.innerText = "ITI of Location: " + ITI;

    updateILT();
  }

  function getIndex(y, x) {
    return (y * imageData.width + x) * 4;
  }

  // when mouse is over map (svg) use the pos to get pixel on image
  locationSelection.addEventListener("mousemove", (event) => {
    updateITI(getIndex(event.offsetY, event.offsetX));
  });

  locationSelection.addEventListener("mouseleave", (event) => {
    updateITI(
      getIndex(
        parseInt(hliDisplay.getAttribute("cy")),
        parseInt(hliDisplay.getAttribute("cx"))
      )
    );
  });

  locationSelection.addEventListener("click", (event) => {
    hliDisplay.setAttribute("cx", event.offsetX);
    hliDisplay.setAttribute("cy", event.offsetY);
  });
  console.log(
    localStorage.getItem("from") + " is at loc: ",
    getPosFromLocation(localStorage.getItem("from"), "y"),
    getPosFromLocation(localStorage.getItem("from"), "x")
  );
  updateITI(
    getIndex(
      getPosFromLocation(localStorage.getItem("from"), "y"),
      getPosFromLocation(localStorage.getItem("from"), "x")
    )
  );
  hliDisplay.setAttribute(
    "cx",
    getPosFromLocation(localStorage.getItem("from"), "x")
  );
  hliDisplay.setAttribute(
    "cy",
    getPosFromLocation(localStorage.getItem("from"), "y")
  );
};

image.src = "images/heat-map.png";

updateILT();
