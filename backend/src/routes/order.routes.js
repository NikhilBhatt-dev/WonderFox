import express from "express";

import {
  placeCodOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  getOrderByIdForAdmin,
  updateOrderStatus,
} from "../controllers/order.controller.js";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

/* ---------------------------- Admin Routes --------------------------- */

router.get(
  "/admin",
  protect,
  authorize("ADMIN"),
  getAllOrders
);

router.get(
  "/admin/:id",
  protect,
  authorize("ADMIN"),
  getOrderByIdForAdmin
);

router.patch(
  "/admin/:id/status",
  protect,
  authorize("ADMIN"),
  updateOrderStatus
);

/* -------------------------- Customer Routes -------------------------- */

router.post("/", protect, placeCodOrder);

router.get("/", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

router.patch("/:id/cancel", protect, cancelOrder);

export default router;