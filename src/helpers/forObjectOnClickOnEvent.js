export const forObjectOnClickOnEvent = (event, arrayOfEvents) => {
  const id = event.target.dataset.eventId;

  const currenEvent = arrayOfEvents.find((event) => event._id === id);

  let startHour = new Date(currenEvent.startDate).getHours();
  startHour = startHour > 9 ? startHour : `0${startHour}`;
  let startMinutes = new Date(currenEvent.startDate).getMinutes();
  startMinutes = startMinutes > 9 ? startMinutes : `0${startMinutes}`;

  let endHour = new Date(currenEvent.endDate).getHours();
  endHour = endHour > 9 ? endHour : `0${endHour}`;
  let endMinutes = new Date(currenEvent.endDate).getMinutes();
  endMinutes = endMinutes > 9 ? endMinutes : `0${endMinutes}`;
  const startGMTDate = new Date(
    Date.UTC(
      currenEvent.startDate.getFullYear(),
      currenEvent.startDate.getMonth(),
      currenEvent.startDate.getDate()
    )
  );
  const endGMTDate = new Date(
    Date.UTC(
      currenEvent.endDate.getFullYear(),
      currenEvent.endDate.getMonth(),
      currenEvent.endDate.getDate()
    )
  );

  return {
    startTime: `${startHour}:${startMinutes}`,
    endTime: `${endHour}:${endMinutes}`,
    startDate: startGMTDate.toISOString().substr(0, 10),
    endDate: endGMTDate.toISOString().substr(0, 10),
    header: currenEvent.header,
    description: currenEvent.description,
    _id: currenEvent._id,
    id: currenEvent.id,
  };
};
