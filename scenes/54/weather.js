const locationSelection = document.getElementById("location-selection");

locationSelection.addEventListener("mousemove", (me) => {
  console.log(heatmap.getPixelColor(me.offsetX, me.offsetY));
});
