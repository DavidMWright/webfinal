let slider = document.getElementById("inputSlider");
let output = document.getElementsByClassName("output")[0];

slider.oninput = function() {
  output.innerHTML = slider.value;
}
