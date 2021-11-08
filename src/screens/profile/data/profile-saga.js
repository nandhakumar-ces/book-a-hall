import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "./profile-action";
import { updateUserProfileData } from "../../../api/authn-api";

function* updateUserProfile(action) {
  try {
    const response = yield call(updateUserProfileData, action);
    if (response.Status) {
      yield put(actions.updateProfileSucess(response.Data));
    } else {
      yield put(actions.updateProfileFailure());
    }
  } catch (error) {
    console.log(error);
  }
}

function* actionWatcherProfile() {
  yield takeLatest("UPDATE_PROFILE_REQUEST", updateUserProfile);
}

export default actionWatcherProfile;
