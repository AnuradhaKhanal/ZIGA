import { getOTP, verifyOTP, signup, signin } from "./user.controller.js";
import { createProfile, updateProfile, getProfile } from "./profile.controller.js";
import { getChatByUser, createMessage, getMessagesByChatId } from "./message.controller.js";
import { createProject, updateProject, getProjects } from "./project.controller.js";

export default {
  getOTP,
  verifyOTP,
  signup,
  signin,
  createProfile,
  updateProfile,
  getProfile,
  getChatByUser,
  createMessage,
  getMessagesByChatId,
  createProject,
  updateProject,
  getProjects,
};
