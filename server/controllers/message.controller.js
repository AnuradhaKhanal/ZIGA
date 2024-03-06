import model from "../models/index.js";
import util from "../util/index.js";

export const createMessage = async (req, res) => {
  const { sender, receiver, body } = req.body;
  try {
    const msgPayload = await model.Message.create({
      sender,
      receiver,
      body,
    });
    return res.status(201).send({ data: msgPayload, success: true, message: "Message creation successful" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const getMessage = async (req, res) => {
  const { sender, receiver } = req.body;
  try {
    const msgPayload = await model.Message.findAll({ sender, receiver });
    return res.status(200).send({ data: msgPayload, success: true, message: "Fetching messages successful" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
