// src/Pages/RegistrationNew.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import serenoviaLogo from "../assets/serenovia.png";
import "./RegistrationNew.css";
import { toast } from "react-toastify";

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
    confirmPassword: "",
    referralCode: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key} is required`;
      }
    });
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("🎉 Registration successful! Please check your email for a verification code.");
        setVerificationStep(true);
      } else {
        if (data.error.includes("User ID is already taken")) {
          setErrors({ ...errors, userId: "That User ID is already taken. Please choose another one." });
          toast.error("❌ User ID is already taken.");
        } else if (data.error.includes("Referral code")) {
          setErrors({ ...errors, referralCode: "Referral code is invalid. Enter a valid User ID or type Serenity." });
          toast.error("❌ Referral code is invalid.");
        } else {
          toast.error(`❌ Error: ${data.error}`);
        }
      }
    } catch (err) {
      toast.error("❌ Registration failed. Please try again.");
    }
  };

  const handleVerify = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/verifyEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, verificationCode })
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(`❌ Verification failed: ${data.error}`);
      }
    } catch (err) {
      toast.error("❌ Verification request failed.");
    }
  };

  return (
    <div className="registration-container">
      <img src={serenoviaLogo} alt="Serenovia Logo" className="logo" />
      <h2>Register New Account</h2>

      {!verificationStep ? (
        <form className="registration-form">
          {/* Registration inputs */}
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} />
          {errors.fullName && <p className="error">{errors.fullName}</p>}

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}

          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <label htmlFor="userId">User ID</label>
          <input id="userId" name="userId" value={form.userId} onChange={handleChange} />
          {errors.userId && <p className="error">{errors.userId}</p>}

          <label htmlFor="country">Country</label>
          <select id="country" name="country" value={form.country} onChange={handleChange}>
            <option value="">Select your country</option>
            {africanCountries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country && <p className="error">{errors.country}</p>}

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} />
          {errors.password && <p className="error">{errors.password}</p>}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <label htmlFor="referralCode">Referral Code</label>
          <input id="referralCode" name="referralCode" value={form.referralCode} onChange={handleChange} />
          {errors.referralCode && <p className="error">{errors.referralCode}</p>}

          <button type="button" className="register-btn" onClick={handleRegister}>
            Create Account
          </button>
        </form>
      ) : (
        <div className="verification-step">
          <p>Please enter the verification code sent to your email:</p>

          <label htmlFor="verifyEmail">Email</label>
          <input
            id="verifyEmail"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label htmlFor="verificationCode">Verification Code</label>
          <input
            id="verificationCode"
            name="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />

          <button type="button" className="register-btn" onClick={handleVerify}>
            Verify Email
          </button>
        </div>
      )}
    </div>
  );
};

export default Registration;
