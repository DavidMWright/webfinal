function menuFunction() {
  document.getElementById("dropdown").classList.toggle("show");
}
window.onclick = function(event) {
  if (!event.target.matches('.user')) {
    var dropdowns = document.getElementsByClassName("dropdownItems");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}