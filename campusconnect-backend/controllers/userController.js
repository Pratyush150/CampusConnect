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
    return res.status(400).json({ message: 'Password must be at least 6 characters long, and include uppercase, lowercase, digits, and special characters.' });
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
    res.status(500).json({ message: 'Server error during user registration' });
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
        role: true,
        profilePic: true,
        college: true,
      }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // If mentor, also fetch mentor fields
    let mentorProfile = null;
    if (user.role === UserRole.MENTOR) {
      mentorProfile = await prisma.mentor.findUnique({
        where: { userId },
        select: {
          bio: true,
          category: true,
          subcategory: true,
          linkedin: true,
          verified: true,
        },
      });
    }

    // Send response excluding mentorProfile if it's null
    const response = {
      user: {
        ...user,
        ...(mentorProfile && { mentorProfile }) // Only include mentorProfile if it's not null
      }
    };

    res.json(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};




// ---------------------------
// Update User Profile
// ---------------------------
export const updateUserProfile = async (req, res) => {
  const { name, college, avatar, bio, category, subcategory, linkedin } = req.body;

  if (!name || !college) {
    return res.status(400).json({ message: "Name and college are required" });
  }

  try {
    const userId = req.user.id;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        college,
        profilePic: avatar || undefined, // Handle avatar being null or undefined
      },
    });

    // Handle mentor profile only if user is MENTOR
    if (updatedUser.role === UserRole.MENTOR) {
      const existingMentor = await prisma.mentor.findUnique({ where: { userId } });

      if (existingMentor) {
        await prisma.mentor.update({
          where: { userId },
          data: {
            bio,
            category,
            subcategory,
            linkedin,
          },
        });
      } else {
        await prisma.mentor.create({
          data: {
            userId,
            bio,
            category,
            subcategory,
            linkedin,
          },
        });
      }
    }

    res.json({
      message: "Profile updated successfully",
      user: { ...updatedUser, password: undefined },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during profile update" });
  }
};
// Correct way to export named function
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Assuming you're using some ORM like mongoose or Prisma
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





