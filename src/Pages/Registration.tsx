import React, { useState } from "react";

const Registration: React.FC = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!name.trim()) {
      setMessage("❌ Please enter a name");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ ${data.user.name} registered successfully!`);
        setName(""); // clear input after success
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Registration failed. Please try again.");
    }
  };

  return (
    <div className="registration-container">
      <h2>New Member Registration</h2>
      <input
        type="text"
        placeholder="Enter member name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Registration;
