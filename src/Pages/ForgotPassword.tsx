// src/Pages/ForgotPassword.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import logo from "../assets/Serenovia.png"; // adjust filename if different

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Later: connect to backend API to send reset email
    setSubmitted(true);
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
              If you don’t see it, remember to also check your *SPAM* or *JUNK* folder.
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
