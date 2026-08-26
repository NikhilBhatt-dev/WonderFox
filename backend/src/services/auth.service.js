import crypto from "crypto";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import ApiError from "../utils/ApiError.js";

import {
  createSmtpTransport,
  getSmtpFromEmail,
} from "./newsletter.service.js";

export const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  return {
    success: true,
    message: "Registration successful",
    data: {
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  return {
    success: true,
    message: "Login successful",
    data: {
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  };
};

// =========================
// Forgot Password
// =========================

export const forgotPassword = async (email) => {
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (!normalizedEmail) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({
    email: normalizedEmail,
    role: "admin",
    isActive: true,
  }).select("+resetPasswordToken +resetPasswordExpire");

  /*
   * Do not reveal whether an admin email exists.
   * This prevents account/email enumeration.
   */
  if (!user) {
    return {
      success: true,
      message: "If the email is registered, a password reset link has been sent.",
    };
  }

  // Generate raw token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Store only hashed token in database
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Token valid for 15 minutes
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  const adminUrl =
    process.env.ADMIN_URL || "http://localhost:5173";

  const resetUrl =
    `${adminUrl}/reset-password/${resetToken}`;

  const transporter = createSmtpTransport();

  if (!transporter) {
    // Remove token if email configuration is unavailable
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    throw new ApiError(
      500,
      "Email service is not configured",
    );
  }

  try {
    await transporter.sendMail({
      from: getSmtpFromEmail(),
      to: user.email,
      subject: "WonderFox Admin Password Reset",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #1f2937; max-width: 600px; margin: auto;">

          <h2 style="color: #ff7a45;">
            WonderFox Admin Password Reset
          </h2>

          <p>
            We received a request to reset your admin password.
          </p>

          <p>
            Click the button below to create a new password.
          </p>

          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background: #ff7a45;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
            "
          >
            Reset Password
          </a>

          <p style="margin-top: 20px;">
            This link will expire in <strong>15 minutes</strong>.
          </p>

          <p>
            If you did not request this password reset, you can safely ignore this email.
          </p>

        </div>
      `,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    throw new ApiError(
      500,
      "Unable to send password reset email",
    );
  }

  return {
    success: true,
    message: "If the email is registered, a password reset link has been sent.",
  };
};

// =========================
// Reset Password
// =========================

export const resetPassword = async (token, password) => {
  if (!token) {
    throw new ApiError(400, "Reset token is required");
  }

  if (!password || password.length < 6) {
    throw new ApiError(
      400,
      "Password must be at least 6 characters",
    );
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
    role: "admin",
    isActive: true,
  }).select("+resetPasswordToken +resetPasswordExpire");

  if (!user) {
    throw new ApiError(
      400,
      "Invalid or expired password reset link",
    );
  }

  user.password = password;

  // Invalidate token after successful reset
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // User schema's pre-save middleware will bcrypt-hash password
  await user.save();

  return {
    success: true,
    message: "Password reset successful",
  };
};