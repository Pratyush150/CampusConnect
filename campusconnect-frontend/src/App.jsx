import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Required for routing
import Navbar from "./components/Navbar";
import CollegeDashboard from "./pages/CollegeDashboard";
import Signup from "./pages/Signup"; // Ensure correct import path for Signup

function App() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      <Router>
        <Navbar /> {/* Navbar is always shown */}
        <Routes>
          {/* Define different routes/screens */}
          <Route path="/" element={<CollegeDashboard />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

