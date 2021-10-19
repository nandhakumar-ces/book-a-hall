export const fetchLogin = (data, history) => {
  return { type: "FETCH_LOGIN", payload: data, history };
};

export const requestLogin = () => {
  return { type: "REQUESTED_LOGIN" };
};

export const loginSucess = (data) => {
  return { type: "LOGIN_SUCESSS", isDone: data };
};

export const loginDataFailure = () => {
  return { type: "LOGIN_FAILURE" };
};
