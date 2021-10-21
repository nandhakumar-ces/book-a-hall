import express from "express";

import { login, register, dashboard } from "../controllers/user-controller.js";
import {
  registerHall,
  hallList,
  hallListFilter,
} from "../controllers/hall-controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("HELLO, THIS ONE WORKS");
});
router.post("/login", login);
router.post("/register", register);
router.post("/dashboard", dashboard);
router.post("/register-hall", registerHall);
router.get("/hall-list", hallList);
router.post("/hall-list-filter", hallListFilter);

export default router;
