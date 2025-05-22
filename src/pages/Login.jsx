import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);

      // Call the parent component's setUser AFTER token is saved
      if (onLogin) onLogin();

      // Navigate with a short delay to allow React state to update
      setTimeout(() => {
        navigate("/");
      }, 100);
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    alert("Network error. Please try again later.");
    console.error(error);
  }
};


  const mainOrange = "#ff7a1a";

  return (
    <div
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          border: `1px solid ${mainOrange}`,
          borderRadius: 16,
          padding: "40px 30px",
          width: 350,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ color: mainOrange, marginBottom: 20 }}>Login</h2>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px 0",
            background: mainOrange,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: "1.1rem",
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 12,
          }}
        >
          Login
        </button>
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "0.9rem" }}>Don't have an account? </span>
          <Link
            to="/signup"
            style={{
              color: mainOrange,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
