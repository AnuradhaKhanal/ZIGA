import { validatePhoneNumber, validateGender, validateEmail } from "./validation.js";
import { getOTP, mailSender } from "./otpService.js";

export default {
  validatePhoneNumber,
  validateGender,
  validateEmail,
  getOTP,
  mailSender,
};
