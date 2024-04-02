import model from "../models/index.js";

export const getRequests = async (req, res) => {
  try {
    const requestPayload = await model.Request.find().sort({ createdAt: -1 });
    return res.status(200).send({ data: requestPayload, success: true, message: "Requests pending!" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const deleteRequest = async (req, res) => {
  const { id } = req.params;
  try {
    await model.Request.deleteOne({
      _id: id,
    });
    return res.status(201).send({ success: true, message: "Connection request deleted" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const sendRequest = async (req, res) => {
  const { emailBy, phoneBy, purpose, emailFor } = req.body;
  try {
    const userBy = await model.User.findOne({ email: emailBy, phone: phoneBy });
    const userFor = await model.User.findOne({ email: emailFor });
    if (!userBy) {
      return res.status(400).send({ success: false, message: "Session expired! Please login again" });
    }
    if (!userFor) {
      return res.status(400).send({ success: false, message: "User does not exist" });
    }
    const invalidRequest = await model.Request.findOne({
      createdBy: userBy._id,
      createdFor: userFor._id,
    });

    if (invalidRequest) {
      return res.status(400).send({ success: false, message: "Connection already sent" });
    }
    const requestPayload = await model.Request.create({
      createdBy: userBy._id,
      createdFor: userFor._id,
      purpose,
    });
    return res.status(201).send({ data: requestPayload, success: true, message: "Connection request sent" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
