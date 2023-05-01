import { DataTheme } from '@/components'
import { initialTheme } from '@/contexts/theme/theme-context'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialState = {
  theme: initialTheme,
}

type ThemeState = {
  theme: DataTheme
  setTheme: (theme: DataTheme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: initialState.theme,
      setTheme: (theme: DataTheme) => set({ theme }),
    }),
    {
      name: 'theme',
    },
  ),
)
