import React from 'react'

import { DataTheme } from './theme-type'

export type ThemeContextType = {
  theme: DataTheme
  toggle: () => void
}

export const initialDefaultTheme = 'light'

export const initialStateThemeContext: ThemeContextType = {
  theme: initialDefaultTheme,
  toggle: () => ({}),
}

export const ThemeContext = React.createContext<ThemeContextType>(initialStateThemeContext)
