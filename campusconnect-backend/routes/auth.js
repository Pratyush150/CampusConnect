import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import cloudinary from '../utils/cloudinaryConfig.js';
import upload from '../middleware/multerUpload.js';

const prisma = new PrismaClient();
const router = express.Router();

const SALT_ROUNDS = 10;
const TOKEN_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
};

// REGISTER
router.post('/register', upload.single('collegeIdImage'), async (req, res) => {
  const { email, password, name, college } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    let collegeIdImageUrl = null;
    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: 'CampusConnect/collegeIds',
        public_id: `${Date.now()}_collegeId`,
      });
      collegeIdImageUrl = uploadedImage.secure_url;
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        college,
        collegeIdImage: collegeIdImageUrl,
      },
    });

    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        college: user.college,
        collegeIdImage: user.collegeIdImage,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('❌ Register Error:', error.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    const token = generateToken(user.id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        college: user.college,
        collegeIdImage: user.collegeIdImage,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('❌ Login Error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;






