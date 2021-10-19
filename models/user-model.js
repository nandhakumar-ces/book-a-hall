import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileNumber: Number,
  eMail: String,
  password: String,
  gender: String,
  dateOfBirth: Date,
  age: Number,
  userType: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("user", UserSchema);

export default User;
