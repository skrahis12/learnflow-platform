import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { toggleLike, toggleSubscribe, getMyInteractions } from "../controllers/interaction.controller.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post("/like", toggleLike);
router.post("/subscribe", toggleSubscribe);
router.get("/my-interactions", getMyInteractions);

export default router;
