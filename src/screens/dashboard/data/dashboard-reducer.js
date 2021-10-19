const dashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_DASHBOARD_DATA":
      return { ...state, loading: true };
    case "DASHBOARD_DATA_SUCESS":
      return { ...state, loading: true, data: action.payload };
    default:
      return state;
  }
};

export default dashboardReducer;
