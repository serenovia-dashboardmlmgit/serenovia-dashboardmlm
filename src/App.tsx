// src/App.tsx
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./Pages/Sidebar";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute"; // ✅ import the wrapper

// Account
import AccountProfile from "./Pages/AccountProfile";
import AccountPassword from "./Pages/AccountPassword";
import AccountSecurity from "./Pages/AccountSecurity";

// Products
import ProductsMall from "./Pages/ProductsMall";
import ProductsOrders from "./Pages/ProductsOrders";
import ProductsPromotions from "./Pages/ProductsPromotions";
import ProductsLeaderboard from "./Pages/ProductsLeaderboard";

// Finance
import FinanceWallet from "./Pages/FinanceWallet";
import FinanceTransactions from "./Pages/FinanceTransactions";
import FinanceTransfer from "./Pages/FinanceTransfer";
import FinanceWithdraw from "./Pages/FinanceWithdraw";
import FinanceCommission from "./Pages/FinanceCommission";
import FinanceGifts from "./Pages/FinanceGifts";

// Registration
import RegistrationNew from "./Pages/RegistrationNew";
import RegistrationReferral from "./Pages/RegistrationReferral";
import RegistrationLeaderboard from "./Pages/RegistrationLeaderboard";

// Network
import NetworkTree from "./Pages/NetworkTree";
import NetworkGenesis from "./Pages/NetworkGenesis";

// Reports
import ReportsCommission from "./Pages/ReportsCommission";
import ReportsEarnings from "./Pages/ReportsEarnings";

// Support
import SupportFAQ from "./Pages/SupportFAQ";
import SupportContact from "./Pages/SupportContact";

// Settings
import SettingsPreferences from "./Pages/SettingsPreferences";

// User extras
import RankBanner from "./Pages/RankBanner";
import Training from "./Pages/Training";
import Inbox from "./Pages/Inbox";
import Events from "./Pages/Events";
import SocialMedia from "./Pages/SocialMedia";

// Admin main pages
import AdminDashboard from "./Pages/AdminDashboard";
import AdminBusinessTools from "./Pages/AdminBusinessTools";
import AdminAnalytics from "./Pages/AdminAnalytics";
import AdminSecurity from "./Pages/AdminSecurity";
import AdminPreferences from "./Pages/AdminPreferences";

// Admin submenus
import AdminGift from "./Pages/AdminGift";
import AdminEvents from "./Pages/AdminEvents";
import AdminPromotions from "./Pages/AdminPromotions";
import AdminRankBanners from "./Pages/AdminRankBanners";
import AdminTraining from "./Pages/AdminTraining";
import AdminDialogue from "./Pages/AdminDialogue";

import AdminUsers from "./Pages/AdminUsers";
import AdminOrders from "./Pages/AdminOrders";
import AdminWithdrawals from "./Pages/AdminWithdrawals";
import AdminEmailCode from "./Pages/AdminEmailCode";
import AdminResetSecurity from "./Pages/AdminResetSecurity";

import AdminReports from "./Pages/AdminReports";
import AdminEngagementMetrics from "./Pages/AdminEngagementMetrics";

import AdminAuditLogs from "./Pages/AdminAuditLogs";
import AdminAccessControl from "./Pages/AdminAccessControl";
import AdminBackupRestore from "./Pages/AdminBackupRestore";

import AdminLanguagePreferences from "./Pages/AdminLanguagePreferences";
import AdminBrandingSettings from "./Pages/AdminBrandingSettings";
import AdminNotificationSettings from "./Pages/AdminNotificationSettings";
import AdminSocialMedia from "./Pages/AdminSocialMedia";

// Other pages
import LandingPage from "./Pages/LandingPage";
import ForgotPassword from "./Pages/ForgotPassword";
import Logout from "./Pages/Logout";

import "./App.css";

function App() {
  const userRole = "admin"; // later from login/auth
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const hideSidebar =
    location.pathname === "/" || location.pathname === "/forgot-password";

  return (
    <div className="app_layout">
      {!hideSidebar && sidebarVisible && <Sidebar userRole={userRole} />}

      <div className={hideSidebar ? "full_content" : "content"}>
        {!hideSidebar && (
          <div className="topbar">
            <button
              className="hamburger"
              onClick={() => setSidebarVisible(!sidebarVisible)}
            >
              ☰
            </button>
            <h2 className="brand">SERENOVIA</h2>
          </div>
        )}

        <Routes>
          {/* Landing + Forgot Password */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Dashboard (protected) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/rank-banner" element={<RankBanner />} />

          {/* Account */}
          <Route path="/account/profile" element={<AccountProfile />} />
          <Route path="/account/password" element={<AccountPassword />} />
          <Route path="/account/security" element={<AccountSecurity />} />

          {/* Products */}
          <Route path="/products/mall" element={<ProductsMall />} />
          <Route path="/products/orders" element={<ProductsOrders />} />
          <Route path="/products/promotions" element={<ProductsPromotions />} />
          <Route path="/products/leaderboard" element={<ProductsLeaderboard />} />

          {/* Finance */}
          <Route path="/finance/wallet" element={<FinanceWallet />} />
          <Route path="/finance/transactions" element={<FinanceTransactions />} />
          <Route path="/finance/transfer" element={<FinanceTransfer />} />
          <Route path="/finance/withdraw" element={<FinanceWithdraw />} />
          <Route path="/finance/commission" element={<FinanceCommission />} />
          <Route path="/finance/gifts" element={<FinanceGifts />} />

          {/* Registration */}
          <Route path="/registration/new" element={<RegistrationNew />} />
          <Route path="/registration/referral" element={<RegistrationReferral />} />
          <Route path="/registration/leaderboard" element={<RegistrationLeaderboard />} />

          {/* Network */}
          <Route path="/network/tree" element={<NetworkTree />} />
          <Route path="/network/genesis" element={<NetworkGenesis />} />

          {/* Reports */}
          <Route path="/reports/commission" element={<ReportsCommission />} />
          <Route path="/reports/earnings" element={<ReportsEarnings />} />

          {/* Support */}
          <Route path="/support/faq" element={<SupportFAQ />} />
          <Route path="/support/contact" element={<SupportContact />} />

          {/* Settings */}
          <Route path="/settings/preferences" element={<SettingsPreferences />} />

          {/* User extras */}
          <Route path="/training" element={<Training />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/events" element={<Events />} />
          <Route path="/social-media" element={<SocialMedia />} />

          {/* Admin (only if role is admin) */}
          {userRole === "admin" && (
            <>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/business-tools" element={<AdminBusinessTools />} />
              <Route path="/admin/business-tools/gift" element={<AdminGift />} />
              <Route path="/admin/business-tools/events" element={<AdminEvents />} />
              <Route path="/admin/business-tools/promotions" element={<AdminPromotions />} />
              <Route path="/admin/business-tools/rank-banners" element={<AdminRankBanners />} />
              <Route path="/admin/business-tools/training" element={<AdminTraining />} />
              <Route path="/admin/business-tools/dialogue" element={<AdminDialogue />} />

              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />
              <Route path="/admin/email-code" element={<AdminEmailCode />} />
              <Route path="/admin/reset-security" element={<AdminResetSecurity />} />

              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/analytics/reports" element={<AdminReports />} />
              <Route path="/admin/analytics/engagement-metrics" element={<AdminEngagementMetrics />} />

              <Route path="/admin/security" element={<AdminSecurity />} />
              <Route path="/admin/security/audit-logs" element={<AdminAuditLogs />} />
              <Route path="/admin/security/access-control" element={<AdminAccessControl />} />
              <Route path="/admin/security/backup-restore" element={<AdminBackupRestore />} />

              <Route path="/admin/preferences" element={<AdminPreferences />} />
              <Route path="/admin/preferences/language" element={<AdminLanguagePreferences />} />
              <Route path="/admin/preferences/branding" element={<AdminBrandingSettings />} />
              <Route path="/admin/preferences/notifications" element={<AdminNotificationSettings />} />
              <Route path="/admin/preferences/social-media" element={<AdminSocialMedia />} />
            </>
          )}

          {/* Logout */}
          <Route path="/logout" element={<Logout />} />

          {/* Catch-all route (optional) */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
