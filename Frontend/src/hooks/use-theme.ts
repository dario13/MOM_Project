import { ThemeContext } from '@/contexts/theme/theme-context'
import { DataTheme } from '@/contexts/theme/theme-type'
import { useThemeStore } from '@/store/theme/theme.store'
import { useContext, useEffect } from 'react'
import debounce from 'lodash.debounce'

export type useThemeType = {
  theme: DataTheme
  toggle: () => void
}

export const useTheme = (): useThemeType => {
  const context = useContext(ThemeContext)
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    context.theme = theme as DataTheme
  })

  const toggle = () => {
    const theme = context.theme === 'light' ? 'dark' : 'light'
    context.theme = theme
    setTheme(theme)
  }

  const debouncedToggle = debounce(toggle, 5)

  return { theme: theme as DataTheme, toggle: debouncedToggle }
}
