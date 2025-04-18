import React, { useState } from "react";

// UI Components for Tabs
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Importing individual functional components
import StudyResourceCard from "@/components/StudyResourceCard";
import StudyResourceUpload from "@/components/StudyResourceUpload";
import ServicesExchange from "@/components/ServicesExchange";
import FollowSystem from "@/components/FollowSystem";
import ClubsEvents from "@/components/ClubsEvents";
import EventForm from "@/components/EventForm";
import EventCard from "@/components/EventCard"; 
import MentorMap from "../components/MentorMap"; // ✅ MentorMap component
import InternshipHub from "@/components/InternshipHub";
import ResourceUploadForm from '../components/resources/ResourceUploadForm';
import ProfilePage from '@/components/ProfilePage';
import Leaderboard from '../components/Leaderboard'; // Import Leaderboard component
import RealTimeChat from './components/RealTimeChat'; // Import RealTimeChat component

// Dummy PostCard component to simulate feed posts
const PostCard = ({ name, time, content, profile }) => (
  <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4">
    {/* Profile Image and Info */}
    <div className="flex items-center mb-2">
      <img
        src={profile}
        alt="Profile"
        className="w-10 h-10 rounded-full mr-3 object-cover"
      />
      <div>
        <h4 className="text-sm font-semibold text-gray-800 dark:text-white">{name}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
      </div>
    </div>
    {/* Post Content */}
    <p className="text-gray-700 dark:text-gray-300">{content}</p>
  </div>
);

const CollegeDashboard = () => {
  const [tab, setTab] = useState("feed"); // Track currently active tab

  // ---------------- STUDY RESOURCE VAULT ----------------
  const [resources, setResources] = useState([]); // All uploaded study resources
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [filterType, setFilterType] = useState("all"); // Resource filter (type)

  // Add new resource to state
  const handleAddResource = (newResource) => {
    setResources((prev) => [newResource, ...prev]);
  };

  // Filter resources based on search and type
  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || res.resourceType === filterType;
    return matchesSearch && matchesFilter;
  });

  // ---------------- CLUBS & EVENTS ----------------
  const [events, setEvents] = useState([]); // All events added
  const [eventFilter, setEventFilter] = useState("all"); // Filter events (upcoming, past, all)
  const [sortOrder, setSortOrder] = useState("newest"); // Sorting order

  // Add new event to the list
  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const currentDate = new Date(); // Get current date to filter events

  // Filter + Sort events
  const filteredEvents = events
    .filter((event) => {
      if (eventFilter === "all") return true;
      const eventDate = new Date(event.date);
      return eventFilter === "upcoming"
        ? eventDate >= currentDate
        : eventDate < currentDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="pt-20 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Main Tab system */}
      <Tabs defaultValue={tab} onValueChange={setTab} className="w-full">
        
        {/* Tab List shown at the top */}
        <TabsList className="flex flex-wrap justify-start gap-2 mb-6">
          <TabsTrigger value="feed">Student Feed</TabsTrigger>
          <TabsTrigger value="resources">Study Resource Vault</TabsTrigger>
          <TabsTrigger value="clubs">Clubs & Events</TabsTrigger>
          <TabsTrigger value="mentorMap">MentorMap</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="internships">Internships & Freelancing</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger> {/* Added Leaderboard tab */}
        </TabsList>

        {/* ---------- Feed Tab ---------- */}
        <TabsContent value="feed">
          <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-4">
            <ServicesExchange />
            <PostCard
              name="Aman Sharma"
              time="2 hours ago"
              content="Check out this new DSA playlist I found!"
              profile="https://randomuser.me/api/portraits/men/75.jpg"
            />
            <PostCard
              name="Riya Gupta"
              time="5 hours ago"
              content="Lost my ID card near the library. Please contact if found!"
              profile="https://randomuser.me/api/portraits/women/65.jpg"
            />
          </div>
        </TabsContent>

        {/* ---------- Study Resource Vault ---------- */}
        <TabsContent value="resources">
          {/* Conditionally render ResourceUploadForm only if this tab is active */}
          {tab === 'resources' && (
            <div className="p-4">
              <ResourceUploadForm handleAddResource={handleAddResource} />
            </div>
          )}

          {/* Search and Filter Inputs */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 mb-4">
            <input
              type="text"
              placeholder="Search by subject or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-2/3 px-4 py-2 rounded border dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full sm:w-1/3 px-4 py-2 rounded border dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="Notes">Notes</option>
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
              <option value="Cheatsheet">Cheatsheet</option>
            </select>
          </div>

          {/* Display matching resources */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredResources.length > 0 ? (
              filteredResources.map((res, index) => (
                <StudyResourceCard
                  key={index}
                  subject={res.subject}
                  description={res.description}
                  file={res.file}
                  resourceType={res.resourceType}
                />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 mt-4">
                No matching resources found.
              </p>
            )}
          </div>
        </TabsContent>

        {/* ---------- Clubs & Events ---------- */}
        <TabsContent value="clubs">
          <div className="flex flex-col gap-6">
            <EventForm handleAddEvent={handleAddEvent} />

            {/* Filter and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-2 rounded border dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <option value="all">All Events</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-2 rounded border dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* Event Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    title={event.title}
                    description={event.description}
                    date={event.date}
                    time={event.time}
                    category={event.category}
                    organizer={event.organizer}
                    location={event.location}
                  />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No events found for selected filter.
                </p>
              )}
            </div>
          </div>
        </TabsContent>

        {/* ---------- MentorMap Tab ---------- */}
        <TabsContent value="mentorMap">
          <MentorMap />
        </TabsContent>

        {/* ---------- Connections Tab ---------- */}
        <TabsContent value="connections">
          <FollowSystem />
          <RealTimeChat userId="currentUserId" receiverId="otherUserId" /> {/* Real-time chat added here */}
        </TabsContent>

        {/* ---------- Profile Tab ---------- */}
        <TabsContent value="profile">
          <ProfilePage /> {/* ProfilePage component integrated here */}
        </TabsContent>

        {/* ---------- Internships Tab ---------- */}
        <TabsContent value="internships">
          <InternshipHub /> 
        </TabsContent>

        {/* ---------- Leaderboard Tab ---------- */}
        <TabsContent value="leaderboard">
          <Leaderboard /> {/* Leaderboard component added here */}
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default CollegeDashboard;


