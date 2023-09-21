import { put, call, takeLatest } from "redux-saga/effects";
import {
  fetchHallListData,
  fetchHallListFilteredData,
  fetchSaveHallBookData,
  fetchBookedData,
} from "../../../api/hall-api";

function* fetchHallList(action) {
  try {
    const response = yield call(fetchHallListData, action);
    if (response.Status) {
      yield put({
        type: "GET_HALL_DATA_SUCESS",
        payload: response.Data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchHallFilteredList(action) {
  try {
    const response = yield call(fetchHallListFilteredData, action);
    if (response.Status) {
      yield put({
        type: "GET_HALL_DATA_SUCESS",
        payload: response.Data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchSaveHallBooking(action) {
  try {
    const response = yield call(fetchSaveHallBookData, action);
    if (response.Status) {
      action.successCallback();
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchBookedDates(action) {
  try {
    const response = yield call(fetchBookedData, action);
    if (response.Status) action.calendarCallback(response.Data);
  } catch (error) {
    console.log(error);
  }
}

function* actionWatcherHallBook() {
  yield takeLatest("GET_HALL_LIST_DATA", fetchHallList);
  yield takeLatest("GET_HALL_LIST_FILTERED_DATA", fetchHallFilteredList);
  yield takeLatest("SAVE_HALL_BOOKING", fetchSaveHallBooking);
  yield takeLatest("GET_BOOKED_DATES", fetchBookedDates);
}

export default actionWatcherHallBook;
