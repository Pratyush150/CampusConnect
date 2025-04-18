// controllers/opportunityController.js

import { prisma } from "../prisma/prismaClient.js";

// ✅ Post an opportunity
export const postOpportunity = async (req, res) => {
  const { title, description, domain, type, link, userId } = req.body;

  try {
    const newOpportunity = await prisma.opportunity.create({
      data: {
        title,
        description,
        domain,
        type,
        link,
        postedById: userId,
      },
    });

    res.status(201).json(newOpportunity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to post opportunity" });
  }
};

// ✅ Get all opportunities (with filters)
export const getOpportunities = async (req, res) => {
  const { domain, type } = req.query;

  try {
    const opportunities = await prisma.opportunity.findMany({
      where: {
        ...(domain && { domain }),
        ...(type && { type }),
      },
      orderBy: { createdAt: "desc" },
      include: { postedBy: true },
    });

    res.json(opportunities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch opportunities" });
  }
};

// ✅ Apply to an opportunity (with auto chat creation)
export const applyOpportunity = async (req, res) => {
  const { userId, opportunityId } = req.body;

  try {
    // Apply to the opportunity
    await prisma.opportunity.update({
      where: { id: opportunityId },
      data: {
        applicants: {
          connect: { id: userId },
        },
      },
    });

    // Get the opportunity details and poster info
    const opportunity = await prisma.opportunity.findUnique({
      where: { id: opportunityId },
      include: { postedBy: true },
    });

    const providerId = opportunity.postedById;

    // Check if conversation already exists between user and provider
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { id: userId } } },
          { participants: { some: { id: providerId } } },
        ],
      },
    });

    // If no conversation exists, create one
    if (!existingConversation) {
      await prisma.conversation.create({
        data: {
          participants: {
            connect: [{ id: userId }, { id: providerId }],
          },
        },
      });
    }

    res.json({ message: "Applied successfully and chat created (if not exists)" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to apply" });
  }
};

// ✅ Save/Unsave an opportunity
export const toggleSaveOpportunity = async (req, res) => {
  const { userId, opportunityId } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { savedOpportunities: true },
    });

    const alreadySaved = user.savedOpportunities.some(
      (op) => op.id === opportunityId
    );

    await prisma.opportunity.update({
      where: { id: opportunityId },
      data: {
        savedBy: {
          [alreadySaved ? "disconnect" : "connect"]: { id: userId },
        },
      },
    });

    res.json({ message: alreadySaved ? "Unsaved" : "Saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to toggle save" });
  }
};

// ✅ Get Saved or Applied Opportunities for a user
export const getUserOpportunityData = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        appliedOpportunities: true,
        savedOpportunities: true,
      },
    });

    res.json({
      applied: user.appliedOpportunities,
      saved: user.savedOpportunities,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get user opportunity data" });
  }
};
