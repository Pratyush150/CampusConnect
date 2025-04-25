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

  // 2. If token not found in Authorization header, check in the secure HTTP-only cookie
  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  // 3. If no token is found, return unauthorized
  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    // 4. Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Check if the user exists in the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 6. Ensure the user is verified before proceeding
    if (!user.isVerified) {
      return res.status(401).json({ message: "Please verify your email first." });
    }

    // 7. Attach user data to the request object for use in subsequent handlers
    req.user = user;

    // 8. Check if the token has expired
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }

    // 9. Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error("Protect middleware error:", err.message);

    // 10. Return error if token verification fails
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
