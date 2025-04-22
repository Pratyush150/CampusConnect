import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Middleware to protect routes
export const protect = async (req, res, next) => {
  let token;

  // 1. Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Get the token from the header
      
      // 2. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // 3. Optional: Check for token expiration (though JWT handles this too)
      if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        return res.status(401).json({ message: "Token expired" });
      }

      // 4. Attach user info to request (find user in DB)
      const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // 5. Attach the user to the request object
      req.user = user;
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      console.error("Token verification failed:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};


