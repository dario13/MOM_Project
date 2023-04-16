import { DataTheme } from '@/components'
import React from 'react'

export type ThemeContextType = {
  theme: DataTheme
  toggle: () => void
}

export const initialTheme = DataTheme.light

export const initialStateThemeContext: ThemeContextType = {
  theme: initialTheme,
  toggle: () => ({}),
}

export const ThemeContext = React.createContext<ThemeContextType>(initialStateThemeContext)
