import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
  id: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  createdFor: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  purpose: { type: String, trim: true },
  isApproved: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Request", requestSchema);
