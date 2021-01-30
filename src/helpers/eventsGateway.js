// const baseUrl = 'https://5e517090f2c0d300147c07c9.mockapi.io/api/v1/eventsArray';

const baseUrl =
  "https://5e517090f2c0d300147c07c9.mockapi.io/api/v1/arrayOfEvents";

export const fetchForGetData = () => {
  return fetch(baseUrl).then((response) => response.json());
  // .then(array => array.map(({_id, ...obj}) => ({...obj, id: _id})));
};

export const onCreateEventAfterSubmit = (object) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(object),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Internal Server Error. Can`t display events");
  });
};

export const onChangeEventAfterSubmit = (object, id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(object),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Internal Server Error. Can`t display events");
  });
};

export const onDeleteEventInArray = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok)
      throw new Error("Internal Server Error. Can`t display events");
  });
};
