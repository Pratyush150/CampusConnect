import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Increased to 10 attempts for better UX while maintaining security
  message: {
    code: "TOO_MANY_REQUESTS",
    message: "Too many authentication attempts. Please try again in 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  },
  keyGenerator: (req) => {
    // Use IP + user agent for better rate limiting accuracy
    return `${req.ip}_${req.headers["user-agent"]}`;
  },
  skip: (req) => {
    // Skip rate limiting for verified users
    return req.user?.isVerified;
  }
});
