import { all } from "redux-saga/effects";
import actionWatcherRegister from "../components/registration/data/registration-saga";
import actionWatcherLogin from "../components/login/data/login-saga";

export default function* rootSaga() {
  yield all([actionWatcherRegister(), actionWatcherLogin()]);
}
