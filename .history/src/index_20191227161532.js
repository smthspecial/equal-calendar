const getEqualDate = date => {
  if (typeof date === "number" || typeof date === "string") {
    date = new Date(date);
  }
  console.log(date);
  const thisYear = date.getFullYear();
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(thisYear, 0, 1, 0);
  const diffDays = Math.ceil((date - firstDate) / oneDay);

  const currentMonth = Math.ceil(diffDays / 28);
  const currentDay = diffDays % 28;
  const currentDayOfWeek = currentDay % 7;
  const getDayOfweek = dayCode => {
    switch (dayCode) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
    }
  };
//   console.log(
//     currentMonth,
//     currentDay,
//     currentDayOfWeek,
//     getDayOfweek(currentDayOfWeek)
//   );
  if (thisYear % 4 === 0 || thisYear % 400 === 0) {
    const diffDays = 28 * 13 + 2;
    if (diffDays === 28 * 8 + 1) {
      const currentMonth = Math.ceil(diffDays / 28);
      const currentDay = diffDays % 28;

      return {
        currentMonth,
        currentDay,
        currentDayOfWeek: null,
        weekDay: "It's the Middle Day of the Year",
        highDay: true
      };
    }
    if (diffDays > 28 * 8) {
      const currentDay = (diffDays - 1) % 28;
      const currentMonth = Math.ceil(diffDays / 28);
      const currentDayOfWeek = currentDay % 7;
      // console.log(diffDays, currentMonth, currentDay, currentDayOfWeek, getDayOfweek(currentDayOfWeek));
      return {
        currentMonth,
        currentDay,
        currentDayOfWeek,
        weekDay: getDayOfweek(currentDayOfWeek)
      };
    }
    return {
      currentMonth,
      currentDay,
      currentDayOfWeek,
      weekDay: getDayOfweek(currentDayOfWeek)
    };
  }
  if (currentMonth === 14) {
    return {
      currentMonth,
      currentDay,
      currentDayOfWeek: null,
      weekDay: "It's the last day of the Year",
      lastDay: true
    };
  }
  return {
    currentMonth,
    currentDay,
    currentDayOfWeek,
    weekDay: getDayOfweek(currentDayOfWeek)
  };
};

// console.log(getEqualDate(Date.now()));
const selectedDate = document.querySelector("#selected-date");
const inputDate = document.querySelector("#date");
inputDate.addEventListener("input", e => {
  console.log(e.target.value);
  selectedDate.insertAdjacentHTML(
    "afterbegin",
    displayEqualDate(getEqualDate(e.target.value))
  );
});

const displayEqualDate = date => {
  if (date.highDay || date.lastDay) {
    return `
      <span> ${date.weekDay && date.weekDay} </span>
    `;
  }
  return `
    <span> Today is ${date.currentMonth && date.currentMonth} month, </span>
    <span> ${date.currentDay && date.currentDay} day, </span>
    <span> ${date.weekDay && date.weekDay}</span>
  `;
};

const app = document.querySelector("#app");
app.insertAdjacentHTML(
  "afterbegin",
  displayEqualDate(getEqualDate(Date.now()))
);
