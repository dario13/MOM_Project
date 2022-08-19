import React from 'react'
import { useTheme } from '@/hooks/use-theme'
import { ThemeContext } from './theme-context'

type ThemeProviderProps = {
  children: React.ReactNode
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { theme, toggle } = useTheme()
  const { children } = props

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  )
}
