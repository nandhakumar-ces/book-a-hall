import { all } from "redux-saga/effects";
import actionWatcherLogin from "../screens/login/data/login-saga";
import actionWatcherRegister from "../screens/registration/data/registration-saga";
import actionWatcherDashboard from "../screens/dashboard/data/dashboard-saga";
import actionWatcherHallRegister from "../screens/register-hall/data/register-hall-saga";
import actionWatcherHallBook from "../screens/book-hall/data/book-hall-saga";
import actionWatcherBookRequest from "../screens/book-request/data/book-request-saga";
import actionWatcherProfile from "../screens/profile/data/profile-saga";

export default function* rootSaga() {
  yield all([
    actionWatcherLogin(),
    actionWatcherRegister(),
    actionWatcherDashboard(),
    actionWatcherHallRegister(),
    actionWatcherHallBook(),
    actionWatcherBookRequest(),
    actionWatcherProfile(),
  ]);
}
