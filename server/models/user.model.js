import mongoose from "mongoose";
import util from "../util/index.js";

const userSchema = mongoose.Schema({
  id: { type: String },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true, validate: (val) => util.validateGender(val) },
  phone: { type: String, required: true, unique: true, validate: (val) => util.validatePhoneNumber(val) },
  email: { type: String, required: true, unique: true, validate: (val) => util.validateEmail(val) },
  password: { type: String, required: true },
  confirmpassword: { type: String, required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "UserProfile" },
});

export default mongoose.model("User", userSchema);
