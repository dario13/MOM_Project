import { initialDefaultTheme } from '@/contexts/theme/theme-context'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialState = {
  theme: initialDefaultTheme,
}

type ThemeState = {
  theme: string
  setTheme: (theme: string) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: initialState.theme,
      setTheme: (theme: string) => set({ theme }),
    }),
    {
      name: 'theme',
    },
  ),
)
