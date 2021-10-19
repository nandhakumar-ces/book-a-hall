import { fetchPost, fetchGet } from "./service";
import config from "../config";

export const fetchHallRegistration = async (action) => {
  const params = action.payload;
  try {
    const response = await fetchPost(config.HALL_REGISTRATION_URL, params);
    return response;
  } catch (err) {
    console.log(err, "this error");
  }
};

export const fetchHallListData = async () => {
  try {
    const response = await fetchGet(config.HALL_LIST_DATA);
    return response;
  } catch (err) {
    console.log(err, "this error");
  }
};
