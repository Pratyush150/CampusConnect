const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await prisma.campusWall.findMany({
      orderBy: { created_at: "desc" },
    });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching campus wall posts" });
  }
});

// POST a new post
router.post("/", async (req, res) => {
  const { user, college, content } = req.body;
  try {
    const newPost = await prisma.campusWall.create({
      data: {
        user_name: user,
        college,
        content,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error adding new post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
});

module.exports = router;


