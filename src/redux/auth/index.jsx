import { call, put, takeLatest } from "redux-saga/effects";
import moment from "moment";
import { login as loginApi } from "../../api/index";
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../../redux/actionTypes";

function* loginAsync(action) {
  try {
    const user = yield call(loginApi, action.payload);
    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        signInUserSession: {
          token: user.data.token,
          expiresIn: moment().add(12, "h").unix(),
        },
        errorMessage: "",
      },
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILED,
      payload: {
        signInUserSession: undefined,
        errorMessage: error?.response?.data?.error,
      },
    });
  }
}

function* logoutAsync() {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
      payload: {
        signInUserSession: undefined,
        errorMessage: "",
      },
    });
  } catch (error) {
    yield put({
      type: LOGOUT_FAILED,
      payload: {
        signInUserSession: undefined,
        errorMessage: error.message,
      },
    });
  }
}

export function* auth() {
  yield takeLatest(LOGIN_REQUEST, loginAsync);
  yield takeLatest(LOGOUT_REQUEST, logoutAsync);
}
