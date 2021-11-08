import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import {
  fetchHallRequest,
  updateHallRequest,
  deleteBookRequestData,
} from "../../../api/hall-api";
import * as actions from "./book-request-action";

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

function* updateBookRequest(action) {
  try {
    const response = yield call(updateHallRequest, action);
    if (response.Status) action.bookRequestSuccess();
  } catch (error) {
    console.log(error);
  }
}

function* deleteBookRequest(action) {
  try {
    const response = yield call(deleteBookRequestData, action);
    console.log(response, "rsp");
    if (response.Status) {
      yield put(actions.deleteRequestSuceess());
    } else {
      yield put(actions.bookRequestFailure());
    }
  } catch (error) {
    console.log(error);
  }
}

function* actionWatcherBookRequest() {
  yield takeEvery("GET_BOOk_REQUEST_DATA", fetchBookRequestData);
  yield takeLatest("UPDATE_BOOK_REQUEST", updateBookRequest);
  yield takeLatest("DELETE_BOOK_REQUEST", deleteBookRequest);
}

export default actionWatcherBookRequest;
