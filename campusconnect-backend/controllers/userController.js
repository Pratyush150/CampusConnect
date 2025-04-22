import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { validateEmail, validatePassword } from "../utils/validators.js";  // Corrected import path

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
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  try {
    // Check if the user already exists
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Return created user without password
    res.status(201).json({
      message: 'User created successfully',
      user: { ...user, password: undefined },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------------------------
// Login User Controller
// ---------------------------
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------------------------
// Get Logged-in User (Protected)
// ---------------------------
export const getMe = async (req, res) => {
  try {
    const user = req.user; // req.user is added by the protect middleware
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
    const { name, college, bio, avatar, interests } = req.body;
  
    try {
      const userId = req.user.id; // Extracted by middleware from JWT
  
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
        user: { ...updatedUser, password: undefined }, // exclude password
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
};

