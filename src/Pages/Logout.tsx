// src/Pages/Logout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any stored session/auth data here if needed
    console.log("User logged out");

    // Redirect back to landing page
    navigate("/");
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
      <p>You are being redirected to the Serenovia login page.</p>
    </div>
  );
};

export default Logout;
