import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create Mentor Profile
export const createMentorProfile = async (req, res) => {
  const { bio, category, subcategory, linkedin, email } = req.body;
  const userId = req.user.id;

  // Basic validation
  if (!bio || !category || !subcategory) {
    return res.status(400).json({
      message: "Bio, category, and subcategory are required.",
    });
  }

  try {
    // Check if mentor profile already exists
    const existingMentor = await prisma.mentor.findUnique({
      where: { userId },
    });

    if (existingMentor) {
      return res.status(400).json({ message: "Mentor profile already exists." });
    }

    const newMentor = await prisma.mentor.create({
      data: {
        userId,
        bio,
        category,
        subcategory,
        linkedin: linkedin || null,
        email: email || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePic: true,
          },
        },
      },
    });

    return res.status(201).json(newMentor);
  } catch (error) {
    console.error("Mentor creation error:", error);
    return res.status(500).json({ message: "Error creating mentor profile." });
  }
};

// Get Mentors (Filtered or All)
export const getMentors = async (req, res) => {
  const { category, subcategory } = req.query;

  try {
    const filters = {};
    if (category) filters.category = category;
    if (subcategory) filters.subcategory = subcategory;

    const mentors = await prisma.mentor.findMany({
      where: filters,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePic: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(mentors);
  } catch (error) {
    console.error("Get mentors error:", error);
    return res.status(500).json({ message: "Error fetching mentors." });
  }
};
