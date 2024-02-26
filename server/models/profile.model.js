import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  id: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  isTechincal: { type: Boolean, required: true },
  introBody: { type: String, required: true, trim: true },
  ideaType: { type: String, required: true },
  startingType: { type: String, required: true },
  workArea: { type: String, required: true },
  location: { type: String, required: true },
  imageURL: { type: String },
});

export default mongoose.model("Profile", profileSchema);
