// routes/followRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "../controllers/followController.js";

const router = express.Router();

router.post("/follow", protect, followUser);
router.post("/unfollow", protect, unfollowUser);
router.get("/:userId/followers", protect, getFollowers);
router.get("/:userId/following", protect, getFollowing);

export default router;

