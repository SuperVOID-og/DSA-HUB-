import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BookmarkType = 'note' | 'question' | 'flashcard';

export interface Bookmark {
  id: string; // e.g. 'u1-t1', 'q-04', 'fc-12'
  type: BookmarkType;
  title: string;
  unitId?: string; // Optional, useful for grouping
  timestamp: number;
  url?: string;
}

interface BookmarkState {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  clearBookmarks: () => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (bookmark) => 
        set((state) => {
          if (state.bookmarks.find(b => b.id === bookmark.id)) return state;
          return { bookmarks: [...state.bookmarks, bookmark] };
        }),
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter(b => b.id !== id)
        })),
      isBookmarked: (id) => !!get().bookmarks.find(b => b.id === id),
      clearBookmarks: () => set({ bookmarks: [] })
    }),
    {
      name: 'dsa-bookmarks-storage'
    }
  )
);
