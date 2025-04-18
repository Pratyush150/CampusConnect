import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";  // Main App component
import "./index.css"; // Your global styles
import { ThemeProvider } from "@/components/theme-provider"; // Dark mode provider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
