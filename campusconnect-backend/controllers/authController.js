import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinaryConfig.js";
import sendEmail from "../utils/sendEmail.js";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

// Utility function to generate JWT tokens
const generateToken = (userId, expiresIn = "1h") => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
};

// REGISTER USER
export const registerUser = async (req, res) => {
  const { name, email, password, college } = req.body;
  const collegeIDFile = req.file;

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Generate a verification token for the user
    const verificationToken = generateToken(email, "15m");

    // Handle college ID image upload
    let uploadedImageUrl = null;
    if (collegeIDFile) {
      const result = await cloudinary.uploader.upload(collegeIDFile.path, {
        folder: "CampusConnect/collegeIds",
        public_id: `${Date.now()}_collegeId`,
      });
      uploadedImageUrl = result.secure_url;
    }

    // Create new user record in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        college,
        collegeIdImage: uploadedImageUrl,
        role: "USER",
        isVerified: false,
        verificationToken,
      },
    });

    // Send email for verification
    await sendEmail(
      email,
      "Verify your CampusConnect account",
      `Click to verify: https://yourdomain.com/verify/${verificationToken}`
    );

    // Remove password from the response object
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: "User registered. Please verify your email.",
      user: userWithoutPassword,
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
    // Verify token and get the user's email
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.userId;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update user status to verified
    await prisma.user.update({
      where: { email },
      data: { isVerified: true, verificationToken: null },
    });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.isVerified)
      return res.status(401).json({ message: "Email not verified" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT tokens (access and refresh)
    const accessToken = generateToken(user.id, "1h");
    const refreshToken = generateToken(user.id, "7d");

    // Store the refresh token in the user's record
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    // Remove sensitive data (password, refreshToken)
    const { password: _, refreshToken: __, ...userWithoutSensitive } = user;

    res.status(200).json({
      message: "Login successful",
      token: accessToken,
      refreshToken,
      user: userWithoutSensitive,
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
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    // Check if the refresh token matches
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const newAccessToken = generateToken(user.id, "1h");
    res.status(200).json({ token: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};


