/* eslint-disable no-unused-vars */
import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "./registration-action";
import { fetchRegistration } from "../../../api/user-api";

function* saveRegistrationData(action) {
  try {
    yield put(actions.requestRegistration());
    const response = yield call(fetchRegistration, action);
    if (response === "Success") {
      yield put(actions.registrationSucess(true));
    }

    console.log(response, "api response");
  } catch (error) {
    console.log(error);
  }
}

function* actionWatcherRegister() {
  yield takeLatest("FETCH_REGISTRATION", saveRegistrationData);
}

export default actionWatcherRegister;
