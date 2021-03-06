import { put, call, takeLatest } from "redux-saga/effects";
import {
  fetchHallListData,
  fetchHallListFilteredData,
} from "../../../api/hall-api";

function* fetchHallList(action) {
  try {
    const response = yield call(fetchHallListData, action);
    console.log(response);
    yield put({
      type: "GET_HALL_DATA_SUCESS",
      payload: response,
    });
  } catch (error) {
    console.log(error);
  }
}

function* fetchHallFilteredList(action) {
  try {
    console.log(action, "book actiona");
    const response = yield call(fetchHallListFilteredData, action);
    console.log(response, "book response");
    yield put({
      type: "GET_HALL_DATA_SUCESS",
      payload: response,
    });
  } catch (error) {
    console.log(error);
  }
}

function* actionWatcherHallBook() {
  yield takeLatest("GET_HALL_LIST_DATA", fetchHallList);
  yield takeLatest("GET_HALL_LIST_FILTERED_DATA", fetchHallFilteredList);
}

export default actionWatcherHallBook;
