const allHallReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_HALL_DATA":
      return { ...state, loading: true, data: {} };
    case "ALL_HALL_DATA_SUCCESS":
      return { ...state, loading: true, data: action.payload };
    default:
      return state;
  }
};

export default allHallReducer;
