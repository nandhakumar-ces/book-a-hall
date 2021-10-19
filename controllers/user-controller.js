import User from "../models/user-model.js";
import Hall from "../models/hall-model.js";

export const login = async (req, res) => {
  const { username } = req.body;
  const user = await User.find({ mobileNumber: username });
  res.json(user);
};

export const register = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.json("Success");
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const dashboard = async (req, res) => {
  const { hallOwner } = req.body;
  const user = await Hall.find({ hallOwner: hallOwner });
  res.json(user);
};
