import express from "express";
import controller from "../controllers/index.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/send", auth, controller.sendRequest);
router.get("/view", auth, controller.getRequests);
router.get("/users/all/:email", auth, controller.getUsers);
router.get("/users/:id", auth, controller.getUserById);
router.delete("/delete/:id", auth, controller.deleteRequest);

export default router;
