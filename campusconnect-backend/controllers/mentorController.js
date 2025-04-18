// controllers/mentorController.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create Mentor Profile
export const createMentorProfile = async (req, res) => {
  const { bio, category, subcategory, linkedin, email } = req.body;

  if (!bio || !category || !subcategory) {
    return res.status(400).json({ message: "Bio, category, and subcategory are required" });
  }

  try {
    const newMentor = await prisma.mentor.create({
      data: {
        userId: req.user.id, // Use the user ID from the JWT middleware
        bio,
        category,
        subcategory,
        linkedin: linkedin || null, // Optional
        email: email || null,       // Optional
      },
    });

    return res.status(201).json(newMentor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating mentor profile" });
  }
};

// controllers/mentorController.js

// Get Mentors with filters
export const getMentors = async (req, res) => {
    const { category, subcategory } = req.query;
  
    try {
      let mentors;
  
      if (category && subcategory) {
        mentors = await prisma.mentor.findMany({
          where: {
            category: category,
            subcategory: subcategory,
          },
          include: {
            user: true, // Include user information like name, email, etc.
          },
          orderBy: {
            createdAt: "asc", // Sort by creation date
          },
        });
      } else if (category) {
        mentors = await prisma.mentor.findMany({
          where: {
            category: category,
          },
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        });
      } else {
        mentors = await prisma.mentor.findMany({
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        });
      }
  
      return res.status(200).json(mentors);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching mentors" });
    }
  };
  