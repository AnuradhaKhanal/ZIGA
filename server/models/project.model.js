import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  id: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  designation: { type: String, required: true, trim: true },
  summary: { type: String, required: true, trim: true },
  reason: { type: String, required: true, trim: true },
  createdAt: { type: String, default: Date.now },
  price: { type: String, required: true },
  likes: { type: String, default: "0" },
});

export default mongoose.model("Project", projectSchema);
