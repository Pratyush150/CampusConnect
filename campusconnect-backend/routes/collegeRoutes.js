// routes/collegeRoutes.js
import express from 'express';
import { PrismaClient } from '@prisma/client'; // Import PrismaClient
const prisma = new PrismaClient(); // Initialize Prisma Client

const router = express.Router();

// Endpoint to fetch colleges within a given radius from user's geolocation
router.get('/colleges', async (req, res) => {
  const { latitude, longitude, radius = 100 } = req.query; // Default radius: 100 km

  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Latitude and Longitude are required' });
  }

  try {
    // Convert radius from km to meters for PostGIS query
    const radiusInMeters = radius * 1000;

    // Raw SQL query to find colleges within the specified radius
    const colleges = await prisma.$queryRaw`
      SELECT * 
      FROM "College"
      WHERE ST_DWithin(
        ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326), 
        "location"::geometry, 
        ${radiusInMeters}
      );
    `;

    // Return the filtered colleges
    res.status(200).json(colleges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching colleges' });
  }
});

export default router;

