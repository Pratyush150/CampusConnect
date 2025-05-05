import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Get token from header or cookie
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({ message: "Access token missing" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // 3. Fetch minimal user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
        role: true,
        profilePic: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Protect middleware error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please refresh or log in again." });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};

