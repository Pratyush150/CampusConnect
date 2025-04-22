import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 🏆 Utility: Assign badges based on rank
const assignBadge = (rank) => {
  if (rank === 1) return "Gold";
  if (rank === 2) return "Silver";
  if (rank === 3) return "Bronze";
  return null;
};

// ✅ Get Top Contributors Leaderboard
export const getLeaderboard = async (req, res) => {
  const { collegeId } = req.query; // optional query param for college-wise leaderboard

  try {
    // 🔹 Fetch Top 5 Service Providers based on service count
    const topServiceProvidersRaw = await prisma.user.findMany({
      where: collegeId ? { collegeId } : {}, // filter by college if passed
      include: {
        services: true,
      },
    });

    // 🧠 Map service count and score
    const topServiceProviders = topServiceProvidersRaw
      .map((user) => ({
        ...user,
        serviceCount: user.services.length,
        score: user.services.length * 10, // Simple score logic (can be improved later)
      }))
      .sort((a, b) => b.serviceCount - a.serviceCount) // sort by service count
      .slice(0, 5) // top 5 only
      .map((user, idx) => ({
        id: user.id,
        name: user.name,
        serviceCount: user.serviceCount,
        score: user.score,
        badge: assignBadge(idx + 1),
      }));

    // 🔹 Fetch Top 5 Mentors (could be improved to track mentee count or feedback later)
    const topMentorsRaw = await prisma.mentor.findMany({
      where: collegeId ? { user: { collegeId } } : {},
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "asc", // oldest mentors first (can be changed later)
      },
      take: 5,
    });

    const topMentors = topMentorsRaw.map((mentor, idx) => ({
      id: mentor.user.id,
      name: mentor.user.name,
      expertise: mentor.expertise || [],
      createdAt: mentor.createdAt,
      badge: assignBadge(idx + 1),
    }));

    res.status(200).json({
      topServiceProviders,
      topMentors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load leaderboard" });
  }
};

