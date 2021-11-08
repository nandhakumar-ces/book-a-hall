import { fetchGet } from "./service";
import config from "../config";

export const fetchAllUserData = async () => {
  try {
    const response = await fetchGet(config.ALLUSER_URL);
    return response;
  } catch (err) {
    console.log(err, "error");
  }
};

export const fetchAllHallData = async () => {
  try {
    const response = await fetchGet(config.ALLHALL_URL);
    return response;
  } catch (err) {
    console.log(err, "error");
  }
};
