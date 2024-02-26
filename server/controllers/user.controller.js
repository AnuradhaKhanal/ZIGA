import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import model from "../models/index.js";

const secret = "test";

//sign in
export const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const oldUser = await model.User.findOne({ username });
    if (!oldUser) return res.status(404).send({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, secret, {
      expiresIn: "2h",
    });
    res.status(200).send({ result: oldUser, token });
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

//sign up
export const signup = async (req, res) => {
  const { username, email, name, password, confirmpassword } = req.body;
  try {
    const oldUser = await model.User.findOne({ username });
    const oldUserEmail = await User.findOne({ email });
    if (password !== confirmpassword) {
      return res.status(400).send({ message: "Passwords don't match" });
    } else if (oldUser) {
      return res.status(400).send({ message: "User already exists" });
    } else if (oldUserEmail) {
      return res.status(400).send({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await model.User.create({
      username,
      email,
      name,
      password: hashedPassword,
      confirmpassword: hashedPassword,
    });
    const token = jwt.sign({ username: result.username, id: result._id }, secret, {
      expiresIn: "2h",
    });
    res.status(201).send({ result, token });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
