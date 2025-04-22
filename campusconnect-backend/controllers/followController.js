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
    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId: targetUserId,
        },
      },
    });

    if (existingFollow) {
      return res.status(400).json({ message: "Already following this user." });
    }

    await prisma.follow.create({
      data: {
        followerId,
        followingId: targetUserId,
      },
    });

    res.status(200).json({ message: "Followed successfully!" });
  } catch (err) {
    console.error("Follow error:", err);
    res.status(500).json({ message: "Failed to follow user." });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  const { targetUserId } = req.body;
  const followerId = req.user.id;

  try {
    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId: targetUserId,
        },
      },
    });

    if (!follow) {
      return res.status(400).json({ message: "You are not following this user." });
    }

    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId: targetUserId,
        },
      },
    });

    res.status(200).json({ message: "Unfollowed successfully!" });
  } catch (err) {
    console.error("Unfollow error:", err);
    res.status(500).json({ message: "Failed to unfollow user." });
  }
};

// Get followers of a user
export const getFollowers = async (req, res) => {
  const { userId } = req.params;

  try {
    const followers = await prisma.follow.findMany({
      where: { followingId: parseInt(userId) },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePic: true,
          },
        },
      },
    });

    res.json(followers.map(f => f.follower));
  } catch (err) {
    console.error("Get followers error:", err);
    res.status(500).json({ message: "Failed to fetch followers." });
  }
};

// Get following of a user
export const getFollowing = async (req, res) => {
  const { userId } = req.params;

  try {
    const following = await prisma.follow.findMany({
      where: { followerId: parseInt(userId) },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePic: true,
          },
        },
      },
    });

    res.json(following.map(f => f.following));
  } catch (err) {
    console.error("Get following error:", err);
    res.status(500).json({ message: "Failed to fetch following list." });
  }
};
