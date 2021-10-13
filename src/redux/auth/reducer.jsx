import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  CLEAR_AUTH_ERROR,
} from "../actionTypes";

const initial_state = {
  signInUserSession: undefined,
  loading: false,
  errorMessage: "",
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        signInUserSession: action.payload.signInUserSession,
        loading: false,
        errorMessage: "",
      };

    case LOGIN_FAILED:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAILED:
      return {
        ...state,
        signInUserSession: action.payload.signInUserSession,
        loading: false,
        errorMessage: action.payload.errorMessage,
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return { ...state };
  }
};
