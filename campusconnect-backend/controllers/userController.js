import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { validateEmail, validatePassword } from "../utils/validators.js";

const prisma = new PrismaClient();

// ---------------------------
// Register User Controller
// ---------------------------
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate email and password
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters long, and include uppercase, lowercase, digits, and special characters.',
    });
  }

  try {
    // Check if user already exists
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: 'User created successfully',
      user: { ...user, password: undefined },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during user registration' });
  }
};

// ---------------------------
// Login User Controller
// ---------------------------
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// ---------------------------
// Get All Users (Temporary)
// ---------------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// ---------------------------
// Get Logged-in User (Protected)
// ---------------------------
export const getMe = async (req, res) => {
  try {
    const { password, otp, otpExpiration, ...userSafe } = req.user;
    res.json({ user: JSON.parse(JSON.stringify(userSafe)) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};

// ---------------------------
// Update User Profile
// ---------------------------
export const updateUserProfile = async (req, res) => {
  const { name, college, bio, avatar, interests } = req.body;

  if (!name || !college || !bio || !interests) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userId = req.user.id;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        college,
        bio,
        avatar,
        interests,
      },
    });

    res.json({
      message: 'Profile updated successfully',
      user: { ...updatedUser, password: undefined },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during profile update' });
  }
};



