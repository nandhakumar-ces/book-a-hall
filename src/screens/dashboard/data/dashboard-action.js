export const getDashboardData = (data) => {
  return { type: "GET_DASHBOARD_DATA", payload: data, history };
};

export const dashboardSuccess = () => {
  return { type: "DASHBOARD_DATA_SUCESS" };
};

export const getBookRequestData = (data) => {
  return { type: "GET_BOOk_REQUEST_DATA", payload: data };
};

export const bookRequestSuccess = () => {
  return { type: "BOOK_REQUEST_SUCESS" };
};
