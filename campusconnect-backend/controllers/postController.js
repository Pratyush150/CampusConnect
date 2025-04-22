import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create Post Controller
export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;  // From the protect middleware

  // Validate title and content
  if (!title || title.length < 3) {
    return res.status(400).json({ message: 'Title is required and must be at least 3 characters' });
  }

  if (!content || content.length < 10) {
    return res.status(400).json({ message: 'Content is required and must be at least 10 characters' });
  }

  try {
    // Create the post
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId,  // Reference to the logged-in user
      },
    });

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Posts Controller
export const getAllPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;  // Default to page 1, 10 posts per page

  try {
    const posts = await prisma.post.findMany({
      skip: (page - 1) * limit,  // Pagination logic
      take: parseInt(limit),     // Number of posts to return
      orderBy: { createdAt: 'desc' },  // Optionally, order by creation date
    });

    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
