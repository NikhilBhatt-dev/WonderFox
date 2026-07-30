import { Router } from "express";

import verifyJWT from "../middlewares/auth.middleware.js";

import {
  createRazorpayOrderController,
  verifyPaymentController,
} from "../controllers/payment.controller.js";

const router = Router();

/**
 * Payment Routes
 */

router.post("/razorpay", verifyJWT, createRazorpayOrderController);

router.post("/verify-payment", verifyJWT, verifyPaymentController);

export default router;
