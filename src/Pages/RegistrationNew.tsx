import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import serenoviaLogo from "../assets/serenovia.png";
import "./RegistrationNew.css";

const africanCountries = [
  "Cameroon", "Nigeria", "Ghana", "Kenya", "South Africa",
  "Uganda", "Tanzania", "Senegal", "Ivory Coast", "Ethiopia",
  "Morocco", "Algeria", "Egypt", "Rwanda", "Zimbabwe"
];

const Registration: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    userId: "",
    country: "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    // Validate mandatory fields
    for (const [key, value] of Object.entries(form)) {
      if (!value.trim()) {
        setMessage(`❌ ${key} is required`);
        return;
      }
    }
    if (form.password !== form.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("🎉 Registration successful! Please check your email for a verification code.");
        setVerificationStep(true);
      } else {
        if (data.error.includes("User ID is already taken")) {
          setMessage("❌ That User ID is already taken. Please choose another one.");
        } else {
          setMessage(`❌ Error: ${data.error}`);
        }
      }
    } catch (err) {
      setMessage("❌ Registration failed. Please try again.");
    }
  };

  const handleVerify = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/verifyEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, code: verificationCode })
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // redirect after 2s
      } else {
        setMessage(`❌ Verification failed: ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Verification request failed.");
    }
  };

  return (
    <div className="registration-container">
      <img src={serenoviaLogo} alt="Serenovia Logo" className="logo" />
      <h2>Register New Account</h2>

      {!verificationStep ? (
        <form className="registration-form">
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />

          <label htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} />

          <label htmlFor="userId">Create User ID</label>
          <input id="userId" name="userId" value={form.userId} onChange={handleChange} />
          <small className="hint">Your referral code will be the same as your User ID.</small>

          <label htmlFor="country">Country</label>
          <select id="country" name="country" value={form.country} onChange={handleChange} aria-label="Country">
            <option value="">Select Country</option>
            {africanCountries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />

          <button type="button" className="register-btn" onClick={handleRegister}>
            Create Account
          </button>
        </form>
      ) : (
        <div className="verification-step">
          <p>Please enter the verification code sent to your email:</p>
          <label htmlFor="verificationCode">Verification Code</label>
          <input
            id="verificationCode"
            name="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button type="button" className="register-btn" onClick={handleVerify}>
            Verify Email
          </button>
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Registration;
