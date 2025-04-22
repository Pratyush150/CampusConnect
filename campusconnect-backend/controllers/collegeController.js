import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Function to calculate the distance between two lat/lng points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515; // Distance in miles
  dist = dist * 1.609344; // Convert miles to kilometers
  return dist;
};

// Function to get nearby colleges
export const getNearbyColleges = async (req, res) => {
  const { latitude, longitude } = req.query;
  const maxDistance = 100; // Max distance in kilometers

  try {
    const colleges = await prisma.college.findMany();
    const nearbyColleges = colleges.filter(college => {
      const distance = calculateDistance(latitude, longitude, college.latitude, college.longitude);
      return distance <= maxDistance;
    });

    res.json(nearbyColleges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
