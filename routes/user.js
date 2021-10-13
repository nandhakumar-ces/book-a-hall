import express from "express";

import { login, register } from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("THIS WORKS");
});
router.post("/login", login);
router.post("/register", register);

export default router;