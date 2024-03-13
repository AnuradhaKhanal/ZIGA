import express from "express";
import controller from "../controllers/index.js";
<<<<<<< HEAD
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/view", auth, controller.getChatByUser);
router.post("/add", auth, controller.createMessage);
router.get("/:id", auth, controller.getMessagesByChatId);
=======

const router = express.Router();
router.get("/view", controller.updateProfile);
router.post("/add", controller.createProfile);
>>>>>>> ef4a3a642d515d3a9a87e5253d74544f62d12eec

export default router;
