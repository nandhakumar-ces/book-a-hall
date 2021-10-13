/* eslint-disable no-unused-vars */
import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "./login-action";
import { fetchLogin } from "../../../api/user-api";

function* verifyUserLogin(action) {
  try {
    yield put(actions.requestLogin());
    const response = yield call(fetchLogin, action);
    if (response.length > 0) {
      yield put(actions.loginSucess(true));
      action.history.push("/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
}

function* actionWatcherLogin() {
  yield takeLatest("FETCH_LOGIN", verifyUserLogin);
}

export default actionWatcherLogin;
