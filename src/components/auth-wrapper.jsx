"use client";

import { useAuth } from "@/lib/use-auth";
import { useState, useEffect } from "react";
import AuthModal from "./auth-modal";

export default function AuthWrapper({ children }) {
  const { currentUser, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Always show the dashboard UI, regardless of auth status
  // The navbar will handle showing auth modal when needed
  return children;
}
