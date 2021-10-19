import mongoose from "mongoose";

const HallSchema = mongoose.Schema({
  hallName: String,
  hallPrice: Number,
  halltype: String,
  capacity: Number,
  hallCategory: String,
  customCategory: String,
  hallOwner: String,
  status: {
    type: String,
    default: "Available",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Hall = mongoose.model("Hall", HallSchema);

export default Hall;
