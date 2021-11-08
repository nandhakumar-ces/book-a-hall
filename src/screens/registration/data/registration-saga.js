import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "./registration-action";
import { fetchRegistration } from "../../../api/authn-api";

function* saveRegistrationData(action) {
  try {
    const response = yield call(fetchRegistration, action);
    if (response.Status) {
      yield put(actions.registrationSucess(true));
    } else {
      yield put(actions.registrationDataFailure());
    }
  } catch (error) {
    console.log(error);
  }
}

function* actionWatcherRegister() {
  yield takeLatest("FETCH_REGISTRATION", saveRegistrationData);
}

export default actionWatcherRegister;
