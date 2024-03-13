import model from "../models/index.js";
import util from "../util/index.js";

export const createMessage = async (req, res) => {
  const { sender, receiver, body } = req.body;
  try {
    await model.Message.create({
      sender,
      receiver,
      body,
    });

    const msgPayload = await model.Message.find({
      sender,
      receiver,
    });

    const chatPayload = await model.Chat.findOneAndUpdate(
      {
        person1: sender,
        person2: receiver,
      },
      { messages: msgPayload },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(201).send({ data: chatPayload, success: true, message: "Message creation successful" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const getChatByUser = async (req, res) => {
  const { sender, receiver } = req.body;
  try {
    const chatPayload = await model.Chat.find({ person1: sender, person2: receiver });

    return res.status(200).send({ data: chatPayload, success: true, message: "Fetching messages successful" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const getMessagesByChatId = async (req, res) => {
  const { id } = req.params;
  try {
    const chatPayload = await model.Chat.findById({ _id: id });
    const msgPayload = [];

    if (chatPayload) {
      const msgIds = chatPayload.messages;

      await Promise.all(
        msgIds.map(async (msg_id) => {
          const msgObj = await model.Message.findById({ _id: msg_id });
          msgPayload.push(msgObj);
        })
      );

      return res.status(200).send({ data: msgPayload, success: true, message: "Fetching messages successful" });
    } else {
      return res.status(404).send({ success: false, message: "Could not fetch messages" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
