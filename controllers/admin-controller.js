import User from "../models/user-model.js";
import { Hall } from "../models/hall-model.js";

export const allUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ Status: true, Data: users });
  } catch (error) {
    res.json({ Status: false, Message: error.message });
  }
};

export const allHall = async (req, res) => {
  try {
    const hall = await Hall.find().populate("hallOwner");
    res.json({ Status: true, Data: hall });
  } catch (error) {
    res.json({ Status: false, Message: error.message });
  }
};
