import model from "../models/index.js";

export const getProfile = async (req, res) => {
  const { email, phone } = req.body;
  try {
    const user = await model.User.findOne({ email, phone });
    if (!user) {
      return res.status(400).send({ success: false, message: "User does not exist" });
    }

    const profilePayload = await model.Profile.findOne({ user: user._id });
    return res.status(200).send({ data: profilePayload, success: true, message: "Profile fetch successful" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const createProfile = async (req, res) => {
  const { email, phone, isTechincal, introBody, ideaType, startingType, workArea, location } = req.body;
  try {
    const user = await model.User.findOne({ email, phone });
    if (!user) {
      return res.status(400).send({ success: false, message: "User does not exist" });
    }
    const profilePayload = await model.Profile.create({
      user: user._id,
      isTechincal,
      introBody,
      ideaType,
      startingType,
      workArea,
      location,
    });
    return res.status(201).send({ data: profilePayload, success: true, message: "Profile creation successful" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { email, phone, isTechincal, introBody, ideaType, startingType, workArea, location } = req.body;
  try {
    const user = await model.User.findOne({ email, phone });
    if (!user) {
      return res.status(400).send({ success: false, message: "User does not exist" });
    }
    const profilePayload = await model.Profile.findOneAndUpdate(
      {
        user: user._id,
      },
      { isTechincal, introBody, ideaType, startingType, workArea, location },
      {
        new: true,
      }
    );
    return res.status(201).send({ data: profilePayload, success: true, message: "Profile updation successful" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
