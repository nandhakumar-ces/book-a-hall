import mongoose from "mongoose";

const HallBookingSchema = mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  userName: String,
  bookDate: {
    type: Date,
    default: new Date(),
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  hallStatus: {
    type: String,
    enum: ["Available", "Selected", "Booked"],
    default: "Available",
  },
  approvalStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

const HallSchema = mongoose.Schema({
  hallName: String,
  hallPrice: Number,
  halltype: String,
  capacity: Number,
  hallCategory: String,
  customCategory: String,
  hallOwner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  bookings: [HallBookingSchema],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const Hall = mongoose.model("Hall", HallSchema);
export const HallBooking = mongoose.model("Booking", HallBookingSchema);
