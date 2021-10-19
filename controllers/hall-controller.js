import Hall from "../models/hall-model.js";

export const registerHall = async (req, res) => {
  const user = req.body;
  const newUser = new Hall(user);
  try {
    await newUser.save();
    res.json("Success");
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const hallList = async (req, res) => {
  console.log("check point 1");
  const hall = await Hall.find({});
  res.json(hall);
};
