import model from "../models/index.js";

export const getProfile = async (req, res) => {
  const { email, phone } = req.body;
  try {
    const user = await model.User.findOne({ email, phone });
    if (!user) {
      return res.status(400).send({ success: false, message: "Your session has timed out" });
    }

    const profilePayload = await model.Profile.findOne({ user: user._id });
    return res.status(200).send({ data: profilePayload, success: true, message: "Profile info loaded" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const createProfile = async (req, res) => {
  const { email, phone, isTechnical, introBody, ideaType, startingType, workArea } = req.body;
  try {
    const user = await model.User.findOne({ email, phone });
    if (!user) {
      return res.status(400).send({ success: false, message: "Your session has timed out" });
    }

    if (!isTechnical || !introBody || !ideaType || !startingType || workArea.length === 0) {
      return res.status(400).send({ success: false, message: "Please fill all the required fields" });
    }
    const profilePayload = await model.Profile.create({
      user: user._id,
      isTechnical,
      introBody,
      ideaType,
      startingType,
      workArea,
    });
    return res.status(201).send({ data: profilePayload, success: true, message: "Profile created successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { email, phone, isTechnical, introBody, ideaType, startingType, workArea } = req.body;
  try {
    const user = await model.User.findOne({ email, phone });
    if (!user) {
      return res.status(400).send({ success: false, message: "Your session has timed out" });
    }
    if (!isTechnical || !introBody || !ideaType || !startingType || workArea.length === 0) {
      return res.status(400).send({ success: false, message: "Please fill all the required fields" });
    }
    const profilePayload = await model.Profile.findOneAndUpdate(
      {
        user: user._id,
      },
      { isTechnical, introBody, ideaType, startingType, workArea },
      {
        new: true,
      }
    );
    return res.status(201).send({ data: profilePayload, success: true, message: "Profile updated successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
