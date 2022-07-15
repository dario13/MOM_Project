import { ThemeContext } from '@/theme/theme-context'
import { useContext } from 'react'

export const useTheme = () => {
  const context = useContext(ThemeContext)
  return { theme: context.theme, setTheme: context.setTheme }
}
