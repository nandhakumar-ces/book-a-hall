const initialState = {
  bookRequest: {
    data: {},
    loading: false,
    error: false,
  },
};

const bookRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BOOk_REQUEST_DATA":
      return {
        bookRequest: {
          data: {},
          loading: false,
          error: false,
        },
      };
    case "UPDATE_BOOK_REQUEST":
      return {
        bookRequest: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case "BOOK_REQUEST_SUCESS":
      return {
        bookRequest: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };
    case "DELETE_BOOK_REQUEST":
      return {
        bookRequest: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case "DELETE_REQUEST_SUCESS":
      return {
        bookRequest: {
          data: {},
          loading: false,
          error: false,
        },
      };
    case "BOOK_REQUEST_FAILURE":
      return {
        bookRequest: {
          data: {},
          loading: false,
          error: true,
        },
      };
    default:
      return state;
  }
};

export default bookRequestReducer;
