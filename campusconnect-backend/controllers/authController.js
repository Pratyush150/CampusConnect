import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import sendEmail from "../utils/sendEmail.js";
import verificationTemplate from "../utils/emailTemplates/verificationEmail.js";
import { generateOTP } from "../utils/otpUtils.js";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'fallback-refresh-secret-key';

// Helper to generate tokens
const generateToken = (payload, secret, expiresIn) => jwt.sign(payload, secret, { expiresIn });

// ==============================
// REGISTER USER
// ==============================
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, college, type } = req.body;

  if (!name || !email || !password || !type) {
    return res.status(400).json({ message: "Name, email, password, and type are required" });
  }

  const normalizedEmail = email.toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = await prisma.user.create({
    data: {
      name,
      email: normalizedEmail,
      password: hashedPassword,
      college,
      role: "USER",
      type, // STUDENT or MENTOR
      isVerified: false,
    },
  });

  const otp = generateOTP();

  await prisma.user.update({
    where: { id: newUser.id },
    data: {
      otp,
      otpExpiration: new Date(Date.now() + 10 * 60 * 1000), // 10 min expiry
    },
  });

  const otpUrl = `${process.env.CLIENT_URL}/verify-otp?otp=${otp}`;

  await sendEmail({
    to: normalizedEmail,
    subject: "Verify your CampusConnect Account with OTP",
    html: `<p>Your OTP for verification is: <strong>${otp}</strong></p>
           <p><a href="${otpUrl}">Verify OTP here</a></p>`,
    text: `Your OTP is: ${otp}. Verify at: ${otpUrl}`,
  });

  // Remove sensitive fields before sending user object
  const { password: _, otp: __, otpExpiration: ___, verificationToken: ____, refreshToken: _____, ...userSafe } = newUser;

  res.status(201).json({
    message: "Registration successful. Please check your email for OTP.",
    user: userSafe,
  });
});

// ==============================
// VERIFY OTP (POST for security)
// ==============================
export const verifyOTP = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      otp: otp,
      otpExpiration: { gte: new Date() },
    },
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired OTP." });

  await prisma.user.update({
    where: { id: user.id },
    data: { isVerified: true, otp: null, otpExpiration: null },
  });

  res.status(200).json({ message: "OTP Verified Successfully" });
});

// ==============================
// RESEND OTP
// ==============================
export const resendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = email.toLowerCase();

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generateOTP();
  await prisma.user.update({
    where: { id: user.id },
    data: { otp, otpExpiration: new Date(Date.now() + 10 * 60 * 1000) },
  });

  const otpUrl = `${process.env.CLIENT_URL}/verify-otp?otp=${otp}`;

  await sendEmail({
    to: normalizedEmail,
    subject: "New OTP for CampusConnect Account Verification",
    html: `<p>Your new OTP is: <strong>${otp}</strong></p><p><a href="${otpUrl}">Verify OTP here</a></p>`,
    text: `Your new OTP is: ${otp}. Verify your email here: ${otpUrl}`,
  });

  res.status(200).json({ message: "OTP resent successfully." });
});

// ==============================
// VERIFY EMAIL TOKEN (GET or POST with :token param)
// ==============================
export const verifyEmail = asyncHandler(async (req, res) => {
  // Accept token from params (for Express 5+ route: /verify-email/:token)
  const token = req.params.token || req.query.token;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
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

// ==============================
// LOGIN
// ==============================
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) return res.status(404).json({ message: "User not found" });
  if (!user.isVerified) return res.status(401).json({ message: "Please verify your email first." });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

  // Include user type in JWTs
  const accessToken = generateToken({ userId: user.id, type: user.type }, JWT_SECRET, "1h");
  const refreshToken = generateToken({ userId: user.id, type: user.type }, REFRESH_TOKEN_SECRET, "7d");

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Remove sensitive fields before sending user object
  const { password: _, verificationToken: __, otp: ___, otpExpiration: ____, refreshToken: _____, ...userSafe } = user;

  res.status(200).json({
    message: "Login successful",
    token: accessToken,
    refreshToken,
    expiresIn: 3600,
    user: userSafe,
  });
});

// ==============================
// REFRESH ACCESS TOKEN
// ==============================
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token provided" });

  const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
  const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

  if (!user || user.refreshToken !== token)
    return res.status(403).json({ message: "Invalid refresh token" });

  // Include user type in new access token
  const newAccessToken = generateToken({ userId: user.id, type: user.type }, JWT_SECRET, "1h");

  res.status(200).json({ token: newAccessToken, expiresIn: 3600 });
});

// ==============================
// LOGOUT
// ==============================
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

// ==============================
// RESEND VERIFICATION EMAIL
// ==============================
export const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = email.toLowerCase();

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.isVerified) return res.status(400).json({ message: "Email is already verified" });

  const verificationToken = generateToken({ userId: user.id }, JWT_SECRET, "15m");

  await prisma.user.update({
    where: { id: user.id },
    data: { verificationToken },
  });

  const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

  await sendEmail({
    to: normalizedEmail,
    subject: "Resend Verification - CampusConnect",
    html: verificationTemplate(user.name, verificationUrl),
  });

  res.status(200).json({ message: "Verification email resent successfully" });
});

// ==============================
// RESET PASSWORD HANDLER
// ==============================
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.query;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});


