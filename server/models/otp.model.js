import mongoose from "mongoose";
import util from "../util/index.js";

const otpSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    trim: true,
    validate: (val) => util.validatePhoneNumber(val),
  },

  email: {
    type: String,
    required: true,
    trim: true,
    validate: (val) => util.validateEmail(val),
  },

  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // auto deletion after time expires
  },
});

// module to send email
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await util.mailSender(
      email,
      "Account Verification Email - Ziga for business",
      `<h1>Please confirm your account</h1>
       <p>Here is your OTP code: ${otp}</p>`
    );
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  // Only send an email when a new entry is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

export default mongoose.model("OTP", otpSchema);
