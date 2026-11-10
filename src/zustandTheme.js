
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useZustandTheme = create(
  persist(
    (set) => ({
      mode: 'light',

      setMode: (newMode) => {
        set({ mode: newMode });
      },

      toggleTheme: () => {
        set((state) => ({
          mode: state.mode === 'dark' ? 'light' : 'dark'
        }));
      }
    }),
    {
      name: 'zustand-theme'
    }
  )
);
