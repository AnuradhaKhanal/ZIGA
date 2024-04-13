import model from "../models/index.js";

export const getProjects = async (req, res) => {
  const { user_id } = req.params;
  try {
    const projectPayload = await model.Project.find().sort({ likes: -1 });

    const pendingUsers = new Set();
    const approvedUsers = new Set();

    // Get users list mapping for connection status with current user
    const reqPending = await model.Request.find({
      $or: [
        { isRequestSent: true, isApproved: false, createdBy: user_id },
        { isRequestSent: true, isApproved: false, createdFor: user_id },
      ],
    });
    const reqApproved = await model.Request.find({
      $or: [
        { isApproved: true, createdBy: user_id },
        { isApproved: true, createdFor: user_id },
      ],
    });

    const currentUser = await model.User.findById({ _id: user_id });
    await Promise.all(
      reqApproved.map(async (request) => {
        const userObj1 = await model.User.findById({ _id: request.createdFor });
        const userObj2 = await model.User.findById({ _id: request.createdBy });
        if (currentUser.email !== userObj1.email) {
          approvedUsers.add(userObj1.email);
        }
        if (currentUser.email !== userObj2.email) {
          approvedUsers.add(userObj2.email);
        }
      })
    );

    await Promise.all(
      reqPending.map(async (request) => {
        const userObj1 = await model.User.findById({ _id: request.createdFor });
        const userObj2 = await model.User.findById({ _id: request.createdBy });
        if (currentUser.email !== userObj1.email) {
          pendingUsers.add(userObj1.email);
        }
        if (currentUser.email !== userObj2.email) {
          pendingUsers.add(userObj2.email);
        }
      })
    );

    return res.status(200).send({
      data: projectPayload,
      usersStatus: [Array.from(pendingUsers), Array.from(approvedUsers)],
      success: true,
      message: "Projects loaded successfully",
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  const { email, designation, summary, reason, price } = req.body;
  try {
    const user = await model.User.findOne({ email });
    if (!user) {
      return res.status(400).send({ success: false, message: "User does not exist" });
    }
    if (!designation || !summary || !reason || !price) {
      return res.status(400).send({ success: false, message: "Please fill all the required fields" });
    }
    const projectPayload = await model.Project.create({
      user: user._id,
      email,
      username: user.username,
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
  const { email, designation, summary, reason, price, likes } = req.body;
  try {
    const user = await model.User.findOne({ email });
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
