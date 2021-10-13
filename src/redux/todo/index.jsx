import { call, put, takeLatest } from "redux-saga/effects";
import {
  getTodos as getTodosApi,
  addTodo as addTodoApi,
  updateTodo as updateTodoApi,
  deleteTodo as deleteTodoApi,
} from "../../api/index";
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
} from "../../redux/actionTypes";

function* getTodos() {
  try {
    const response = yield call(getTodosApi);
    yield put({
      type: GET_TODO_SUCCESS,
      payload: {
        todos: response.data,
        errorMessage: "",
      },
    });
  } catch (error) {
    yield put({
      type: GET_TODO_FAILED,
      payload: {
        todo: [],
        errorMessage: error?.response?.data?.error,
      },
    });
  }
}

function* addTodo(action) {
  try {
    const response = yield call(addTodoApi, action.payload);
    yield put({
      type: ADD_TODO_SUCCESS,
      payload: {
        todo: response.data,
        errorMessage: "",
      },
    });
  } catch (error) {
    yield put({
      type: ADD_TODO_FAILED,
      payload: {
        todo: [],
        errorMessage: error?.response?.data?.error,
      },
    });
  }
}

function* updateTodo(action) {
  try {
    const response = yield call(updateTodoApi, action.payload);
    yield put({
      type: UPDATE_TODO_SUCCESS,
      payload: {
        todo: response.data,
        errorMessage: "",
      },
    });
  } catch (error) {
    yield put({
      type: UPDATE_TODO_FAILED,
      payload: {
        todo: [],
        errorMessage: error?.response?.data?.error,
      },
    });
  }
}

function* deleteTodo(action) {
  try {
    const response = yield call(deleteTodoApi, action.payload);
    yield put({
      type: DELETE_TODO_SUCCESS,
      payload: {
        todo: response.data,
        errorMessage: "",
      },
    });
  } catch (error) {
    yield put({
      type: DELETE_TODO_FAILED,
      payload: {
        todo: [],
        errorMessage: error?.response?.data?.error,
      },
    });
  }
}

export function* todo() {
  yield takeLatest(GET_TODO_REQUEST, getTodos);
  yield takeLatest(ADD_TODO_REQUEST, addTodo);
  yield takeLatest(UPDATE_TODO_REQUEST, updateTodo);
  yield takeLatest(DELETE_TODO_REQUEST, deleteTodo);
}
