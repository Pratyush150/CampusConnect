import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create Event Controller
export const createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;

  // Validate required fields
  if (!title || !description || !date || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create new event
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),  // Ensure date is in Date format
        location,
        userId: req.user.id,  // Using user ID from the protect middleware
      },
    });

    return res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating event" });
  }
};

// Get Events Controller (with filters)
export const getEvents = async (req, res) => {
  const { filter } = req.query; // "upcoming" or "past"

  try {
    let events;

    // Get events based on filter
    if (filter === "upcoming") {
      events = await prisma.event.findMany({
        where: {
          date: {
            gte: new Date(),  // Get upcoming events (date >= current date)
          },
        },
        orderBy: {
          date: "asc",  // Order by date ascending
        },
      });
    } else if (filter === "past") {
      events = await prisma.event.findMany({
        where: {
          date: {
            lt: new Date(),  // Get past events (date < current date)
          },
        },
        orderBy: {
          date: "desc",  // Order by date descending
        },
      });
    } else {
      events = await prisma.event.findMany({
        orderBy: {
          date: "asc",  // Order by date ascending for all events
        },
      });
    }

    return res.status(200).json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching events" });
  }
};

// Update Event Controller
export const updateEvent = async (req, res) => {
  const { id } = req.params;  // Event ID from URL
  const { title, description, date, location } = req.body;  // New event data

  try {
    // Find the event by ID
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
    });

    // Check if event exists
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the logged-in user is the creator of the event
    if (event.userId !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to update this event" });
    }

    // Update the event with new data
    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        title: title || event.title,  // Use old value if new value isn't provided
        description: description || event.description,
        date: date ? new Date(date) : event.date,  // Update date if provided
        location: location || event.location,
      },
    });

    return res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating event" });
  }
};

// Delete Event Controller
export const deleteEvent = async (req, res) => {
  const { id } = req.params;  // Event ID from URL

  try {
    // Find the event by ID
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
    });

    // Check if event exists
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the logged-in user is the creator of the event
    if (event.userId !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this event" });
    }

    // Delete the event
    await prisma.event.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting event" });
  }
};

