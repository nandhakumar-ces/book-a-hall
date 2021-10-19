export const getDashboardData = (data) => {
  return { type: "GET_DASHBOARD_DATA", payload: data, history };
};

export const dashboardSuccess = () => {
  return { type: "DASHBOARD_DATA_SUCESS" };
};
