import { put, call, takeLatest } from "redux-saga/effects";
import { fetchAllHallData } from "../../../api/admin";

function* fetchAllHall() {
  try {
    const response = yield call(fetchAllHallData);
    if (response.Status) {
      yield put({
        type: "ALL_HALL_DATA_SUCCESS",
        payload: response.Data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
function* actionWatcherAllHall() {
  yield takeLatest("GET_ALL_HALL_DATA", fetchAllHall);
}

export default actionWatcherAllHall;
