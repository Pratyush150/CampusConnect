// controllers/leaderboardController.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get Top Contributors Leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    // Get users with most service listings
    const topServiceProviders = await prisma.user.findMany({
      take: 5,
      orderBy: {
        services: {
          _count: "desc",
        },
      },
      include: {
        services: true,
      },
    });

    // Get users with mentor profiles (top 5)
    const topMentors = await prisma.mentor.findMany({
      take: 5,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json({
      topServiceProviders,
      topMentors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load leaderboard" });
  }
};
