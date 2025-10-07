import { create } from 'zustand';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

export const useAuthStore = create((set, get) => ({
  // State
  currentUser: null,
  loading: true,
  isInitialized: false,

  // Actions
  setUser: (user) => set({ currentUser: user, loading: false }),
  setLoading: (loading) => set({ loading }),

  logout: async () => {
    try {
      await signOut(auth);
      set({ currentUser: null });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  },

  // Initialize auth state listener
  initializeAuth: () => {
    if (get().isInitialized) return;

    set({ isInitialized: true });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({
        currentUser: user,
        loading: false
      });
    });

    // Return cleanup function
    return unsubscribe;
  },

  // Helper methods
  isAuthenticated: () => !!get().currentUser,
  isGuest: () => !get().currentUser,
}));
