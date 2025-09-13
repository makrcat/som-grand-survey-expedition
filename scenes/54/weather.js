const locationSelection = document.getElementById("location-selection");
const hliIndicator = document.getElementById("hli-indic");
const hliDisplay = document.getElementById("location-selection-display");

// load image on canvas
var image = new Image();
image.onload = () => {
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  var context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);

  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  // when mouse is over map (svg) use the pos to get pixel on image
  locationSelection.addEventListener("mousemove", (event) => {
    var index = (event.offsetY * imageData.width + event.offsetX) * 4;
    hliIndicator.innerText =
      "HLI of Location: " +
      (imageData.data[index] / 87).toString().substring(0, 4);
  });

  locationSelection.addEventListener("mouseleave", (event) => {
    var index =
      (hliDisplay.getAttribute("cy") * imageData.width +
        hliDisplay.getAttribute("cx")) *
      4;
    console.log(
      hliDisplay.getAttribute("cx"),
      " ",
      hliDisplay.getAttribute("cy")
    );
    hliIndicator.innerText =
      "HLI of Location: " +
      (imageData.data[index] / 87).toString().substring(0, 4);
  });
  locationSelection.addEventListener("click", (event) => {
    hliDisplay.setAttribute("cx", event.offsetX);
    hliDisplay.setAttribute("cy", event.offsetY);
  });
};
image.src = "images/heat-map.png";
