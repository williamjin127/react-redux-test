import { all } from "redux-saga/effects";
import { auth } from "../redux/auth";
import { todo } from "../redux/todo";

export default function* rootSagas() {
  yield all([auth(), todo()]);
}
