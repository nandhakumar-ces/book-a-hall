const allUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_USER_DATA":
      return { ...state, loading: true, data: {} };
    case "ALL_USER_DATA_SUCCESS":
      return { ...state, loading: true, data: action.payload };
    default:
      return state;
  }
};

export default allUserReducer;
