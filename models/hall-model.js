/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

const HallSchema = mongoose.Schema({
  hallName: String,
  hallPrice: Number,
  halltype: String,
  capacity: Number,
  hallCategory: String,
  customCategory: String,
  // hallOwner: String,
  hallOwner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  status: {
    type: String,
    enum: ["Available", "Selected", "Booked"],
    default: "Available",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const HallBookingSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  hallID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hall" }],
  requestedDate: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
    enum: ["Approved", "Rejected"],
    default: "Approved",
  },
});

const Hall = mongoose.model("Hall", HallSchema);
const HallBooking = mongoose.model("Booking", HallBookingSchema);

export default Hall;
