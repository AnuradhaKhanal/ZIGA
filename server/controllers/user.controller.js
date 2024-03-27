import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import model from "../models/index.js";
import util from "../util/index.js";

dotenv.config();
const secret = process.env.JWT_SECRET;

//sign in
export const signin = async (req, res) => {
  const { phone, email } = req.body;
  try {
    const userPayload = await model.User.findOne({
      phone,
      email,
    });

    if (userPayload) {
      const token = jwt.sign({ email: userPayload.email, phone: userPayload.phone, id: userPayload._id }, secret, {
        expiresIn: "2h",
      });
      const authPayload = {
        userPayload,
        token,
      };
      return res.status(200).send({ data: authPayload, success: true, message: "Login successful" });
    } else {
      return res.status(400).send({ success: false, message: "Login failed" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//sign up
export const signup = async (req, res) => {
  const { username, phone, gender, email } = req.body;
  try {
    const userPayload = await model.User.findOneAndUpdate(
      {
        phone,
        email,
      },
      {
        username,
        gender,
      },
      { new: true }
    );

    if (userPayload) {
      const token = jwt.sign({ email: userPayload.email, phone: userPayload.phone, id: userPayload._id }, secret, {
        expiresIn: "2h",
      });
      const authPayload = {
        userPayload,
        token,
      };
      return res.status(201).send({ data: authPayload, success: true, message: "Signup successful" });
    } else {
      return res.status(400).send({ success: false, message: "Signup failed" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// get OTP from phone number
export const getOTP = async (req, res) => {
  const { phone, email } = req.body;
  try {
    if (!phone) {
      return res.status(400).send({ success: false, message: "Please enter a phone number" });
    }
    if (!email) {
      return res.status(400).send({ success: false, message: "Please enter an email ID" });
    }

    const OTP = await util.getOTP();
    const otpPayload = await model.Otp.create({
      otp: OTP,
      phone,
      email,
    });

    return res.status(200).send({ data: otpPayload, success: true, message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error generating OTP" });
  }
};

// verify OTP from phone number
export const verifyOTP = async (req, res) => {
  const { phone, otp, email, isLogin } = req.body;
  try {
    const otpPayload = await model.Otp.find({ phone }).sort({ createdAt: -1 }).limit(1);
    if (otpPayload.length === 0 || otp !== otpPayload[0].otp) {
      return res.status(400).send({ success: false, message: "OTP is incorrect or has expired" });
    }

    const userWithSamePhone = await model.User.findOne({ phone });
    const userWithSameEmail = await model.User.findOne({ phone, email });

    // separate errors for register
    if (!isLogin) {
      if (userWithSamePhone) {
        return res.status(400).send({ success: false, message: "Phone number is already registered" });
      }
      if (userWithSameEmail) {
        return res.status(400).send({ success: false, message: "Email is already registered" });
      }
    }

    if (!userWithSamePhone && !userWithSameEmail) {
      const userPartialPayload = await model.User.create({
        username: "unauth_user",
        gender: "Male",
        phone,
        email,
      });
    }

    return res.status(200).send({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ success: false, message: "Error verifying OTP" });
  }
};
