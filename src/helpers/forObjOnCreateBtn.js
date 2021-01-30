export const forObjCreateBtn = () => {
  const startHour = new Date().getHours();
  const endHour = startHour === 23 ? 0 : startHour + 1;

  const cD = new Date();
  const startD = new Date(
    Date.UTC(cD.getFullYear(), cD.getMonth(), cD.getDate())
  )
    .toISOString()
    .substr(0, 10);
  const endD =
    endHour === 0
      ? new Date(startD.setDate(startD.getDate() + 1))
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
