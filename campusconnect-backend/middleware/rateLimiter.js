import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 8, // limit each IP to 8 requests per windowMs
  message: {
    message: "Too many requests from this IP, please try again after 15 minutes.",
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,  // Disable `X-RateLimit-*` headers
});
