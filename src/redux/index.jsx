import { combineReducers } from "redux";
import Auth from "./auth/reducer";
import Todo from "./todo/reducer";

const reducers = combineReducers({
  Auth,
  Todo,
});

export default reducers;
