import express from "express";
import controller from "../controllers/index.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/view", auth, controller.getChatByUser);
router.post("/add", auth, controller.createMessage);
router.get("/:id", auth, controller.getMessagesByChatId);

export default router;
