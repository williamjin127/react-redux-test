import {
  GET_TODO_FAILED,
  GET_TODO_REQUEST,
  GET_TODO_SUCCESS,
  ADD_TODO_FAILED,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  UPDATE_TODO_FAILED,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  DELETE_TODO_FAILED,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  CLEAR_TODO_ERROR,
} from "../actionTypes";

const initial_state = {
  todos: [],
  loading: false,
  errorMessage: "",
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case GET_TODO_REQUEST:
    case ADD_TODO_REQUEST:
    case UPDATE_TODO_REQUEST:
    case DELETE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };

    case GET_TODO_SUCCESS:
      return {
        ...state,
        todos: action.payload.todos,
        loading: false,
        errorMessage: "",
      };

    case DELETE_TODO_SUCCESS:
    case ADD_TODO_SUCCESS:
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: "",
      };

    case GET_TODO_FAILED:
    case ADD_TODO_FAILED:
    case UPDATE_TODO_FAILED:
    case DELETE_TODO_FAILED:
      return {
        ...state,
        todos: [],
        loading: false,
        errorMessage: action.payload.errorMessage,
      };
    case CLEAR_TODO_ERROR:
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return { ...state };
  }
};
