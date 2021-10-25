/* eslint-disable no-unused-vars */
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
  const hall = await Hall.find({});
  res.json(hall);
};

export const hallListFilter = async (req, res) => {
  const { hallCategory, hallType, capacity, sortby } = req.body;
  const data = {
    hallCategory: hallCategory,
  };
  if (hallType != "") data["halltype"] = hallType;
  if (capacity != "") data["capacity"] = capacity;
  let hall;
  if (sortby != "") hall = await Hall.find(data);
  else {
    if (sortby == "lowtohigh")
      hall = await Hall.find(data).sort({ hallPrice: "asc" });
    else hall = await Hall.find(data).sort({ hallPrice: -1 });
  }

  try {
    res.json(hall);
  } catch (error) {
    res.json({ message: error.message });
  }
};
