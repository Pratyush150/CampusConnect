import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const protect = async (req, res, next) => {
  let token;

  // 1. Get token from Authorization header or secure cookie
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  // 2. If no token found, reject request
  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Get user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 5. Ensure user is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: "Please verify your email first." });
    }

    // 6. Attach user to request and continue
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
