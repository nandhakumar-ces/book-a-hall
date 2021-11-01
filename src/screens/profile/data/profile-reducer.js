const initialState = {
  profile: {
    data: {},
    loading: false,
    error: false,
  },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE_REQUEST":
      return {
        profile: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        profile: {
          data: action,
          loading: false,
          error: false,
        },
      };
    case "UPDATE_PROFILE_FAILURE":
      return {
        profile: {
          data: {},
          loading: false,
          error: true,
        },
      };
    default:
      return state;
  }
};

export default profileReducer;
