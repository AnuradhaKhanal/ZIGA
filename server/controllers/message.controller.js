import model from "../models/index.js";

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

    return res.status(201).send({ data: chatPayload, success: true, message: "Message sent" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const getApprovedUsers = async (req, res) => {
  const { user_id } = req.params;
  try {
    const requestPayload = await model.Request.find({
      $or: [
        { isApproved: true, createdBy: user_id },
        { isApproved: true, createdFor: user_id },
      ],
    }).sort({ createdAt: -1 });

    const userIds = new Set();

    requestPayload.map(async (req) => {
      if (req.createdBy !== user_id) {
        userIds.add(req.createdBy);
      } else if (req.createdFor !== user_id) {
        userIds.add(req.createdFor);
      }
    });

    const usersPayload = [];

    await Promise.all(
      Array.from(userIds).map(async (id) => {
        const userObj = await model.User.findById({ _id: id });
        usersPayload.push(userObj);
      })
    );
    return res.status(200).send({ data: usersPayload, success: true, message: "Loading your connections..." });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const getChatByUser = async (req, res) => {
  const { sender, receiver } = req.body;
  try {
    const chatPayload = await model.Chat.find({ person1: sender, person2: receiver });

    return res.status(200).send({ data: chatPayload, success: true, message: "Loading all messages..." });
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

      return res.status(200).send({ data: msgPayload, success: true, message: "Loading your messages" });
    } else {
      return res.status(404).send({ success: false, message: "Error loading chat" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const getMessagesBySenderAndReceiver = async (req, res) => {
  const { sender, receiver } = req.body;
  try {
    const msgPayload = await model.Message.find({
      $or: [
        { sender: sender, receiver: receiver },
        { receiver: sender, sender: receiver },
      ],
    })
      .sort({ createdAt: 1 })
      .limit(50);

    return res.status(200).send({ data: msgPayload, success: true, message: "Loading your messages" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
