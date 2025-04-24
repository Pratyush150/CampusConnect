import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import sendEmail from "../utils/sendEmail.js";
import verificationTemplate from "../utils/emailTemplates/verificationEmail.js";
import passwordResetTemplate from "../utils/emailTemplates/passwordResetEmail.js";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

const generateToken = (payload, secret, expiresIn) => jwt.sign(payload, secret, { expiresIn });

// REGISTER
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, college } = req.body;
  const normalizedEmail = email.toLowerCase();

  const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = await prisma.user.create({
    data: {
      name,
      email: normalizedEmail,
      password: hashedPassword,
      college,
      role: "USER",
      isVerified: false,
    },
  });

  const verificationToken = generateToken({ userId: newUser.id }, process.env.JWT_SECRET, "15m");

  await prisma.user.update({
    where: { id: newUser.id },
    data: { verificationToken },
  });

  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
  
  // Ensure name is passed correctly to the email template
  await sendEmail({
    to: normalizedEmail,
    subject: "Verify your CampusConnect Account",
    html: verificationTemplate(newUser.name, verificationUrl), // Correctly passing name
    text: `Verify your email here: ${verificationUrl}`,
  });

  const { password: _, verificationToken: __, ...userSafe } = newUser;

  res.status(201).json({
    message: "Registration successful. Please check your email to verify.",
    user: userSafe,
  });
});

// VERIFY EMAIL
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.redirect(`${process.env.CLIENT_URL}/login?verified=already`);

    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true, verificationToken: null },
    });

    return res.redirect(`${process.env.CLIENT_URL}/login?verified=true`);
  } catch (error) {
    return res.status(500).json({ message: "Failed to verify email" });
  }
});

// LOGIN
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) return res.status(404).json({ message: "User not found" });
  if (!user.isVerified) return res.status(401).json({ message: "Please verify your email first." });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

  const accessToken = generateToken({ userId: user.id }, process.env.JWT_SECRET, "1h");
  const refreshToken = generateToken({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, "7d");

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry
  });

  const { password: _, refreshToken: __, verificationToken: ___, ...userSafe } = user;

  res.status(200).json({
    message: "Login successful",
    token: accessToken,
    expiresIn: 3600,
    user: userSafe,
  });
});

// REFRESH ACCESS TOKEN
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token provided" });

  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

  if (!user || user.refreshToken !== token)
    return res.status(403).json({ message: "Invalid refresh token" });

  const newAccessToken = generateToken({ userId: user.id }, process.env.JWT_SECRET, "1h");

  // Re-set the same refresh token to extend cookie expiry
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry
  });

  res.status(200).json({ token: newAccessToken, expiresIn: 3600 });
});

// LOGOUT
export const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(400).json({ message: "No refresh token provided" });

  const user = await prisma.user.findFirst({ where: { refreshToken: token } });
  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: null },
    });
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// RESEND VERIFICATION EMAIL
export const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = email.toLowerCase();

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.isVerified) return res.status(400).json({ message: "Email is already verified" });

  const verificationToken = generateToken({ userId: user.id }, process.env.JWT_SECRET, "15m");

  await prisma.user.update({
    where: { id: user.id },
    data: { verificationToken },
  });

  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

  await sendEmail({
    to: normalizedEmail,
    subject: "Resend Verification - CampusConnect",
    html: verificationTemplate(user.name, verificationUrl), // Correctly passing name
    text: `Verify your email here: ${verificationUrl}`,
  });

  res.status(200).json({ message: "Verification email resent successfully." });
});

// FORGOT PASSWORD
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = email.toLowerCase();

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const resetToken = generateToken({ userId: user.id }, process.env.JWT_SECRET, "15m");
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  await sendEmail({
    to: normalizedEmail,
    subject: "CampusConnect Password Reset",
    html: passwordResetTemplate(user.name, resetUrl),
    text: `Reset your password: ${resetUrl}`,
  });

  res.status(200).json({ message: "Password reset email sent" });
});

// RESET PASSWORD
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.query;
  const { newPassword } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);

  await prisma.user.update({
    where: { id: decoded.userId },
    data: { password: hashed },
  });

  res.status(200).json({ message: "Password reset successful" });
});
