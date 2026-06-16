// src/Pages/LandingPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Axios helper we created
import RegistrationNew from "./RegistrationNew"; // ✅ updated import
import "./LandingPage.css";
import logo from "../assets/Serenovia.png";

function LandingPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegister, setIsRegister] = useState(false); // toggle between login/register
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // ✅ Corrected endpoint to match backend route
      const res = await api.post("/api/auth/login", { email, password });

      // Save JWT token in localStorage
      localStorage.setItem("token", res.data.token);

      console.log("Login successful!");
      navigate("/dashboard"); // redirect after success
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-box">
        <img src={logo} alt="Serenovia Logo" className="landing-logo" />
        <h1 className="landing-title">Welcome to Serenovia</h1>

        {isRegister ? (
          // Show registration form
          <RegistrationNew />
        ) : (
          // Show login form
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
        )}

        <div className="landing-footer">
          {isRegister ? (
            <div className="action-box">
              <h3>Already have an account?</h3>
              <p>Log in to access your Serenovia dashboard.</p>
              <button className="switch-btn" onClick={() => setIsRegister(false)}>
                Log In
              </button>
            </div>
          ) : (
            <>
              <div className="action-box">
                <h3>Forgotten Password?</h3>
                <p>Reset your password securely to regain access.</p>
                <button
                  className="forgot-btn"
                  onClick={() => navigate("/forgot-password")}
                >
                  Change Password
                </button>
              </div>

              <div className="action-box">
                <h3>Don’t have an account?</h3>
                <p>Create your Serenovia account and start today.</p>
                <button
                  className="switch-btn"
                  onClick={() => setIsRegister(true)}
                >
                  Register New Account
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
