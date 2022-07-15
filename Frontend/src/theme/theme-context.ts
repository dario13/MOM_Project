import React from 'react'

import { DataTheme } from './types'

export type ThemeContextType = {
  theme: DataTheme
  setTheme: (theme: DataTheme) => void
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => ({}),
})
