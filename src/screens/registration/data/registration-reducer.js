const initialState = {
  data: {},
  loading: false,
  error: false,
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUESTED_REGISTRATION":
      return {
        data: {},
        loading: true,
        error: false,
      };
    case "REGISTRATION_SUCESSS":
      return {
        data: action,
        loading: false,
        error: false,
      };
    case "REGISTRATION_FAILURE":
      return {
        data: {},
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default registrationReducer;
