export const updateProfileRequest = (data) => {
  return { type: "UPDATE_PROFILE_REQUEST", payload: data };
};

export const updateProfileSucess = (data) => {
  return { type: "UPDATE_PROFILE_SUCCESS", response: data };
};

export const updateProfileFailure = () => {
  return { type: "UPDATE_PROFILE_FAILURE" };
};
