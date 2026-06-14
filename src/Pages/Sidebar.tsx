// src/Pages/Sidebar.tsx
import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../assets/serenovia.png";
import { NavLink } from "react-router-dom";

import {
  faHome,
  faUser,
  faShoppingCart,
  faWallet,
  faClipboardList,
  faNetworkWired,
  faChartBar,
  faLifeRing,
  faCog,
  faTools,
  faGraduationCap,
  faEnvelope,
  faGlobe,
  faMedal,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SidebarProps {
  userRole: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Serenovia Logo" className="sidebar-logo" />
      </div>

      {/* Dashboard */}
      <div className="menu-section">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "menu-header active" : "menu-header")}>
          <FontAwesomeIcon icon={faHome} className="menu-icon" /> Dashboard
        </NavLink>
      </div>

      {/* Rank Banner */}
      <div className="menu-section">
        <NavLink to="/rank-banner" className={({ isActive }) => (isActive ? "menu-header active" : "menu-header")}>
          <FontAwesomeIcon icon={faMedal} className="menu-icon" /> Rank Banner
        </NavLink>
      </div>

      {/* Account */}
      <div className="menu-section">
        <div className="menu-header" onClick={() => toggleSection("account")}>
          <FontAwesomeIcon icon={faUser} className="menu-icon" /> Account
        </div>
        {openSection === "account" && (
          <ul className="menu-items">
            <li><NavLink to="/account/profile" className={({ isActive }) => (isActive ? "active" : "")}>Personal Profile</NavLink></li>
            <li><NavLink to="/account/password" className={({ isActive }) => (isActive ? "active" : "")}>Change Password</NavLink></li>
            <li><NavLink to="/account/security" className={({ isActive }) => (isActive ? "active" : "")}>Withdrawal Security</NavLink></li>
          </ul>
        )}
      </div>

      {/* Products & Orders */}
      <div className="menu-section">
        <div className="menu-header" onClick={() => toggleSection("products")}>
          <FontAwesomeIcon icon={faShoppingCart} className="menu-icon" /> Products & Orders
        </div>
        {openSection === "products" && (
          <ul className="menu-items">
            <li><NavLink to="/products/mall">Shopping Mall</NavLink></li>
            <li><NavLink to="/products/orders">View Orders</NavLink></li>
            <li><NavLink to="/products/promotions">Promotions</NavLink></li>
            <li><NavLink to="/products/leaderboard">Products Leaderboard</NavLink></li>
          </ul>
        )}
      </div>

      {/* Finance */}
      <div className="menu-section">
        <div className="menu-header" onClick={() => toggleSection("finance")}>
          <FontAwesomeIcon icon={faWallet} className="menu-icon" /> Finance
        </div>
        {openSection === "finance" && (
          <ul className="menu-items">
            <li><NavLink to="/finance/wallet">Wallet</NavLink></li>
            <li><NavLink to="/finance/transactions">Transactions</NavLink></li>
            <li><NavLink to="/finance/transfer">Transfer</NavLink></li>
            <li><NavLink to="/finance/withdraw">Withdraw</NavLink></li>
            <li><NavLink to="/finance/commission">Commission</NavLink></li>
            <li><NavLink to="/finance/gifts">Gifts</NavLink></li>
          </ul>
        )}
      </div>

      {/* Registration */}
      <div className="menu-section">
        <div className="menu-header" onClick={() => toggleSection("registration")}>
          <FontAwesomeIcon icon={faClipboardList} className="menu-icon" /> Registration
        </div>
        {openSection === "registration" && (
          <ul className="menu-items">
            <li><NavLink to="/registration/new">New Registration</NavLink></li>
            <li><NavLink to="/registration/referral">Referral Link</NavLink></li>
            <li><NavLink to="/registration/leaderboard">Referral Leaderboard</NavLink></li>
          </ul>
        )}
      </div>

      {/* Network */}
      <div className="menu-section">
        <div className="menu-header" onClick={() => toggleSection("network")}>
          <FontAwesomeIcon icon={faNetworkWired} className="menu-icon" /> Network
        </div>
        {openSection === "network" && (
          <ul className="menu-items">
            <li><NavLink to="/network/tree">Sponsor Tree</NavLink></li>
            <li><NavLink to="/network/genesis">Genesis</NavLink></li>
          </ul>
        )}
      </div>

      {/* Reports */}
      <div className="menu-section">
        <div className="menu-header" onClick={() => toggleSection("reports")}>
          <FontAwesomeIcon icon={faChartBar} className="menu-icon" /> Reports
        </div>
        {openSection === "reports" && (
          <ul className="menu-items">
            <li><NavLink to="/reports/commission">Referral Commission</NavLink></li>
            <li><NavLink to="/reports/earnings">Earnings Progress</NavLink></li>
          </ul>
        )}
      </div>

      {/* Training */}
      <div className="menu-section">
        <NavLink to="/training" className={({ isActive }) => (isActive ? "menu-header active" : "menu-header")}>
          <FontAwesomeIcon icon={faGraduationCap} className="menu-icon" /> Training / Tutorials
        </NavLink>
      </div>

      {/* Inbox */}
      <div className="menu-section">
        <NavLink to="/inbox" className={({ isActive }) => (isActive ? "menu-header active" : "menu-header")}>
          <FontAwesomeIcon icon={faEnvelope} className="menu-icon" /> Inbox / Messages
        </NavLink>
      </div>

      {/* Events */}
      <div className="menu-section">
        <NavLink to="/events" className={({ isActive }) => (isActive ? "menu-header active" : "menu-header")}>
          <FontAwesomeIcon icon={faChartBar} className="menu-icon" /> Events
        </NavLink>
      </div>

      {/* Social Media */}
      <div className="menu-section">
        <NavLink to="/social-media" className={({ isActive }) => (isActive ? "menu-header active" : "menu-header")}>
          <FontAwesomeIcon icon={faGlobe} className="menu-icon" /> Social Media
        </NavLink>
      </div>

      {/* Support */}
      <div className="menu-section">
        <div className="menu-header" onClick={() => toggleSection("support")}>
          <FontAwesomeIcon icon={faLifeRing} className="menu-icon" /> Support / Help
        </div>
        {openSection === "support" && (
          <ul className="menu-items">
            <li><NavLink to="/support/faq">FAQ</NavLink></li>
            <li><NavLink to="/support/contact">Contact Support</NavLink></li>
          </ul>
        )}
      </div>

      {/* Settings */}
      <div className="menu-section">
        <div className="menu-header" onClick={() => toggleSection("settings")}>
          <FontAwesomeIcon icon={faCog} className="menu-icon" /> Settings
        </div>
        {openSection === "settings" && (
          <ul className="menu-items">
            <li><NavLink to="/settings/preferences">Preferences</NavLink></li>
          </ul>
        )}
      </div>

      {/* Logout */}
      <div className="logout">
        <NavLink to="/logout" className="menu-header">
          <FontAwesomeIcon icon={faRightFromBracket} className="menu-icon" /> Logout
        </NavLink>
      </div>

 {/* Admin Control */}
{userRole === "admin" && (
  <div className="menu-section">
    <div className="menu-header" onClick={() => toggleSection("admin")}>
      <FontAwesomeIcon icon={faTools} className="menu-icon" /> Admin Control
    </div>
    {openSection === "admin" && (
      <ul className="menu-items">
        {/* New Admin Main Pages */}
        <li>
          <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            Admin Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/business-tools" className={({ isActive }) => (isActive ? "active" : "")}>
            Business Tools
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/analytics" className={({ isActive }) => (isActive ? "active" : "")}>
            Analytics
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/security" className={({ isActive }) => (isActive ? "active" : "")}>
            Security & Compliance
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/preferences" className={({ isActive }) => (isActive ? "active" : "")}>
            Preferences
          </NavLink>
        </li>

        {/* Existing Admin Links */}
        <li><NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active" : "")}>View User Activities</NavLink></li>
        <li><NavLink to="/admin/orders" className={({ isActive }) => (isActive ? "active" : "")}>Manage Orders</NavLink></li>
        <li><NavLink to="/admin/withdrawals" className={({ isActive }) => (isActive ? "active" : "")}>Monitor Withdrawals</NavLink></li>
        <li><NavLink to="/admin/email-code" className={({ isActive }) => (isActive ? "active" : "")}>Send Email Code</NavLink></li>
        <li><NavLink to="/admin/reset-security" className={({ isActive }) => (isActive ? "active" : "")}>Reset Withdrawal Security</NavLink></li>
        <li><NavLink to="/admin/events" className={({ isActive }) => (isActive ? "active" : "")}>Events</NavLink></li>
        <li><NavLink to="/admin/rank-banners" className={({ isActive }) => (isActive ? "active" : "")}>Rank Banners</NavLink></li>
        <li><NavLink to="/admin/training" className={({ isActive }) => (isActive ? "active" : "")}>Training / Tutorials</NavLink></li>
        <li><NavLink to="/admin/dialogue" className={({ isActive }) => (isActive ? "active" : "")}>Dialogue / Message Center</NavLink></li>
        <li><NavLink to="/admin/social-media" className={({ isActive }) => (isActive ? "active" : "")}>Social Media Integration</NavLink></li>
      </ul>
    )}
  </div>
 )}
 </div>   
);
};

export default Sidebar;