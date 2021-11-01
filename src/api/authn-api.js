import { fetchPost } from "./service";
import config from "../config";

export const fetchLogin = async (action) => {
  const { payload } = action || {};
  try {
    const response = await fetchPost(config.LOGIN_URL, payload);
    return response;
  } catch (err) {
    console.log(err, "error");
  }
};

export const fetchRegistration = async (action) => {
  const { payload } = action || {};
  try {
    const response = await fetchPost(config.REGISTRATION_URL, payload);
    return response;
  } catch (err) {
    console.log(err, "error");
  }
};

export const fetchDashboard = async (action) => {
  const { payload } = action || {};
  try {
    const response = await fetchPost(config.DASHBOARD_URL, payload);
    return response;
  } catch (err) {
    console.log(err, "error");
  }
};

export const updateUserProfileData = async (action) => {
  const { payload } = action || {};
  try {
    const response = await fetchPost(config.UPDATE_USER_PROFILE, payload);
    return response;
  } catch (err) {
    console.log(err, "error");
  }
};
