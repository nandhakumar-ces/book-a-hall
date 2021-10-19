export const fetchRegistration = (data) => {
  return { type: "FETCH_REGISTRATION", payload: data };
};

export const requestRegistration = () => {
  return { type: "REQUESTED_REGISTRATION" };
};

export const registrationSucess = (data) => {
  return { type: "REGISTRATION_SUCESSS", isDone: data };
};

export const registrationDataFailure = () => {
  return { type: "REGISTRATION_FAILURE" };
};
