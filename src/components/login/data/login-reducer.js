const initialState = {
  data: {},
  loading: false,
  error: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUESTED_LOGIN":
      return {
        data: {},
        loading: true,
        error: false,
      };
    case "LOGIN_SUCESSS":
      return {
        data: action,
        loading: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        data: {},
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default loginReducer;
