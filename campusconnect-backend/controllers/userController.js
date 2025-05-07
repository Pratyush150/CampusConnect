import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { validateEmail, validatePassword } from "../utils/validators.js";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

// ---------------------------
// Register User Controller
// ---------------------------
export const registerUser = async (req, res) => {
  const { name, email, password, type, college, linkedin } = req.body;

  // Validate required fields
  if (!name || !email || !password || !type) {
    return res.status(400).json({ message: 'Name, email, password, and type are required' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long, and include uppercase, lowercase, digits, and special characters.' });
  }
  if (type === "STUDENT" && !college) {
    return res.status(400).json({ message: "College is required for students" });
  }
  if (type === "MENTOR" && !linkedin) {
    return res.status(400).json({ message: "LinkedIn is required for mentors" });
  }

  try {
    // Check if the user already exists
    const normalizedEmail = email.toLowerCase();
    const userExists = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        type, // "STUDENT" or "MENTOR"
        college: type === "STUDENT" ? college : null,
        linkedin: type === "MENTOR" ? linkedin : null,
      },
    });

    // Return created user without password
    const { password: _, ...userSafe } = user;
    res.status(201).json({
      message: 'User created successfully',
      user: userSafe,
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
    const normalizedEmail = email.toLowerCase();
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

    // Generate JWT token including user type
    const token = jwt.sign(
      { userId: user.id, type: user.type },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    const { password: _, ...userSafe } = user;
    res.json({
      message: 'Login successful',
      token,
      user: userSafe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// ---------------------------
// Get Logged-in User (Protected)
// ---------------------------
export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
        profilePic: true,
        college: true,
        linkedin: true,
        bio: true,
        interests: true,
        services: true,
        expertise: true,
        availability: true,
      }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};

// ---------------------------
// Update User Profile
// ---------------------------
export const updateUserProfile = async (req, res) => {
  const { name, college, profilePic, bio, interests, services, expertise, availability, linkedin } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const userId = req.user.id;

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        college,
        profilePic,
        bio,
        interests,
        services,
        expertise,
        availability,
        linkedin,
      },
    });

    const { password: _, ...userSafe } = updatedUser;
    res.json({
      message: "Profile updated successfully",
      user: userSafe,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during profile update" });
  }
};

// ---------------------------
// Get All Users (Admin/Debug)
// ---------------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
        college: true,
        linkedin: true,
        profilePic: true,
      }
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





