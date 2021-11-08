import { combineReducers } from "redux";
import loginReducer from "../screens/login/data/login-reducer";
import registrationReducer from "../screens/registration/data/registration-reducer";
import dashboardReducer from "../screens/dashboard/data/dashboard-reducer";
import hallRegistrationReducer from "../screens/register-hall/data/register-hall-reducer";
import bookHallReducer from "../screens/book-hall/data/book-hall-reducer";
import bookRequestReducer from "../screens/book-request/data/book-request-reducer";
import profileReducer from "../screens/profile/data/profile-reducer";
import allUserReducer from "../screens/all-user/data/all-user-reducer";
import allHallReducer from "../screens/all-hall/data/all-hall-reducer";

const reducer = combineReducers({
  loginReducer,
  registrationReducer,
  dashboardReducer,
  hallRegistrationReducer,
  bookHallReducer,
  bookRequestReducer,
  profileReducer,
  allUserReducer,
  allHallReducer,
});

export default reducer;
