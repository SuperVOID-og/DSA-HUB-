import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedTopics: string[];
  markTopicComplete: (topicId: string) => void;
  markTopicIncomplete: (topicId: string) => void;
  isTopicComplete: (topicId: string) => boolean;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedTopics: [],
      markTopicComplete: (topicId) => 
        set((state) => ({
          completedTopics: state.completedTopics.includes(topicId) 
            ? state.completedTopics 
            : [...state.completedTopics, topicId]
        })),
      markTopicIncomplete: (topicId) =>
        set((state) => ({
          completedTopics: state.completedTopics.filter(id => id !== topicId)
        })),
      isTopicComplete: (topicId) => get().completedTopics.includes(topicId),
      resetProgress: () => set({ completedTopics: [] })
    }),
    {
      name: 'dsa-progress-storage'
    }
  )
);
