import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const saltRounds = 10;

// @desc    Register new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  const { name, email, password, college } = req.body;
  const collegeIDFile = req.file; // multer handles this (optional)

  try {
    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Create new user in DB with optional college ID
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        college,
        collegeIDPath: collegeIDFile?.path || null,
      },
    });

    // 4. Remove password before sending response
    const { password: _, ...userWithoutPassword } = newUser;

    // 5. Return response
    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2. Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 3. Generate token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // 4. Exclude password
    const { password: _, ...userWithoutPassword } = user;

    // 5. Return token + user
    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
};

