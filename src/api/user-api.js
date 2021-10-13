import { fetchPost } from "./service";

const LOGIN_URL = "/user/login";
const REGISTRATION_URL = "/user/register";

export const fetchLogin = async (action) => {
  const params = action.payload;
  try {
    const response = await fetchPost(LOGIN_URL, params);
    return response;
  } catch (err) {
    console.log(err, "this error");
  }
};

export const fetchRegistration = async (action) => {
  const params = action.payload;
  try {
    const response = await fetchPost(REGISTRATION_URL, params);
    return response;
  } catch (err) {
    console.log(err, "this error");
  }
};
