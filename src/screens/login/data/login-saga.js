/* eslint-disable no-unused-vars */
import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "./login-action";
import { fetchLogin } from "../../../api/authn-api";

function* verifyUserLogin(action) {
  try {
    yield put(actions.requestLogin());
    const response = yield call(fetchLogin, action);
    if (response.length > 0) {
      sessionStorage.setItem("mobileNumber", response[0].mobileNumber);
      sessionStorage.setItem("firstName", response[0].firstName);
      sessionStorage.setItem("userType", response[0].userType);
      sessionStorage.setItem("isLoggedIn", true);

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
