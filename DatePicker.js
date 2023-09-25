'use strict';
class DatePicker {

  constructor(id, callback) {
    this.id = id;
    this.callback = callback;
  }

  render(date) {

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const month = date.getMonth();
    const year = date.getFullYear();

    let firstDayOfMonth = new Date(year, month, 1);
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    let calendar = "";

    // Add month and year  
    calendar += `<div class='month-year'>${monthNames[month]} ${year}</div>`;

    // Add day names
    calendar += "<div class='days'>";
    for (let i = 0; i < dayNames.length; i++) {
      calendar += `<div class='day-name'>${dayNames[i]}</div>`;
    }
    calendar += "</div>";

    // Add dates
    let currentDay = 1;
    calendar += "<div class='dates'>";

    // Add spacing for previous month's days  
    let spacing = "";
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      spacing += "<div class='spacing'></div>";
    }
    calendar += spacing;

    // Add current month's dates
    while (currentDay <= daysInMonth) {
      calendar += `<div class='date'>${currentDay}</div>`;
      currentDay++;
    }

    // Add spacing for next month's dates
    let remainingCells = 42 - currentDay + 1; 
    for (let i = 0; i < remainingCells; i++) {
      calendar += "<div class='spacing'></div>";
    }

    calendar += "</div>";

    // Add buttons
    calendar += "<div class='buttons'>";
    calendar += `<button class='prev-${this.id}' data-month='${month === 0 ? 11 : month - 1}' data-year='${month === 0 ? year - 1 : year}'>&lt;</button>`;
    calendar += `<button class='next-${this.id}' data-month='${month === 11 ? 0 : month + 1}' data-year='${month === 11 ? year + 1 : year}'>&gt;</button>`;
    calendar += "</div>";

    document.getElementById(this.id).innerHTML = calendar;

    // Attach click handlers
    document.querySelectorAll('.date').forEach(dateDiv => {
      dateDiv.addEventListener('click', () => {
        let day = parseInt(dateDiv.textContent);
        this.callback(this.id, { month: month + 1, day: day, year: year });
      });
    });

    document.querySelector(`.prev-${this.id}`).addEventListener('click', () => {
      let month = parseInt(document.querySelector(`.prev-${this.id}`).dataset.month);
      let year = parseInt(document.querySelector(`.prev-${this.id}`).dataset.year);
      this.render(new Date(year, month));
    });

    document.querySelector(`.next-${this.id}`).addEventListener('click', () => {
      let month = parseInt(document.querySelector(`.next-${this.id}`).dataset.month);
      let year = parseInt(document.querySelector(`.next-${this.id}`).dataset.year);
      this.render(new Date(year, month));
    });

  }

}