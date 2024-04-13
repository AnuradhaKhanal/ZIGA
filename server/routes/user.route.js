import express from "express";
import controller from "../controllers/index.js";

const router = express.Router();
router.post("/otp/get", controller.getOTP);
router.post("/otp/verify", controller.verifyOTP);
router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
router.post("/signin/google", controller.signinGoogle);

export default router;
