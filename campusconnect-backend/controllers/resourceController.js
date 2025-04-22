import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Upload new resource
export const uploadResource = async (req, res) => {
  const { title, description, fileUrl, subject } = req.body;
  const userId = req.user.id; // Extract user ID from the middleware

  // Input validation
  if (!title || !description || !fileUrl || !subject) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const resource = await prisma.resource.create({
      data: {
        title,
        description,
        fileUrl,
        subject,
        userId,
      },
    });

    res.status(201).json({ message: 'Resource uploaded successfully', resource });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading resource' });
  }
};

// Get all resources (latest first)
export const getResources = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;  // Pagination

  try {
    const resources = await prisma.resource.findMany({
      skip: (page - 1) * limit,  // Pagination logic
      take: parseInt(limit),     // Number of resources per page
      orderBy: { createdAt: 'desc' },
      include: { uploadedBy: true },
    });

    res.json({ resources });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching resources' });
  }
};
