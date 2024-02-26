import express from "express";
import controller from "../controllers/index.js";

const router = express.Router();
router.post("/signin", controller.signin);
router.post("/signup", controller.signup);

export default router;
