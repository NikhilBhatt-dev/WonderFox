import crypto from "crypto";
import mongoose from "mongoose";

import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import getUserCart from "../helpers/getUserCart.js";
import validateOrderItems from "../helpers/validateOrderItems.js";
import calculateOrderTotal from "../helpers/calculateOrderTotal.js";
import createOrderFromCart from "../helpers/createOrderFromCart.js";
import getPopulatedOrder from "../helpers/getPopulatedOrder.js";

/* ==========================================================
                        Private Helpers
========================================================== */

const generateReceipt = () => {
  return `rcpt_${crypto.randomBytes(8).toString("hex")}`;
};

const verifyRazorpaySignature = ({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  const body = `${razorpayOrderId}|${razorpayPaymentId}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  return expectedSignature === razorpaySignature;
};

/* ==========================================================
                    Create Razorpay Order
========================================================== */

export const createRazorpayOrder = async (userId) => {
  // Get User Cart
  const cart = await getUserCart(userId);

  // Validate Cart Items
  const validatedItems = await validateOrderItems(cart);

  // Calculate Total
  const orderItems = validatedItems.map(({ product, quantity }) => ({
    price: product.price,
    discountPrice: product.discountPrice,
    quantity,
  }));

  const { totalPrice } = calculateOrderTotal(orderItems);

  // Create Razorpay Order
  const razorpayOrder = await razorpay.orders.create({
    amount: totalPrice * 100, // Razorpay accepts amount in paise
    currency: "INR",
    receipt: generateReceipt(),
  });

  if (!razorpayOrder) {
    throw new ApiError(500, "Failed to create Razorpay order.");
  }

  return new ApiResponse(
    200,
    {
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    },
    "Razorpay order created successfully.",
  );
};



/* ==========================================================
                        Verify Payment
========================================================== */

export const verifyPayment = async (userId, data) => {
  const {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    shippingAddress,
  } = data;

  if (
    !razorpayOrderId ||
    !razorpayPaymentId ||
    !razorpaySignature
  ) {
    throw new ApiError(
      400,
      "Payment verification details are required."
    );
  }

  if (!shippingAddress) {
    throw new ApiError(
      400,
      "Shipping address is required."
    );
  }

  // Verify Razorpay Signature
  const isSignatureValid = verifyRazorpaySignature({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  });

 if (!isSignatureValid) {
   throw new ApiError(400, "Invalid payment signature.");
 }

 // Prevent duplicate payment processing
 const existingOrder = await Order.findOne({
   "paymentResult.razorpayPaymentId": razorpayPaymentId,
 });

 if (existingOrder) {
   throw new ApiError(409, "Payment has already been processed.");
 }

 const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const order = await createOrderFromCart({
      userId,
      shippingAddress,

      paymentMethod: "RAZORPAY",
      paymentStatus: "PAID",

      paymentResult: {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      },

      paidAt: new Date(),

      orderStatus: "CONFIRMED",

      session,
    });

    await session.commitTransaction();

    const populatedOrder = await getPopulatedOrder(Order.findById(order._id));

    return new ApiResponse(
      201,
      {
        order: populatedOrder,
      },
      "Payment verified and order placed successfully.",
    );
  } catch (error) {
    await session.abortTransaction();

    if (error.code === 11000) {
      throw new ApiError(409, "Payment has already been processed.");
    }

    throw error;
  } finally {
    session.endSession();
  }
};