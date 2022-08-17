import { initialDefaultTheme, ThemeContext } from '@/contexts/theme/theme-context'
import { DataTheme } from '@/contexts/theme/theme-type'
import { useThemeStore } from '@/store/theme/theme.store'
import { useContext, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'

export type useThemeType = {
  theme: DataTheme
  toggle: () => void
}

export const useTheme = (): useThemeType => {
  const context = useContext(ThemeContext)
  const { persistedTheme, persistTheme } = useThemeStore()
  // The next useState is a workaround for the issue related to hydrate the state of the persisted theme.
  const [theme, setTheme] = useState(initialDefaultTheme)

  useEffect(() => {
    context.theme = persistedTheme as DataTheme
    setTheme(persistedTheme)
  })

  const toggle = () => {
    const theme = context.theme === 'light' ? 'dark' : 'light'
    context.theme = theme
    persistTheme(theme)
    setTheme(theme)
  }

  const debouncedToggle = debounce(toggle, 5)

  return { theme: theme as DataTheme, toggle: debouncedToggle }
}
