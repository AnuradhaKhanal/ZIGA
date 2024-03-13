import express from "express";
import controller from "../controllers/index.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/add", controller.createProfile);
router.post("/edit", auth, controller.updateProfile);
router.post("/view", auth, controller.getProfile);

export default router;
