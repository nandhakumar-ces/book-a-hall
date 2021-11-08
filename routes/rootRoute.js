import express from "express";
import {
  login,
  register,
  dashboard,
  userProfileUpdate,
} from "../controllers/user-controller.js";
import {
  registerHall,
  hallList,
  hallListFilter,
  hallBook,
  hallRequestList,
  hallRequestUpdate,
  hallBookedData,
  hallRequestDelete,
} from "../controllers/hall-controller.js";
import { allUser, allHall } from "../controllers/admin-controller.js";
import config from "./route-constants.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("NodeJS is running on port 5000");
});
router.post(config.LOGIN, login);
router.post(config.REGISTRATION, register);
router.post(config.DASHBOARD, dashboard);
router.post(config.HALL_REGISTRATION, registerHall);
router.get(config.HALL_LIST_DATA, hallList);
router.post(config.HALL_LIST_FILTER_DATA, hallListFilter);
router.post(config.SAVE_HALL_BOOK_DATA, hallBook);
router.post(config.HALL_REQUEST_LIST, hallRequestList);
router.post(config.UPDATE_HALL_REQUEST, hallRequestUpdate);
router.post(config.GET_HALLS_BOOKED, hallBookedData);
router.post(config.DELETE_HALL_REQUEST, hallRequestDelete);
router.post(config.UPDATE_USER_PROFILE, userProfileUpdate);
router.get(config.ALL_USER, allUser);
router.get(config.ALL_HALL, allHall);

export default router;
