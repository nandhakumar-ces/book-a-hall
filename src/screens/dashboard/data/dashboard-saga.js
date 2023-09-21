import { put, call, takeEvery } from "redux-saga/effects";
import { fetchDashboard } from "../../../api/authn-api";
import { fetchHallRequest } from "../../../api/hall-api";

function* fetchDashboardData(action) {
  try {
    const response = yield call(fetchDashboard, action);
    if (response.Status) {
      yield put({
        type: "DASHBOARD_DATA_SUCESS",
        payload: response.Data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchBookRequestData(action) {
  try {
    const response = yield call(fetchHallRequest, action);
    if (response.Status) {
      yield put({
        type: "BOOK_REQUEST_SUCESS",
        payload: response.Data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* actionWatcherDashboard() {
  yield takeEvery("GET_DASHBOARD_DATA", fetchDashboardData);
  yield takeEvery("GET_BOOk_REQUEST_DATA", fetchBookRequestData);
}

export default actionWatcherDashboard;
