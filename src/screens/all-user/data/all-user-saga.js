import { put, call, takeLatest } from "redux-saga/effects";
import { fetchAllUserData } from "../../../api/admin";

function* fetchAllUser() {
  try {
    const response = yield call(fetchAllUserData);
    if (response.Status) {
      yield put({
        type: "ALL_USER_DATA_SUCCESS",
        payload: response.Data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
function* actionWatcherAllUser() {
  yield takeLatest("GET_ALL_USER_DATA", fetchAllUser);
}

export default actionWatcherAllUser;
