import { create } from 'zustand';

export const useSearchStore = create((set) => ({
  searchQuery: '',
  isSearchActive: false,

  // Set search query
  setSearchQuery: (query) => set({
    searchQuery: query,
    isSearchActive: query.trim().length > 0
  }),

  // Clear search
  clearSearch: () => set({
    searchQuery: '',
    isSearchActive: false
  }),
}));
