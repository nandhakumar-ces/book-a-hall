const initialState = {
  registration: {
    data: {},
    loading: false,
    error: false,
  },
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REGISTRATION":
      return {
        registration: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case "REGISTRATION_SUCESSS":
      return {
        registration: {
          data: action,
          loading: false,
          error: false,
        },
      };
    case "REGISTRATION_FAILURE":
      return {
        registration: {
          data: action,
          loading: false,
          error: true,
        },
      };
    default:
      return state;
  }
};

export default registrationReducer;
