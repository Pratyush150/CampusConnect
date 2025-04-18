import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Upload new resource
export const uploadResource = async (req, res) => {
  const { title, description, fileUrl, subject } = req.body;
  const userId = req.user.id;

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
  try {
    const resources = await prisma.resource.findMany({
      orderBy: { createdAt: 'desc' },
      include: { uploadedBy: true },
    });

    res.json({ resources });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching resources' });
  }
};
