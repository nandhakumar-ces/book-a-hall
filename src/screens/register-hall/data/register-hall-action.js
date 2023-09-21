export const fetchRegistration = (data) => {
  return { type: "FETCH_HALL_REGISTRATION", payload: data };
};

export const requestRegistration = () => {
  return { type: "REQUESTED_HALL_REGISTRATION" };
};

export const registrationSucess = () => {
  return { type: "REGISTRATION_HALL_SUCESSS" };
};

export const registrationDataFailure = () => {
  return { type: "REGISTRATION_HALL_FAILURE" };
};
