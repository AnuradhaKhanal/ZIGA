import {
  validatePhoneNumber,
  validateGender,
  validateEmail,
  validateStartTime,
  validateStartupType,
  validateWorkarea,
} from "./validation.js";
import { getOTP, mailSender } from "./otpService.js";

export default {
  validatePhoneNumber,
  validateGender,
  validateEmail,
  validateStartTime,
  validateStartupType,
  validateWorkarea,
  getOTP,
  mailSender,
};
