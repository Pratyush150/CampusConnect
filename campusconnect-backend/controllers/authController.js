import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinaryConfig.js";
import sendEmail from "../utils/sendEmail.js";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

// Generate JWT Token
const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// REGISTER USER
export const registerUser = async (req, res) => {
  const { name, email, password, college } = req.body;
  const collegeIDFile = req.file;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    let uploadedImageUrl = null;
    if (collegeIDFile) {
      const result = await cloudinary.uploader.upload(collegeIDFile.path, {
        folder: "CampusConnect/collegeIds",
        public_id: `${Date.now()}_collegeId`,
      });
      uploadedImageUrl = result.secure_url;
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        college,
        collegeIdImage: uploadedImageUrl,
        role: "USER",
        isVerified: false,
      },
    });

    const verificationToken = generateToken({ userId: newUser.id }, "15m");

    await prisma.user.update({
      where: { id: newUser.id },
      data: { verificationToken },
    });

    const verificationUrl = `${process.env.SERVER_URL}/auth/verify/${verificationToken}`;
    const html = `
      <h2>Welcome to CampusConnect, ${name}!</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}" target="_blank">Verify Email</a>
      <p>This link will expire in 15 minutes.</p>
    `;

    await sendEmail({
      to: email,
      subject: "Verify your CampusConnect Account",
      html,
      text: `Verify your email here: ${verificationUrl}`,
    });

    const { password: _, verificationToken: __, ...userSafe } = newUser;

    res.status(201).json({
      message: "Registration successful. Please check your email to verify.",
      user: userSafe,
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// VERIFY EMAIL
export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified)
      return res.redirect(`${process.env.CLIENT_URL}/login?verified=already`);

    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true, verificationToken: null },
    });

    return res.redirect(`${process.env.CLIENT_URL}/login?verified=true`);
  } catch (err) {
    console.error("Verification Error:", err.message);
    return res.status(400).json({ message: "Invalid or expired verification link" });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.isVerified)
      return res.status(401).json({ message: "Please verify your email first." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const accessToken = generateToken({ userId: user.id }, "1h");
    const refreshToken = generateToken({ userId: user.id }, "7d");

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    const { password: _, refreshToken: __, verificationToken: ___, ...userSafe } = user;

    res.status(200).json({
      message: "Login successful",
      token: accessToken,
      refreshToken,
      user: userSafe,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
};

// REFRESH ACCESS TOKEN
export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token provided" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user || user.refreshToken !== refreshToken)
      return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = generateToken({ userId: user.id }, "1h");
    res.status(200).json({ token: newAccessToken });
  } catch (err) {
    console.error("Refresh Token Error:", err.message);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
