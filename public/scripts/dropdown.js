let menuVisible = false;

function circleInit() {
  let circle = document.getElementsByClassName("userCircle")[0];
  circle.addEventListener("click", showDropdown);
}

function showDropdown() {
  let dropdowns = document.getElementsByClassName("dropdown");
  if (menuVisible === false) {
    for (let i = 0; i < dropdowns.length; i++) {
      let item = dropdowns[i];
      item.style.display="inline";
    }
    menuVisible = true;
  }
  else {
    for (let i = 0; i < dropdowns.length; i++) {
      let item = dropdowns[i];
      item.style.display="none";
    }
    menuVisible = false;
  }
}