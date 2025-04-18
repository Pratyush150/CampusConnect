import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create a new post
export const createPost = async (req, res) => {
  const { content, image } = req.body;
  const userId = req.user.id; // comes from protect middleware

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        image,
        userId,
      },
    });

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating post' });
  }
};

// Get all posts (latest first)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });
    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching posts' });
  }
};
