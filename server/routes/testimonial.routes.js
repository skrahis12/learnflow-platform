import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "../controllers/testimonial.controller.js";

const router = express.Router();

// Public route to get testimonials
router.get("/", getTestimonials);

// Protected routes
router.post("/", authenticate, createTestimonial);
router.put("/:id", authenticate, updateTestimonial);
router.delete("/:id", authenticate, deleteTestimonial);

export default router;
