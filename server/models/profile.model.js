import mongoose from "mongoose";
import util from "../util/index.js";

const profileSchema = mongoose.Schema({
  id: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  isTechnical: { type: Boolean, required: true },
  introBody: { type: String, required: true, trim: true },
  ideaType: { type: String, required: true, validate: (val) => util.validateStartupType(val) },
  startingType: { type: String, required: true, validate: (val) => util.validateStartTime(val) },
  workArea: [{ type: Object, required: true }],
  location: { type: String },
  imageURL: { type: String },
});

export default mongoose.model("Profile", profileSchema);
