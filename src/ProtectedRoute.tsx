// src/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: string; // optional role requirement
}

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // store this at login

  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If a role is required and doesn't match → redirect to dashboard
  if (role && userRole !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise → allow access
  return children;
}

export default ProtectedRoute;

