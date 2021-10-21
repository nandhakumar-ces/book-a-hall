export const getHallListData = () => {
  return { type: "GET_HALL_LIST_DATA" };
};

export const getHallListFilteredData = (data) => {
  return { type: "GET_HALL_LIST_FILTERED_DATA", payload: data };
};

export const hallListDataSuccess = () => {
  return { type: "GET_HALL_DATA_SUCESS" };
};
