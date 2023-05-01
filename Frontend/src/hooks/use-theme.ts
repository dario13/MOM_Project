import { ThemeContext } from '@/contexts/theme/theme-context'
import { useThemeStore } from '@/store/theme/theme.store'
import { useContext, useEffect } from 'react'
import debounce from 'lodash.debounce'
import { DataTheme } from '@/components'

export type useThemeType = {
  theme: DataTheme
  toggle: () => void
}

export const useTheme = (): useThemeType => {
  const context = useContext(ThemeContext)
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    context.theme = theme
  })

  const toggle = () => {
    const theme = context.theme === DataTheme.light ? DataTheme.dark : DataTheme.light
    context.theme = theme
    setTheme(theme)
  }

  const debouncedToggle = debounce(toggle, 5)

  return { theme, toggle: debouncedToggle }
}
