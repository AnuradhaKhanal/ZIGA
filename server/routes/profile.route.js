import express from "express";
import controller from "../controllers/index.js";

const router = express.Router();
router.post("/add", controller.createProfile);
router.post("/edit", controller.updateProfile);

export default router;
