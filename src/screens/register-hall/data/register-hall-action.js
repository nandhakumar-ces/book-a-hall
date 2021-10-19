export const fetchRegistration = (data, history) => {
  return { type: "FETCH_HALL_REGISTRATION", payload: data, history };
};

export const requestRegistration = () => {
  return { type: "REQUESTED_HALL_REGISTRATION" };
};

export const registrationSucess = (data) => {
  return { type: "REGISTRATION_HALL_SUCESSS", isDone: data };
};

export const registrationDataFailure = () => {
  return { type: "REGISTRATION_HALL_FAILURE" };
};
