import { useAuthStore } from './auth-store';

// Custom hook for easier access to auth state
export function useAuth() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const loading = useAuthStore((state) => state.loading);
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isGuest = useAuthStore((state) => state.isGuest);

  return {
    currentUser,
    loading,
    logout,
    isAuthenticated,
    isGuest,
  };
}
