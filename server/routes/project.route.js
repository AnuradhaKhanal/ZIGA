import express from "express";
import controller from "../controllers/index.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/add", auth, controller.createProject);
router.post("/edit", auth, controller.updateProject);
router.get("/view", auth, controller.getProjects);

export default router;
