import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const getOTP = async () => {
  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return otp;
};

export const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails

    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: title,
      html: body,
    });

    return info;
  } catch (error) {
    console.log(error.message);
  }
};
