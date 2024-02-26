import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  id: { type: String },
  body: { type: String, required: true, trim: true },
  sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  readStatus: { type: Boolean, default: false },
  deliveryStatus: { type: Boolean, default: false },
  starMessage: { type: Boolean, default: false },
});

export default mongoose.model("Message", messageSchema);
