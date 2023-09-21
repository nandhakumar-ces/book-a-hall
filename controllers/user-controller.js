import User from "../models/user-model.js";
import { Hall } from "../models/hall-model.js";
import { apiParams } from "../src/constants/index.js";

export const login = async (req, res) => {
  const { username, password, type } = req.body;
  const data = {};
  data["password"] = password;
  if (type === apiParams.PHONENUMBER) data["mobileNumber"] = username;
  else data["eMail"] = username;

  try {
    User.findOne(data, function (err, user) {
      if (err) {
        res.json({ Status: false });
      } else {
        return res.json({
          Status: true,
          Data: user,
        });
      }
    });
  } catch (error) {
    res.json({ Status: false, Message: error.message });
  }
};

export const register = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    User.findOne({
      $or: [{ eMail: user.eMail }, { mobileNumber: user.mobileNumber }],
    }).exec(function (err, docs) {
      if (err) console.log(err);
      else {
        if (docs === null) {
          newUser.save();
          return res.json({
            Status: true,
          });
        } else
          return res.json({
            Status: false,
          });
      }
    });
  } catch (error) {
    res.json({ Status: false, Message: error.message });
  }
};

export const dashboard = async (req, res) => {
  const { hallOwner } = req.body;
  try {
    const user = await Hall.find({ hallOwner: hallOwner });
    res.json({ Status: true, Data: user });
  } catch (error) {
    res.json({ Status: false, Message: error.message });
  }
};

export const userProfileUpdate = async (req, res) => {
  const { _id, firstName, lastName, password, gender, dateOfBirth, age } =
    req.body;
  const filter = { _id: _id };
  const update = {
    firstName: firstName,
    lastName: lastName,
    password: password,
    gender: gender,
    dateOfBirth: dateOfBirth,
    age: age,
  };

  try {
    let doc = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.json({ Status: true, Data: doc });
  } catch (error) {
    res.json({ message: error.message });
  }
};
