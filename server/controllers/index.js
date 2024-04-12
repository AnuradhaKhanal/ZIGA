import { getOTP, verifyOTP, signup, signin, getUsers, getUserById } from "./user.controller.js";
import { createProfile, updateProfile, getProfile } from "./profile.controller.js";
import {
  getChatByUser,
  createMessage,
  getMessagesByChatId,
  getApprovedUsers,
  getMessagesBySenderAndReceiver,
} from "./message.controller.js";
import { createProject, updateProject, getProjects } from "./project.controller.js";
import {
  sendRequest,
  getPendingRequests,
  getApprovedRequests,
  deleteRequest,
  deleteRequestbyReceiverEmail,
  approveRequest,
} from "./request.controller.js";

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
  getApprovedUsers,
  getMessagesBySenderAndReceiver,
  createProject,
  updateProject,
  getProjects,
  sendRequest,
  getPendingRequests,
  getApprovedRequests,
  deleteRequestbyReceiverEmail,
  approveRequest,
  getUsers,
  getUserById,
  deleteRequest,
};
