// src/Pages/Logout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Clear any stored session/auth data
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // if you store user role

    // ✅ Show toast feedback
    toast.success("✅ You have logged out successfully!");

    // Redirect back to landing/login page
    navigate("/");
  }, [navigate]);

  return null; // no need for a screen, toast handles feedback
};

export default Logout;
