import jwt from "jsonwebtoken";
import { prisma } from '../prisma/prismaClient.js';
 // Singleton Prisma client

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
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId || typeof decoded.userId !== "string") {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // 3. Fetch user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, isVerified: true, role: true },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Protect middleware error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Refresh or log in." });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token signature" });
    }

    res.status(401).json({ message: "Authentication failed" });
  }
};

