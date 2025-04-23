import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const protect = async (req, res, next) => {
  let token;

  // 1. Check for token in the Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2. If not found, check in the secure HTTP-only cookie
  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    // 3. Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 5. Ensure the user is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: "Please verify your email first." });
    }

    // 6. Attach user to request for further use
    req.user = user;
    
    // 7. Handle token expiration or manipulation (using try/catch)
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }

    next();
  } catch (err) {
    console.error("Protect middleware error:", err.message);
    
    // 8. Token verification failure
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

