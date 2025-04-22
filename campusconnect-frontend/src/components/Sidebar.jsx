// src/components/Sidebar.jsx

import React from 'react';
import {
  Home,
  BookOpen,
  Users,
  Map,
  Briefcase,
  Trophy,
  School,
  User,
} from 'lucide-react';

// Tab items for the sidebar with their respective icons, ids, and labels
const tabItems = [
  { id: 'feed', icon: Home, label: 'Feed' },
  { id: 'resources', icon: BookOpen, label: 'Resources' },
  { id: 'clubs', icon: Users, label: 'Clubs & Events' },
  { id: 'mentorMap', icon: Map, label: 'Mentor Map' },
  { id: 'connections', icon: User, label: 'Connections' },
  { id: 'internships', icon: Briefcase, label: 'Internships' },
  { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
  { id: 'explore', icon: School, label: 'Explore' },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    // Sidebar container: Fixed position, with background, shadow, and dark mode support
    <div className="fixed left-0 top-0 bottom-0 w-16 bg-white dark:bg-gray-800 shadow-lg z-10 flex flex-col items-center py-6 overflow-hidden">
      <div className="flex flex-col space-y-4">
        {/* Map through tabItems to render each tab */}
        {tabItems.map((tab) => (
          <button
            key={tab.id} // Unique key for each tab
            onClick={() => setActiveTab(tab.id)} // Set active tab on click
            className={`group flex flex-col items-center justify-center px-2 py-1 rounded-lg transition duration-200 ${
              activeTab === tab.id
                ? 'text-blue-500 bg-gray-200 dark:bg-gray-700' // Active tab styling
                : 'text-gray-500 hover:text-blue-400 dark:text-gray-300 dark:hover:text-white' // Inactive tab styling
            }`}
            title={tab.label} // Tooltip on hover to show the tab label
          >
            {/* Render the respective icon from lucide-react */}
            <tab.icon className="w-6 h-6" />
            {/* Tab label below the icon */}
            <span className="text-[10px] mt-1 leading-none">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
