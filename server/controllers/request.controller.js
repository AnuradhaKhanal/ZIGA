import model from "../models/index.js";

export const getApprovedRequests = async (req, res) => {
  const { user_id } = req.params;
  try {
    const requestPayload = await model.Request.find({
      $or: [
        { isApproved: true, createdBy: user_id },
        { isApproved: true, createdFor: user_id },
      ],
    }).sort({ createdAt: -1 });

    return res.status(200).send({ data: requestPayload, success: true, message: "Loading your connections..." });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const getPendingRequests = async (req, res) => {
  const { user_id } = req.params;
  try {
    const requestPayload = await model.Request.find({ isApproved: false, createdFor: user_id }).sort({ createdAt: -1 });
    return res.status(200).send({ data: requestPayload, success: true, message: "Loading pending requests..." });
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

export const approveRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRequest = await model.Request.findOneAndUpdate(
      {
        _id: id,
      },
      {
        isApproved: true,
      },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(400).send({ success: false, message: "Failed to approve request" });
    }

    return res.status(201).send({ data: updatedRequest, success: true, message: "Connection request approved" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
