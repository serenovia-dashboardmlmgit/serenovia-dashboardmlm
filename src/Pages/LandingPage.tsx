// src/Pages/LandingPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Axios helper we created
import "./LandingPage.css";
import logo from "../assets/Serenovia.png";

function LandingPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });

      // Save JWT token in localStorage
      localStorage.setItem("token", res.data.token);

      console.log("Login successful!");
      navigate("/dashboard"); // redirect after success
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-box">
        <img src={logo} alt="Serenovia Logo" className="landing-logo" />
        <h1 className="landing-title">Welcome to Serenovia</h1>
        <form onSubmit={handleLogin} className="landing-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
        <p className="landing-footer">
          <button
            className="forgot-btn"
            onClick={() => navigate("/forgot-password")}
          >
            Forgotten Password?
          </button>
        </p>
      </div>
    </div>
  );
}

export default LandingPage;

