// src/Pages/ForgotPassword.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import logo from "../assets/Serenovia.png"; // adjust filename if different
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ✅ Connect to backend API when ready
      // Example placeholder request:
      // const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      // const data = await res.json();

      // For now, just simulate success
      setSubmitted(true);
      toast.success("✅ Password reset link sent! Please check your email.");
    } catch (err) {
      toast.error("❌ Failed to send reset request. Try again later.");
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-box">
        <img src={logo} alt="Serenovia Logo" className="landing-logo" />
        {!submitted ? (
          <>
            <h1 className="landing-title">Forgotten Password</h1>
            <form onSubmit={handleReset} className="landing-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Send Reset Link</button>
            </form>
          </>
        ) : (
          <div className="reset-message">
            <h2>Password Reset Requested</h2>
            <p>
              We’ve sent a password reset link to <strong>{email}</strong>.  
              Please check your inbox.  
              If you don’t see it, remember to also check your <em>SPAM</em> or <em>JUNK</em> folder.
            </p>
            <button
              className="back-btn"
              onClick={() => navigate("/")}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
