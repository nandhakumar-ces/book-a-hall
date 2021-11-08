const dashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_DASHBOARD_DATA":
      return { ...state, loading: true, data: {} };
    case "DASHBOARD_DATA_SUCESS":
      return { ...state, loading: true, data: action.payload };
    case "GET_BOOk_REQUEST_DATA":
      return { ...state, loading: true };
    case "BOOK_REQUEST_SUCESS":
      return { ...state, loading: true, data: action.payload };
    default:
      return state;
  }
};

export default dashboardReducer;
