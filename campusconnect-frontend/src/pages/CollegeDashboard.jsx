import React, { useState, useEffect, useMemo } from "react";
import api from "../services/api";

// Components
import Sidebar from "@/components/Sidebar";
import StudyResourceCard from "@/components/StudyResourceCard";
import ResourceUploadForm from "@/components/resources/ResourceUploadForm";
import ServicesExchange from "@/components/ServicesExchange";
import EventForm from "@/components/EventForm";
import EventCard from "@/components/EventCard";
import MentorMap from "@/components/MentorMap";
import InternshipHub from "@/components/InternshipHub";
import Leaderboard from "@/components/Leaderboard";
import RealTimeChat from "@/components/RealTimeChat";
import ChatBot from "@/components/ChatBot";
import PostCard from "@/components/PostCard";

const CollegeDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [activeTab, setActiveTab] = useState("feed");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [loading, setLoading] = useState(true);  // Loading state for fetching data

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);  // Start loading
        const [postRes, resRes, eventRes, mentorRes] = await Promise.all([
          api.get("/posts"),
          api.get("/resources"),
          api.get("/events"),
          api.get("/mentors"),
        ]);
        setPosts(postRes.data);
        setResources(resRes.data);
        setEvents(eventRes.data);
        setMentors(mentorRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);  // End loading
      }
    };

    fetchData();
  }, []);

  // Memoize filtered resources and events to prevent unnecessary recalculations
  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const matchesSearch =
        res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterType === "all" || res.resourceType === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [resources, searchQuery, filterType]);

  const currentDate = new Date();
  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const eventDate = new Date(event.date);
        if (eventFilter === "all") return true;
        return eventFilter === "upcoming" ? eventDate >= currentDate : eventDate < currentDate;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [events, eventFilter, sortOrder]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-950 text-white">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="flex-grow pt-28 px-4 sm:px-6 pb-24">
          <p className="text-center text-xl text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto max-w-7xl mx-auto pt-28 px-4 sm:px-6 pb-24 custom-scroll">
        {activeTab === "feed" && (
          <div className="space-y-10">
            <ServicesExchange />
            {posts.length > 0 ? (
              posts.map((post, index) => <PostCard key={index} {...post} />)
            ) : (
              <p className="text-gray-400">No posts available.</p>
            )}
          </div>
        )}

        {activeTab === "resources" && (
          <div className="space-y-6">
            <ResourceUploadForm
              handleAddResource={(newRes) => setResources([newRes, ...resources])}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Search by subject or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-2/3 px-4 py-2 rounded-md border bg-gray-900 text-white border-gray-700"
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full sm:w-1/3 px-4 py-2 rounded-md border bg-gray-900 text-white border-gray-700"
              >
                <option value="all">All Types</option>
                <option value="Notes">Notes</option>
                <option value="PDF">PDF</option>
                <option value="Video">Video</option>
                <option value="Cheatsheet">Cheatsheet</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredResources.length > 0 ? (
                filteredResources.map((res, index) => <StudyResourceCard key={index} {...res} />)
              ) : (
                <p className="text-gray-400">No matching resources found.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "clubs" && (
          <div className="space-y-6">
            <EventForm handleAddEvent={(newEvent) => setEvents([newEvent, ...events])} />
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-2 rounded-md border bg-gray-900 text-white border-gray-700"
              >
                <option value="all">All Events</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-2 rounded-md border bg-gray-900 text-white border-gray-700"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => <EventCard key={index} {...event} />)
              ) : (
                <p className="text-gray-400">No matching events found.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "mentorMap" && <MentorMap mentors={mentors} />}
        {activeTab === "internships" && <InternshipHub />}
        {activeTab === "leaderboard" && <Leaderboard />}
        {activeTab === "explore" && (
          <div className="space-y-6">
            <RealTimeChat />
            {chatbotOpen && <ChatBot />}
          </div>
        )}
      </div>

      {/* Chatbot Toggle Button */}
      {activeTab === "explore" && (
        <button
          onClick={() => setChatbotOpen(!chatbotOpen)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-xl transition duration-200"
        >
          {chatbotOpen ? "Close ChatBot" : "Open ChatBot"}
        </button>
      )}
    </div>
  );
};

export default CollegeDashboard;








