let validateMessageElem = document.querySelector(".message_validation");
export let markOnValidateText = 0;

export const onMakeMarkOnValidateTextNull = () => {
  markOnValidateText = 0;
};

export const onClearValidateMessages = () =>
  (validateMessageElem.innerHTML = "");

const onCheckIntersectionEvents = (object, events) => {
  let errorText = undefined;
  const eventsArray = events.map((elem) => {
    elem.startDate = new Date(elem.startDate);
    elem.endDate = new Date(elem.endDate);
    return elem;
  });
  let currentStartTime = object.startDate.getTime();
  let currentEndTime = object.endDate.getTime();
  for (let i = 0; i < eventsArray.length; i++) {
    if (eventsArray[i]._id === object._id) continue;
    let elemStartTime = eventsArray[i].startDate.getTime();
    let elemEndTime = eventsArray[i].endDate.getTime();
    if (
      currentStartTime < elemEndTime &&
      currentStartTime < elemEndTime &&
      currentEndTime > elemStartTime && currentEndTime > elemStartTime
    ) {
      errorText = "Error! Event can`t intersect";
    }
  }
  return errorText;
};

const onCheckCorrectDates = (object) =>
  object.endDate < object.startDate
    ? "Error! End date can`t be ealier than start date"
    : undefined;

const onCheckEventLength = (object) =>
  21600000 <= object.endDate - object.startDate
    ? "Error! Event can`t be more than 6 hours"
    : undefined;

const onCheckMinutes = (object) =>
  (object.startDate.getMinutes() !== 0 &&
    object.startDate.getMinutes() % 15 !== 0) ||
  (object.endDate.getMinutes() !== 0 && object.endDate.getMinutes() % 15 !== 0)
    ? "Error! Minuts must be a multiple of fifteen"
    : undefined;

export const onMakeObjectFromValuesInForm = (isEditing) => {
  const form = document.querySelector(".popup");
  const tempObj = [...new FormData(form)].reduce(
    (acc, [field, value]) => ({ ...acc, [field]: value }),
    {}
  );

  const startDate_hours = tempObj.startTimePlace.split(":")[0];
  const startDate_min = tempObj.startTimePlace.split(":")[1];
  tempObj.startDate = [...tempObj.startDate.split("-")];
  tempObj.startDate[1] = tempObj.startDate[1] - 1;
  tempObj.startDate.push(startDate_hours, startDate_min);
  tempObj.startDate = new Date(...tempObj.startDate);

  const endDate_hours = tempObj.endTimePlace.split(":")[0];
  const endDate_min = tempObj.endTimePlace.split(":")[1];
  tempObj.endDate = [...tempObj.endDate.split("-")];
  tempObj.endDate[1] = tempObj.endDate[1] - 1;
  tempObj.endDate.push(endDate_hours, endDate_min);
  tempObj.endDate = new Date(...tempObj.endDate);

  tempObj._id = isEditing || "";

  return tempObj;
};

const arrOfValidateFuncs = [
  onCheckMinutes,
  onCheckEventLength,
  onCheckCorrectDates,
  onCheckIntersectionEvents,
];
export const onInputValidate = (event, isEditing, arrayOfEvents) => {
  if (!event.target.classList.contains("input")) return;
  const tempObj = onMakeObjectFromValuesInForm(isEditing);
  const errorText = arrOfValidateFuncs
    .map((func) => func(tempObj, arrayOfEvents))
    .filter((erroText) => erroText)
    .join(" ");
  const validateMessageElem = errorText;
  return validateMessageElem;
};

export const onCheckLateEffortOfDeleteOrEdite = (object) => {
  object.startDate = object.startDate.split("-");
  object.startTime = object.startTime.split(":");
  object.startDate = new Date(...object.startDate.concat(object.startTime));
  object.startDate.setMonth(object.startDate.getMonth() - 1);

  object.endDate = object.endDate.split("-");
  object.endTime = object.endTime.split(":");
  object.endDate = new Date(...object.endDate.concat(object.endTime));
  object.endDate.setMonth(object.endDate.getMonth() - 1);

  const timeToEvent = (object.startDate.valueOf() - Date.now()) / 1000 / 60;

  // return
  let validateMessageElem;
  if (timeToEvent <= 15 && timeToEvent > 0) {
    validateMessageElem =
      "You can`t change or delete event after 15 minutes to event";
  } else {
    validateMessageElem = "";
  }
  return validateMessageElem;
};

export const onClickValidate = (object, arrayOfEvents) => {
  object.startDate = object.startDate.split("-");
  object.startTime = object.startTime.split(":");
  object.startDate = new Date(...object.startDate.concat(object.startTime));
  object.startDate.setMonth(object.startDate.getMonth() - 1);

  object.endDate = object.endDate.split("-");
  object.endTime = object.endTime.split(":");
  object.endDate = new Date(...object.endDate.concat(object.endTime));
  object.endDate.setMonth(object.endDate.getMonth() - 1);

  const errorText = arrOfValidateFuncs
    .map((func) => func(object, arrayOfEvents))
    .filter((erroText) => erroText)
    .join(" ");
  const validateMessageElem = errorText;
  return validateMessageElem;
};
