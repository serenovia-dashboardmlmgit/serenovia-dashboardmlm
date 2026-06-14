import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./AdminDashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h2>Welcome Back, Blandine! <span>Admin Overview</span></h2>
        <div className="summary-boxes">
          <div className="box">Total Users: 5,420</div>
          <div className="box">Active Orders: 128</div>
          <div className="box">Wallet Balance: $12,450</div>
          <div className="box">Monthly Earnings: $8,920 ↑15%</div>
        </div>
      </header>

      {/* Charts Row */}
      <div className="charts-row">
        <div className="chart-card">
          <h3>Earnings Progress</h3>
          <Line
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  label: "Earnings",
                  data: [0, 2000, 4000, 6000, 8000, 10000],
                  borderColor: "#2e7d32",
                  backgroundColor: "rgba(46,125,50,0.2)",
                },
              ],
            }}
          />
        </div>
        <div className="chart-card">
          <h3>Referral Growth</h3>
          <Bar
            data={{
              labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
              datasets: [
                {
                  label: "Referrals",
                  data: [50, 100, 150, 200, 250],
                  backgroundColor: "#f9a825",
                },
              ],
            }}
          />
        </div>
      </div>

      {/* Wallet Summary */}
      <section className="wallet-summary">
        <h3>Wallet Summary</h3>
        <p>Available Balance: $12,450</p>
        <p>Pending Withdrawals: $3,200</p>
        <p>Total Commissions: $7,890</p>
        <button>Withdraw Funds</button>
      </section>

      {/* Transactions */}
      <section className="transactions">
        <h3>Recent Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th><th>Type</th><th>Amount</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>07/10/2024</td><td>Withdrawal</td><td>$1,000</td><td>Pending</td></tr>
            <tr><td>07/09/2024</td><td>Commission</td><td>$450</td><td>Completed</td></tr>
            <tr><td>07/08/2024</td><td>Transfer</td><td>$200</td><td>Completed</td></tr>
            <tr><td>07/08/2024</td><td>Default</td><td>$200</td><td>Completed</td></tr>
          </tbody>
        </table>
      </section>

      {/* Top Performers */}
      <section className="top-performers">
        <h3>Top Performers</h3>
        <ul>
          <li>Alice M. – 275 Referrals</li>
          <li>John S. – 230 Referrals</li>
          <li>Marie C. – 185 Referrals</li>
          <li>David T. – 160 Referrals</li>
          <li>Sophie L. – 145 Referrals</li>
        </ul>
      </section>

      {/* Sales Stats */}
      <section className="sales-stats">
        <h3>Orders Overview</h3>
        <Pie
          data={{
            labels: ["Delivered", "Pending", "Cancelled"],
            datasets: [
              {
                data: [55, 30, 15],
                backgroundColor: ["#2e7d32", "#f9a825", "#c62828"],
              },
            ],
          }}
        />
      </section>

      {/* Announcements */}
      <section className="announcements">
        <h3>Announcements</h3>
        <p>Promo: Summer Sale – 20% Off! Ends July 31st</p>
        <p>System Update: New security features added.</p>
      </section>
    </div>
  );
};

export default AdminDashboard;
