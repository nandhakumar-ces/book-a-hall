import { Hall, HallBooking } from "../models/hall-model.js";
import mongoose from "mongoose";

export const registerHall = async (req, res) => {
  const hallData = req.body;
  const newUser = new Hall(hallData);
  try {
    await newUser.save();
    res.json({
      Status: true,
    });
  } catch (error) {
    res.json({
      Status: false,
      Message: error.message,
    });
  }
};

export const hallList = async (req, res) => {
  try {
    const hall = await Hall.find({});
    res.json({
      Status: true,
      Data: hall,
    });
  } catch (error) {
    res.json({
      Status: false,
      Message: error.message,
    });
  }
};

export const hallListFilter = async (req, res) => {
  const { hallCategory, hallType, capacity, sortby } = req.body;
  let hall;
  const data = {};
  if (hallCategory !== "") data["hallCategory"] = hallCategory;
  if (hallType !== null) data["halltype"] = hallType;
  if (capacity !== "") data["capacity"] = capacity;
  if (sortby == null) hall = await Hall.find(data);
  else {
    if (sortby == "lowtohigh") {
      hall = await Hall.find(data).sort("hallPrice");
    } else {
      hall = await Hall.find(data).sort("-hallPrice");
    }
  }
  try {
    res.json({
      Status: true,
      Data: hall,
    });
  } catch (error) {
    res.json({
      Status: true,
      Message: error.message,
    });
  }
};

export const hallBook = async (req, res) => {
  const hallBookData = req.body;
  const newBooking = new HallBooking(hallBookData);
  try {
    let result = await Hall.findById(hallBookData.hallID);
    result.bookings.push(newBooking);
    await result.save();
    res.json({
      Status: true,
    });
  } catch (error) {
    res.json({
      Status: false,
      Message: error.message,
    });
  }
};

export const hallRequestList = async (req, res) => {
  const { userID, type } = req.body;
  try {
    let docs = [];
    if (type === "owner") {
      docs = await Hall.aggregate([
        { $unwind: "$bookings" },
        {
          $match: {
            hallOwner: mongoose.Types.ObjectId(userID),
          },
        },
      ]);
    } else {
      docs = await Hall.aggregate([
        { $unwind: "$bookings" },
        {
          $match: {
            "bookings.userID": mongoose.Types.ObjectId(userID),
          },
        },
      ]);
    }
    res.json({
      Status: true,
      Data: docs,
    });
  } catch (error) {
    res.json({
      Status: false,
      Message: error.message,
    });
  }
};

export const hallRequestUpdate = async (req, res) => {
  const { _id, approvalStatus, hallStatus } = req.body;
  try {
    let doc = await Hall.findOne({ "bookings._id": _id });

    const updateQuery = doc.bookings.map((item) =>
      mongoose.Types.ObjectId(item._id).toString() ==
      mongoose.Types.ObjectId(_id).toString()
        ? {
            ...item.toObject(),
            approvalStatus: approvalStatus,
            hallStatus: hallStatus,
          }
        : item
    );

    await Hall.findOneAndUpdate(
      { "bookings._id": _id },
      { bookings: updateQuery }
    );

    res.json({ Status: true });
  } catch (error) {
    res.json({ Status: false, Message: error.message });
  }
};

export const hallBookedData = async (req, res) => {
  const { _id } = req.body;
  try {
    let docs = await Hall.aggregate([
      { $unwind: "$bookings" },
      {
        $match: {
          _id: mongoose.Types.ObjectId(_id),
        },
      },
    ]);

    res.json({ Status: true, Data: docs });
  } catch (error) {
    res.json({ Status: false, Message: error.message });
  }
};

export const hallRequestDelete = async (req, res) => {
  const { _id } = req.body;
  try {
    let doc = await Hall.findOne({ "bookings._id": _id });

    const updateQuery = doc.bookings.filter(
      (item) =>
        mongoose.Types.ObjectId(item._id).toString() !==
        mongoose.Types.ObjectId(_id).toString()
    );

    await Hall.findOneAndUpdate(
      { "bookings._id": _id },
      { bookings: updateQuery }
    );
    return res.json({
      Status: true,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
