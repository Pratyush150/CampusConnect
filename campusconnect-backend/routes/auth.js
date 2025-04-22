import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import cloudinary from '../utils/cloudinaryConfig.js'; // Cloudinary config
import upload from '../middleware/multerUpload.js'; // Multer upload middleware

const prisma = new PrismaClient();
const router = express.Router();

// Constants
const SALT_ROUNDS = 10;
const TOKEN_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
};

// ========== REGISTER ========== //
router.post('/register', upload.single('collegeIdImage'), async (req, res) => {
  const { email, password, name, college } = req.body;

  try {
    // 1. Check if user already exists
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 3. Upload college ID image to Cloudinary (if uploaded)
    let collegeIdImageUrl = null;
    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: 'CampusConnect/collegeIds',
        public_id: `${Date.now()}_collegeId`,
      });
      collegeIdImageUrl = uploadedImage.secure_url; // Cloudinary URL
    }

    // 4. Create user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        college,
        collegeIdImage: collegeIdImageUrl, // Save Cloudinary URL to DB
      },
    });

    // 5. Generate JWT token
    const token = generateToken(user.id);

    // 6. Return user data (without password) and token
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        college: user.college,
        collegeIdImage: user.collegeIdImage, // Include image URL if available
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// ========== LOGIN ========== //
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // 3. Generate JWT token
    const token = generateToken(user.id);

    // 4. Return token and user info (excluding password)
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        college: user.college,
        collegeIdImage: user.collegeIdImage, // Include image URL in response
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;






