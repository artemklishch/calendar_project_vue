import moment from "moment";

export const forHeightTopAndParagraph = (objectElem) => {
  const startTime = moment(objectElem.startDate).format("HH:mm");
  const endTime = moment(objectElem.endDate).format("HH:mm");
  let timeString = `${startTime} - ${endTime}`;

  let top, height, padding;
  if (objectElem.startDate.getMinutes() === 15) top = "25%";
  if (objectElem.startDate.getMinutes() === 30) top = "50%";
  if (objectElem.startDate.getMinutes() === 45) top = "75%";

  let timesOfRange =
    (objectElem.endDate - objectElem.startDate) / 1000 / 60 / 15;
  height = timesOfRange * 24.5 + "%";
  if (timesOfRange < 4) {
    padding = 0;
    timeString = "";
  }

  return { top, height, padding, timeString };
};

const transformObjectFunc = (element) => {
  const endYearForObj1 = new Date(element.startDate).getFullYear();
  const endMonthForObj1 = new Date(element.startDate).getMonth();
  const endDateForObj1 = new Date(element.startDate).getDate();
  let endTimeForObj1 = new Date(
    endYearForObj1,
    endMonthForObj1,
    endDateForObj1,
    24
  );

  const startYearForObj2 = new Date(element.endDate).getFullYear();
  const startMonthForObj2 = new Date(element.endDate).getMonth();
  const endDateForObj2 = new Date(element.endDate).getDate();
  const startTimeForObj2 = new Date(
    startYearForObj2,
    startMonthForObj2,
    endDateForObj2
  );

  const obj1 = {
    backgroundColor: element.backgroundColor,
    header: element.header,
    startDate: element.startDate,
    endDate: endTimeForObj1,
    description: element.description,
    id: element.id,
    _id: element._id,
  };
  const obj2 = {
    backgroundColor: element.backgroundColor,
    header: element.header,
    startDate: startTimeForObj2,
    endDate: element.endDate,
    description: element.description,
    id: element.id,
    _id: element._id,
  };
  return [obj1, obj2];
};

export const forChangingEventsArray = (array) => {
  const arr = array.map((element) => {
    element.startDate = new Date(element.startDate);
    element.endDate = new Date(element.endDate);
    return element;
  });
  const transformedArray = [];
  arr.forEach((element) => {
    if (
      element.startDate.getDate() !== element.endDate.getDate() &&
      element.endDate.getHours() > 0
    ) {
      transformObjectFunc(element).forEach((elem) =>
        transformedArray.push(elem)
      );
    } else transformedArray.push(element);
  });
  return transformedArray;
};
