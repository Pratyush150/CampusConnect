import jwt from "jsonwebtoken";
import { prisma } from '../prisma/prismaClient.js';

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
      return res.status(401).json({ 
        code: "MISSING_TOKEN",
        message: "Authorization token required. Please log in." 
      });
    }

    // 2. Verify token and extract role/type
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded.userId || !decoded.type) {
      return res.status(401).json({
        code: "INVALID_TOKEN",
        message: "Invalid authentication token"
      });
    }

    // 3. Fetch user with role/type
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { 
        id: true,
        name: true,
        email: true,
        type: true,
        isVerified: true,
        profilePic: true
      },
    });

    if (!user) {
      return res.status(401).json({
        code: "USER_NOT_FOUND",
        message: "The user belonging to this token no longer exists"
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        code: "UNVERIFIED_EMAIL",
        message: "Please verify your email before accessing this resource"
      });
    }

    // 4. Attach user and role to request
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type, // STUDENT or MENTOR
      profilePic: user.profilePic
    };

    next();
  } catch (err) {
    console.error("🔒 Protect middleware error:", err.message);

    // Handle specific JWT errors
    const errorResponse = {
      "TokenExpiredError": {
        code: "TOKEN_EXPIRED",
        message: "Session expired. Please log in again."
      },
      "JsonWebTokenError": {
        code: "INVALID_TOKEN",
        message: "Invalid authentication token"
      },
      "NotBeforeError": {
        code: "TOKEN_INACTIVE",
        message: "Token not yet active"
      }
    }[err.name] || { 
      code: "AUTH_ERROR",
      message: "Authentication failed" 
    };

    res.status(401).json(errorResponse);
  }
};

