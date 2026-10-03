import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuestionStore {
  bookmarks: string[];
  completed: string[];
  toggleBookmark: (id: string) => void;
  toggleCompleted: (id: string) => void;
}

export const useQuestionStore = create<QuestionStore>()(
  persist(
    (set) => ({
      bookmarks: [],
      completed: [],
      toggleBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(id)
            ? state.bookmarks.filter((qId) => qId !== id)
            : [...state.bookmarks, id],
        })),
      toggleCompleted: (id) =>
        set((state) => ({
          completed: state.completed.includes(id)
            ? state.completed.filter((qId) => qId !== id)
            : [...state.completed, id],
        })),
    }),
    {
      name: 'question-storage',
    }
  )
);
