function showcalendar() {
  const TODAY = new Date();
  const MONTH = TODAY.getMonth();
  const YEAR = TODAY.getFullYear();
  const FIRST_DAY = new Date(YEAR, MONTH, 1).getDay();
  const DAYS_IN_MONTH = 32 - new Date(YEAR, MONTH, 32).getDate();

  let div = document.getElementsByClassName("calendar")[0];
  let day = 1;
  let table = "<table cellspacing=0>"

  for (let i = 0; i < 6; i++) {
    let row = "<tr>";

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < FIRST_DAY) {
        row += "<td></td>";
      }
      else if (day > DAYS_IN_MONTH) {
        break;
      }
      else {
        row += `<td>${day}</td>`
        day++;
      }
    }
    row += "</tr>";
    table += row;
  }

  div.innerHTML = table;
}