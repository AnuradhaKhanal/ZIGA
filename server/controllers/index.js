import { getOTP, verifyOTP, signup } from "./user.controller.js";
import { createProfile, updateProfile } from "./profile.controller.js";
import { getMessage, createMessage } from "./message.controller.js";
export default {
  getOTP,
  verifyOTP,
  signup,
  createProfile,
  updateProfile,
  getMessage,
  createMessage,
};
