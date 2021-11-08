import { fetchPost, fetchGet } from "./service";
import config from "../config";

export const fetchHallRegistration = async (action) => {
  const { payload } = action || {};
  try {
    const response = await fetchPost(config.HALL_REGISTRATION_URL, payload);
    return response;
  } catch (err) {
    console.log(err, "error");
  }
};

export const fetchHallListData = async () => {
  try {
    const response = await fetchGet(config.HALL_LIST_DATA);
    return response;
  } catch (err) {
    console.log(err, "error");
  }
};

export const fetchHallListFilteredData = async (action) => {
  const { payload } = action || {};
  try {
    const response = await fetchPost(config.HALL_LIST_FILTER_DATA, payload);
    return response;
  } catch (err) {
    console.log(err, "error");
  }
};

export const fetchSaveHallBookData = async (action) => {
  const { payload } = action || {};
  try {
    const response = await fetchPost(config.SAVE_HALL_BOOK_DATA, payload);
    return response;
  } catch (err) {
    console.log(err, "error");
  }
};

export const fetchHallRequest = async (action) => {
  const { payload } = action || {};
  try {
    const response = await fetchPost(config.HALL_REQUEST_LIST, payload);
    return response;
  } catch (err) {
    console.log(err, "error");
  }
};

export const updateHallRequest = async (action) => {
  const { id, type, hallStatus } = action.payload;
  const params = {
    _id: id,
    approvalStatus: type,
    hallStatus: hallStatus,
  };
  try {
    const response = await fetchPost(config.UPDATE_HALL_REQUEST, params);
    return response;
  } catch (err) {
    console.log(err, "error");
  }
};

export const fetchBookedData = async (action) => {
  const { payload } = action || {};
  try {
    const response = await fetchPost(config.GET_HALLS_BOOKED, payload);
    return response;
  } catch (err) {
    console.log(err, "error");
  }
};

export const deleteBookRequestData = async (action) => {
  const { id } = action.payload;
  const params = {
    _id: id,
  };
  try {
    const response = await fetchPost(config.DELETE_HALL_REQUEST, params);
    return response;
  } catch (err) {
    console.log(err, "error");
  }
};
