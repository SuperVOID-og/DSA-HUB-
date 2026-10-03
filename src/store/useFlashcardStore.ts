import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FlashcardStore {
  needsPractice: string[];
  markNeedsPractice: (id: string, practice: boolean) => void;
}

export const useFlashcardStore = create<FlashcardStore>()(
  persist(
    (set) => ({
      needsPractice: [],
      markNeedsPractice: (id, practice) =>
        set((state) => {
          if (practice) {
            return { needsPractice: state.needsPractice.includes(id) ? state.needsPractice : [...state.needsPractice, id] };
          } else {
            return { needsPractice: state.needsPractice.filter(item => item !== id) };
          }
        }),
    }),
    {
      name: 'flashcard-storage',
    }
  )
);
