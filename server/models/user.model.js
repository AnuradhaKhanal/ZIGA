import mongoose from "mongoose";
import util from "../util/index.js";

const userSchema = mongoose.Schema({
  id: { type: String },
  username: { type: String, required: true, trim: true },
  gender: { type: String, validate: (val) => util.validateGender(val) },
  phone: { type: String, trim: true, unique: true, validate: (val) => util.validatePhoneNumber(val) },
  email: { type: String, required: true, unique: true, trim: true, validate: (val) => util.validateEmail(val) },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
});

export default mongoose.model("User", userSchema);
