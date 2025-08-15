import React from "react";
import { Navigate, useLocation } from "react-router";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <>{children}</>;
} 