export const fetchLogin = (data) => {
  return { type: "FETCH_LOGIN", payload: data };
};

export const requestLogin = () => {
  return { type: "REQUESTED_LOGIN" };
};

export const loginSucess = (data) => {
  return { type: "LOGIN_SUCESSS", response: data };
};

export const loginDataFailure = () => {
  return { type: "LOGIN_FAILURE" };
};

export const requestLogOut = () => {
  return { type: "REQUEST_LOGOUT" };
};
