import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "./login-action";
import { fetchLogin } from "../../../api/authn-api";

function* verifyUserLogin(action) {
  try {
    yield put(actions.requestLogin());
    const response = yield call(fetchLogin, action);
    if (response.Data !== null) {
      yield put(actions.loginSucess(response.Data));
    } else {
      yield put(actions.loginDataFailure());
    }
  } catch (error) {
    console.log(error);
  }
}

function* actionWatcherLogin() {
  yield takeLatest("FETCH_LOGIN", verifyUserLogin);
}

export default actionWatcherLogin;
