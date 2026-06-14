// src/Pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrophy, FaUsers, FaBullhorn } from "react-icons/fa";
import api from "../api"; // ✅ use Axios helper
import "./Dashboard.css";

interface Stats {
  totalUsers: number;
  sales: number;
  referrals: number;
  newDistributors: number;
  revenue: number;
  totalEarnings: number;
  pendingPayouts: number;
  growthRate: number;
}

interface User {
  id: number;
  name: string;
  productsSold: number;
  referralsSold: number;
  commission?: number;
}

interface Announcement {
  id: number;
  title: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [salesLeaderboard, setSalesLeaderboard] = useState<User[]>([]);
  const [referralLeaderboard, setReferralLeaderboard] = useState<User[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  // Get user name from localStorage (after login)
  const username = localStorage.getItem("username") || "Member";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, salesRes, referralRes, announcementsRes] =
          await Promise.all([
            api.get("/stats"),
            api.get("/leaderboard/sales"),
            api.get("/leaderboard/referrals"),
            api.get("/announcements"),
          ]);

        setStats(statsRes.data);
        setSalesLeaderboard(salesRes.data);
        setReferralLeaderboard(referralRes.data);
        setAnnouncements(announcementsRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!stats) return <p>No stats available</p>;

  return (
    <div className="dashboard-container">
      {/* Motivational Banner */}
      <section className="banner">
        <div className="banner-overlay">
          <h2>Welcome back, {username}!</h2>
          <p>Let’s grow your success today.</p>
          <button className="start-btn">START NOW</button>
        </div>
      </section>

      <div className="dashboard-main">
        {/* Wallet Box */}
        <header className="dashboard-header">
          <div className="header-left">
            <p>
              Your Rank:{" "}
              {stats.sales >= 25 ? "Active Distributor" : "New Member"}
            </p>
          </div>
          <div className="wallet-box">
            <span>Wallet Balance</span>
            <span>${stats.pendingPayouts?.toFixed(2)}</span>
            <button>Withdraw</button>
          </div>
        </header>

        {/* Leaderboards + Announcements */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <FaTrophy size={20} color="#2e7d32" style={{ marginRight: "8px" }} />
              <h3>Sales Leaderboard (≥25 Products)</h3>
            </div>
            <ol>
              {salesLeaderboard.map((u) => (
                <li key={u.id}>
                  {u.name} — {u.productsSold} products
                </li>
              ))}
            </ol>
            <Link to="/leaderboard/sales">
              <button>View Full Sales Leaderboard</button>
            </Link>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <FaUsers size={20} color="#2e7d32" style={{ marginRight: "8px" }} />
              <h3>Referral Leaderboard</h3>
            </div>
            <ol>
              {referralLeaderboard.map((u) => (
                <li key={u.id}>
                  {u.name} — {u.referralsSold} referral sales
                </li>
              ))}
            </ol>
            <Link to="/leaderboard/referrals">
              <button>View Full Referral Leaderboard</button>
            </Link>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <FaBullhorn size={20} color="#2e7d32" style={{ marginRight: "8px" }} />
              <h3>Announcements & Events</h3>
            </div>
            <ul>
              {announcements.map((a) => (
                <li key={a.id}>
                  {a.title} <button>Read More</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="dashboard-summary">
          <div className="summary-item">Total Users: {stats.totalUsers}</div>
          <div className="summary-item">
            New Distributors Today: {stats.newDistributors}
          </div>
          <div className="summary-item">Sales: {stats.sales}</div>
          <div className="summary-item">Referrals: {stats.referrals}</div>
          <div className="summary-item">
            Revenue: ${stats.revenue?.toFixed(2) ?? "0.00"}
          </div>
          <div className="summary-item">
            Total Earnings: ${stats.totalEarnings?.toFixed(2) ?? "0.00"}
          </div>
          <div className="summary-item">
            Pending Payouts: ${stats.pendingPayouts?.toFixed(2) ?? "0.00"}
          </div>
          <div className="summary-item">
            Growth Rate: {stats.growthRate?.toFixed(2) ?? "0.00"}%
          </div>
        </div>
      </div>

      {/* Footer Motivational Message */}
      <footer className="dashboard-footer">
        <p>Achieve Greatness!</p>
        <button className="purchase-btn">Make Test Purchase</button>
      </footer>
    </div>
  );
};

export default Dashboard;

