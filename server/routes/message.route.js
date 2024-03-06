import express from "express";
import controller from "../controllers/index.js";

const router = express.Router();
router.get("/view", controller.updateProfile);
router.post("/add", controller.createProfile);

export default router;
