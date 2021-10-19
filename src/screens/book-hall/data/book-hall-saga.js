import { put, call, takeEvery } from "redux-saga/effects";
import { fetchHallListData } from "../../../api/hall-api";

function* fetchHallList(action) {
  try {
    const response = yield call(fetchHallListData, action);
    yield put({
      type: "GET_HALL_DATA_SUCESS",
      payload: response,
    });
  } catch (error) {
    console.log(error);
  }
}

function* actionWatcherHallBook() {
  yield takeEvery("GET_HALL_LIST_DATA", fetchHallList);
}

export default actionWatcherHallBook;
