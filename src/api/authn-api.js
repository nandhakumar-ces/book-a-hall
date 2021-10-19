import { fetchPost } from "./service";
import config from "../config";

export const fetchLogin = async (action) => {
  const params = action.payload;
  try {
    const response = await fetchPost(config.LOGIN_URL, params);
    return response;
  } catch (err) {
    console.log(err, "this error");
  }
};

export const fetchRegistration = async (action) => {
  const params = action.payload;
  try {
    const response = await fetchPost(config.REGISTRATION_URL, params);
    return response;
  } catch (err) {
    console.log(err, "this error");
  }
};

export const fetchDashboard = async (action) => {
  const params = action.payload;
  try {
    const response = await fetchPost(config.DASHBOARD_URL, params);
    return response;
  } catch (err) {
    console.log(err, "this error");
  }
};
