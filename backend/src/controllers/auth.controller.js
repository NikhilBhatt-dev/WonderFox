

import asyncHandler from "../utils/asyncHandler.js";

import * as authService from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  res.status(201).json(result);
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  res.status(200).json(result);
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    data: req.user,
  });
});

// =========================
// Forgot Password
// =========================

export const forgotPassword = asyncHandler(async (req, res) => {
  const result = await authService.forgotPassword(req.body.email);

  res.status(200).json(result);
});

// =========================
// Reset Password
// =========================

export const resetPassword = asyncHandler(async (req, res) => {
  const result = await authService.resetPassword(
    req.params.token,
    req.body.password,
  );

  res.status(200).json(result);
});