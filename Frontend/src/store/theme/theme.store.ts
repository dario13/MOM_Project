import { initialDefaultTheme } from '@/contexts/theme/theme-context'
import create from 'zustand'
import { persist } from 'zustand/middleware'

const initialState = {
  persistedTheme: initialDefaultTheme,
}

type ThemeState = {
  persistedTheme: string
  persistTheme: (theme: string) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      ...initialState,
      persistTheme: (theme: string) => set({ persistedTheme: theme }),
    }),
    {
      name: 'theme-storage',
    },
  ),
)
