import model from "../models/index.js";
import util from "../util/index.js";

export const createProfile = async (req, res) => {
  const { user, isTechincal, introBody, ideaType, startingType, workArea, location } = req.body;
  try {
    const profilePayload = await model.Profile.create({
      user,
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
  const { user, isTechincal, introBody, ideaType, startingType, workArea, location } = req.body;
  try {
    const profilePayload = await model.Profile.findOneAndUpdate(
      {
        user,
      },
      { isTechincal, introBody, ideaType, startingType, workArea, location }
    );
    return res.status(201).send({ data: profilePayload, success: true, message: "Profile updation successful" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
