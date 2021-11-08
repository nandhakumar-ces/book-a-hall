const initialState = {
  login: {
    data: {},
    loading: false,
    error: false,
  },
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUESTED_LOGIN":
      return {
        login: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case "LOGIN_SUCESSS":
      return {
        login: {
          data: action,
          loading: false,
          error: false,
        },
      };
    case "LOGIN_FAILURE":
      return {
        login: {
          data: action,
          loading: false,
          error: true,
        },
      };
    case "REQUEST_LOGOUT":
      return {
        login: {
          data: {},
          loading: false,
          error: false,
        },
      };
    default:
      return state;
  }
};

export default loginReducer;
