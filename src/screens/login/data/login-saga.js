/* eslint-disable no-unused-vars */
import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "./login-action";
import { userDetails } from "../../../constants/user-info";
import { fetchLogin } from "../../../api/authn-api";

function* verifyUserLogin(action) {
  try {
    yield put(actions.requestLogin());
    const response = yield call(fetchLogin, action);
    console.log(response);
    if (response.length > 0) {
      // userDetails.userID = response[0]._id;
      // userDetails.firstName = response[0].firstName;
      // userDetails.lastName = response[0].lastName;
      // userDetails.gender = response[0].gender;
      // userDetails.dateOfBirth = response[0].dateOfBirth;
      // userDetails.age = response[0].age;
      // userDetails.eMail = response[0].eMail;
      // userDetails.mobileNumber = response[0].mobileNumber;
      // userDetails.userType = response[0].userType;
      sessionStorage.setItem("mobileNumber", response[0].mobileNumber);
      sessionStorage.setItem("firstName", response[0].firstName);
      sessionStorage.setItem("userType", response[0].userType);
      sessionStorage.setItem("userID", response[0]._id);
      sessionStorage.setItem("isLoggedIn", true);

      yield put(actions.loginSucess(true));
      action.history.push("/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
}

function* actionWatcherLogin() {
  yield takeLatest("FETCH_LOGIN", verifyUserLogin);
}

export default actionWatcherLogin;
