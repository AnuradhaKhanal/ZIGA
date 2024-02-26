import mongoose from "mongoose";
import util from "../util/index.js";

const profileSchema = mongoose.Schema({
  id: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  location: { type: String },
  imageURL: { type: String },
});

export default mongoose.model("UserProfile", profileSchema);
