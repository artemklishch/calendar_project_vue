export const onFormObject = () => {
  const form = document.querySelector(".popup");
  let tempObj = [...new FormData(form)].reduce(
    (acc, [field, value]) => ({ ...acc, [field]: value }),
    {}
  );

  tempObj.startDate = tempObj.startDate.split("-");
  tempObj.startDate[1] = tempObj.startDate[1] - 1;
  tempObj.startTimePlace = tempObj.startTimePlace.split(":");
  tempObj.startDate = tempObj.startDate.concat(tempObj.startTimePlace);
  tempObj.startDate = new Date(...tempObj.startDate);

  tempObj.endDate = tempObj.endDate.split("-");
  tempObj.endDate[1] = tempObj.endDate[1] - 1;
  tempObj.endTimePlace = tempObj.endTimePlace.split(":");
  tempObj.endDate = tempObj.endDate.concat(tempObj.endTimePlace);
  tempObj.endDate = new Date(...tempObj.endDate);

  tempObj.header = tempObj.header === "" ? "No header" : tempObj.header;
  tempObj.description = tempObj.description === "" ? "" : tempObj.description;

  tempObj._id = String(Math.round(Math.random() * 1000000));

  delete tempObj.startTimePlace;
  delete tempObj.endTimePlace;

  return tempObj;
};
