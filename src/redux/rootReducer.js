import { combineReducers } from "redux";
import loginReducer from "../components/login/data/login-reducer";
import registrationReducer from "../components/registration/data/registration-reducer";

const reducer = combineReducers({
  loginReducer,
  registrationReducer,
});

export default reducer;
