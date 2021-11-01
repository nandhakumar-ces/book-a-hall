export const getHallListData = () => {
  return { type: "GET_HALL_LIST_DATA" };
};

export const getHallListFilteredData = (data) => {
  return { type: "GET_HALL_LIST_FILTERED_DATA", payload: data };
};

export const hallListDataSuccess = () => {
  return { type: "GET_HALL_DATA_SUCESS" };
};

export const saveHallBooking = (data, successCallback) => {
  return { type: "SAVE_HALL_BOOKING", payload: data, successCallback };
};

export const getBookedDates = (data, calendarCallback) => {
  return { type: "GET_BOOKED_DATES", payload: data, calendarCallback };
};
