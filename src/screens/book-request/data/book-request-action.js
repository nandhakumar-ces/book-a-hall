export const getBookRequestData = (data) => {
  return { type: "GET_BOOk_REQUEST_DATA", payload: data, history };
};

export const updateBookRequest = (data, successCallback) => {
  return { type: "UPDATE_BOOK_REQUEST", payload: data, successCallback };
};

export const bookRequestSuccess = () => {
  return { type: "BOOK_REQUEST_SUCESS" };
};

export const deleteBookRequest = (data) => {
  return { type: "DELETE_BOOK_REQUEST", payload: data };
};

export const deleteRequestSuceess = () => {
  return { type: "DELETE_REQUEST_SUCESS" };
};

export const bookRequestFailure = () => {
  return { type: "BOOK_REQUEST_FAILURE" };
};
