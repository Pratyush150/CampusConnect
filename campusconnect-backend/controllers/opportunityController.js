import { prisma } from "../prisma/prismaClient.js";

// ✅ Post an opportunity
export const postOpportunity = async (req, res) => {
  const { title, description, domain, type, link, userId } = req.body;

  if (!title || !description || !domain || !type || !userId) {
    return res.status(400).json({ message: "All fields except link are required." });
  }

  try {
    const newOpportunity = await prisma.opportunity.create({
      data: {
        title,
        description,
        domain,
        type,
        link: link || null,
        postedById: userId,
      },
    });

    res.status(201).json(newOpportunity);
  } catch (err) {
    console.error("Post Opportunity Error:", err);
    res.status(500).json({ message: "Failed to post opportunity." });
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
      include: {
        postedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePic: true,
          },
        },
      },
    });

    res.json(opportunities);
  } catch (err) {
    console.error("Get Opportunities Error:", err);
    res.status(500).json({ message: "Failed to fetch opportunities." });
  }
};

// ✅ Apply to an opportunity (with auto chat creation)
export const applyOpportunity = async (req, res) => {
  const { userId, opportunityId } = req.body;

  try {
    // Check if already applied
    const alreadyApplied = await prisma.opportunity.findFirst({
      where: {
        id: opportunityId,
        applicants: {
          some: { id: userId },
        },
      },
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this opportunity." });
    }

    // Add applicant
    await prisma.opportunity.update({
      where: { id: opportunityId },
      data: {
        applicants: {
          connect: { id: userId },
        },
      },
    });

    // Get poster ID
    const opportunity = await prisma.opportunity.findUnique({
      where: { id: opportunityId },
      include: { postedBy: true },
    });

    const providerId = opportunity.postedById;

    // Prevent user from messaging themselves
    if (userId !== providerId) {
      const existingConversation = await prisma.conversation.findFirst({
        where: {
          AND: [
            { participants: { some: { id: userId } } },
            { participants: { some: { id: providerId } } },
          ],
        },
      });

      if (!existingConversation) {
        await prisma.conversation.create({
          data: {
            participants: {
              connect: [{ id: userId }, { id: providerId }],
            },
          },
        });
      }
    }

    res.json({ message: "Applied successfully. Chat created if needed." });
  } catch (err) {
    console.error("Apply Error:", err);
    res.status(500).json({ message: "Failed to apply." });
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

    res.json({ message: alreadySaved ? "Opportunity unsaved." : "Opportunity saved." });
  } catch (err) {
    console.error("Toggle Save Error:", err);
    res.status(500).json({ message: "Failed to toggle save." });
  }
};

// ✅ Get Saved or Applied Opportunities
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
    console.error("Get User Opportunity Data Error:", err);
    res.status(500).json({ message: "Failed to fetch user opportunity data." });
  }
};
