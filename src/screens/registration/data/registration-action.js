export const fetchRegistration = (data) => {
  return { type: "FETCH_REGISTRATION", payload: data };
};

export const registrationSucess = (isDone) => {
  return { type: "REGISTRATION_SUCESSS", payload: isDone };
};

export const registrationDataFailure = () => {
  return { type: "REGISTRATION_FAILURE" };
};
