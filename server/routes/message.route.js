import express from "express";
import controller from "../controllers/index.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/view", auth, controller.getChatByUser);
router.post("/messages", auth, controller.getMessagesBySenderAndReceiver);
router.post("/add", auth, controller.createMessage);
router.get("/:id", auth, controller.getMessagesByChatId);
router.get("/connections/:user_id", auth, controller.getApprovedUsers);

export default router;
