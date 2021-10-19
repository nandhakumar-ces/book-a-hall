import { put, call, takeEvery } from "redux-saga/effects";
import { fetchDashboard } from "../../../api/authn-api";

function* fetchDashboardData(action) {
  try {
    const response = yield call(fetchDashboard, action);
    yield put({
      type: "DASHBOARD_DATA_SUCESS",
      payload: response,
    });
  } catch (error) {
    console.log(error);
  }
}

function* actionWatcherDashboard() {
  yield takeEvery("GET_DASHBOARD_DATA", fetchDashboardData);
}

export default actionWatcherDashboard;
