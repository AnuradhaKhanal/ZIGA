import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  id: { type: String },
  person1: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  person2: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  messages: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Message" }],
});

export default mongoose.model("Chat", chatSchema);
