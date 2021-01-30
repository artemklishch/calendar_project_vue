export const forObjectOnClickOnField = (event, arrDaysOfWeek) => {
  if (!event.target.classList.contains("main__sidebar_days_hours")) return null;
  const hourNumber = +event.target.dataset.hourNumber;
  const dayNumber = +event.target.closest(".main__sidebar_days_line").dataset
    .dayNumber;
  const currentYear = arrDaysOfWeek[dayNumber].getFullYear();
  const currentMonth = arrDaysOfWeek[dayNumber].getMonth();
  const currentDate = arrDaysOfWeek[dayNumber].getDate();

  const startHour = new Date(
    currentYear,
    currentMonth,
    currentDate,
    hourNumber
  ).getHours();
  const endHour = startHour === 23 ? 0 : startHour + 1;

  const certainDateGMT = new Date(
    Date.UTC(currentYear, currentMonth, currentDate, hourNumber)
  );
  const startD = certainDateGMT.toISOString().substr(0, 10);
  const endD =
    endHour === 0
      ? new Date(Date.UTC(currentYear, currentMonth, currentDate + 1))
          .toISOString()
          .substr(0, 10)
      : startD;

  return {
    startTime:
      startHour > 9
        ? [startHour, "00"].join(":")
        : [`0${startHour}`, "00"].join(":"),
    endTime:
      endHour > 9 ? [endHour, "00"].join(":") : [`0${endHour}`, "00"].join(":"),
    startDate: startD,
    endDate: endD,
  };
};
