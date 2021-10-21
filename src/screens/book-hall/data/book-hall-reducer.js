const bookHallReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_HALL_LIST_DATA":
      return { ...state, loading: true };
    case "GET_HALL_LIST_FILTERED_DATA":
      return { ...state, loading: true };
    case "GET_HALL_DATA_SUCESS":
      return { ...state, loading: true, data: action.payload };
    default:
      return state;
  }
};

export default bookHallReducer;
