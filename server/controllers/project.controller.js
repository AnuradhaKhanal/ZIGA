import model from "../models/index.js";

export const getProjects = async (req, res) => {
  try {
    const projectPayload = await model.Project.find().sort({ likes: -1 });
    return res.status(200).send({ data: projectPayload, success: true, message: "Projects fetched successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  const { email, phone, designation, summary, reason, price } = req.body;
  try {
    const user = await model.User.findOne({ email, phone });
    if (!user) {
      return res.status(400).send({ success: false, message: "User does not exist" });
    }
    const projectPayload = await model.Project.create({
      user: user._id,
      designation,
      summary,
      reason,
      price,
    });
    return res.status(201).send({ data: projectPayload, success: true, message: "Project creation successful" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { email, phone, designation, summary, reason, price, likes } = req.body;
  try {
    const user = await model.User.findOne({ email, phone });
    if (!user) {
      return res.status(400).send({ success: false, message: "User does not exist" });
    }
    const projectPayload = await model.Project.findOneAndUpdate(
      {
        user: user._id,
      },
      { designation, summary, reason, price, likes },
      {
        new: true,
      }
    );
    return res.status(201).send({ data: projectPayload, success: true, message: "Project updation successful" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
