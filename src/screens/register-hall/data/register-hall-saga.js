import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "./register-hall-action";
import { fetchHallRegistration } from "../../../api/hall-api";

function* saveRegistrationData(action) {
  try {
    yield put(actions.requestRegistration());
    const response = yield call(fetchHallRegistration, action);
    if (response.Status) {
      yield put(actions.registrationSucess());
    } else {
      yield put(actions.registrationDataFailure());
    }
  } catch (error) {
    console.log(error);
  }
}

function* actionWatcherHallRegister() {
  yield takeLatest("FETCH_HALL_REGISTRATION", saveRegistrationData);
}

export default actionWatcherHallRegister;
