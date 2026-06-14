import { useState } from "react";
import "./Admin.css";

function Admin() {
  const [withdrawalCode, setWithdrawalCode] = useState<string | null>(null);

  // Function to generate a random reference code
  const generateCode = () => {
    const code = "REF-" + Math.floor(100000 + Math.random() * 900000).toString();
    setWithdrawalCode(code);
  };

  return (
    <div className="admin-page">
      <h1>Admin Controls</h1>
      <p>Welcome, Administrator. Manage Serenovia’s system below:</p>

      <div className="admin-actions">
        <section className="admin-card">
          <h2>View User Activities</h2>
          <p>Monitor registrations, logins, and affiliate growth.</p>
          <button>View Activities</button>
        </section>

        <section className="admin-card">
          <h2>Manage Orders</h2>
          <p>Track and approve product orders.</p>
          <button>Manage Orders</button>
        </section>

        <section className="admin-card">
          <h2>Monitor Withdrawals</h2>
          <p>Review and authorize affiliate withdrawals.</p>
          <button onClick={generateCode}>Generate Reference Code</button>
          {withdrawalCode && (
            <p className="generated-code">
              Generated Code: <strong>{withdrawalCode}</strong>
            </p>
          )}
        </section>

        <section className="admin-card">
          <h2>Send Email Codes</h2>
          <p>Dispatch verification codes to users via email.</p>
          <button>Send Email Code</button>
        </section>

        <section className="admin-card">
          <h2>Reset Withdrawal Pins</h2>
          <p>Reset affiliate withdrawal PINs securely.</p>
          <button>Reset PIN</button>
        </section>
      </div>
    </div>
  );
}

export default Admin;
