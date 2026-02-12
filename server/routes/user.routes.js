import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  becomeInstructor,
  updatePassword,
  updateSettings,
  getPublicStats
} from "../controllers/user.controller.js";

const router = express.Router();

// ✅ Become Instructor Route
router.patch(
  "/become-instructor",
  authenticate,
  becomeInstructor
);

// ✅ Update Password Route
router.put(
  "/password",
  authenticate,
  updatePassword
);

// ✅ Update Settings Route
router.put(
  "/settings",
  authenticate,
  updateSettings
);

// ✅ Public Stats Route
router.get("/public-stats", getPublicStats);

export default router;
