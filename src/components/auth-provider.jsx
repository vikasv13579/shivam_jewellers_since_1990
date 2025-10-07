"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/auth-store";

export default function AuthProvider({ children }) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    const cleanup = initializeAuth();
    return cleanup;
  }, [initializeAuth]);

  return children;
}
