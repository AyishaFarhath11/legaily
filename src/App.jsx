import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home"; // Your current App.jsx renamed to Home.jsx
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {

  const [user, setUser] = useState(null);
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setUser({}); // Simulate a logged-in user
  } else {
    setUser(null);
  }
}, []);
  return (
    
    <Router>
      
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login onLogin={() => setUser({})} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route */}
        <Route
          path="/*"
          element={
            user ? <Home /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}
