import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 🔥 Add this line below your index.css
import "./index.css";
import "@joint/plus/joint-plus.css"; // ✅ Critical fix: forces Vite to include the CSS

// Initialize theme from localStorage
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
};

// Call the function before rendering
initializeTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
