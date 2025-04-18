// controllers/followController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Follow a user
export const followUser = async (req, res) => {
  const { targetUserId } = req.body;
  const followerId = req.user.id;

  if (targetUserId === followerId) {
    return res.status(400).json({ message: "You can't follow yourself!" });
  }

  try {
    await prisma.follow.create({
      data: {
        followerId,
        followingId: targetUserId,
      },
    });
    res.json({ message: "Followed successfully!" });
  } catch (err) {
    res.status(400).json({ message: "Already following or invalid." });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  const { targetUserId } = req.body;
  const followerId = req.user.id;

  try {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId: targetUserId,
        },
      },
    });
    res.json({ message: "Unfollowed successfully!" });
  } catch (err) {
    res.status(400).json({ message: "Not following or invalid." });
  }
};

// Get followers of a user
export const getFollowers = async (req, res) => {
  const { userId } = req.params;
  const followers = await prisma.follow.findMany({
    where: { followingId: userId },
    include: { follower: true },
  });

  res.json(followers.map(f => f.follower));
};

// Get following of a user
export const getFollowing = async (req, res) => {
  const { userId } = req.params;
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    include: { following: true },
  });

  res.json(following.map(f => f.following));
};
