const initialState = {
  data: {},
  loading: false,
  error: false,
};

const hallRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUESTED_HALL_REGISTRATION":
      return {
        data: {},
        loading: true,
        error: false,
      };
    case "REGISTRATION_HALL_SUCESSS":
      return {
        data: action,
        loading: false,
        error: false,
      };
    case "REGISTRATION_HALL_FAILURE":
      return {
        data: {},
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default hallRegistrationReducer;
