import moment from "moment";

export const firstDayForCurrentOfWeek = () => {
  const firstDayOfWeek = new Date();
  while (firstDayOfWeek.getDay() !== 0) {
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - 1);
  }
  return firstDayOfWeek;
};

export const generateArrayOfCurrentWeek = (firstDayOfWeek) => {
  const firstDay = new Date(firstDayOfWeek);
  return Array(7)
    .fill(null)
    .map((elem) => {
      elem = new Date(firstDay);
      firstDay.setDate(firstDay.getDate() + 1);
      return elem;
    });
};

export const onGenerateAnotherfirstDayOfWeek = (event, firstDayOfWeek) => {
  const updatedFirstDayOfWeek = new Date(firstDayOfWeek);
  event.target.classList.contains("nav__arow_right")
    ? updatedFirstDayOfWeek.setDate(updatedFirstDayOfWeek.getDate() + 7)
    : updatedFirstDayOfWeek.setDate(updatedFirstDayOfWeek.getDate() - 7);
  return updatedFirstDayOfWeek;
};

export const onRenderTitleDate = (arrDaysOfWeek) => {
  const firstDayMonth = moment(arrDaysOfWeek[0]).format("MMM");
  const firstDayYear = moment(arrDaysOfWeek[0]).format("YYYY");

  const lastDayMonth = moment(arrDaysOfWeek[6]).format("MMM");
  const lastDayYear = moment(arrDaysOfWeek[6]).format("YYYY");

  return firstDayMonth === lastDayMonth && firstDayYear === lastDayYear
    ? `${firstDayMonth} ${firstDayYear}`
    : firstDayMonth !== lastDayMonth && firstDayYear === lastDayYear
    ? `${firstDayMonth} - ${lastDayMonth.toLocaleLowerCase()} ${firstDayYear}`
    : firstDayMonth !== lastDayMonth && firstDayYear !== lastDayYear
    ? `${firstDayMonth} ${firstDayYear} - ${lastDayMonth} ${lastDayYear}`
    : "";
};
