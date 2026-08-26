import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

// Password reset
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.get("/me", protect, getMe);

export default router;