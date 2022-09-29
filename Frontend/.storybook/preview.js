import '../src/styles/global.css'
import React, { useEffect } from 'react'
import { useTheme } from '@/hooks/use-theme'
import { ThemeProvider } from '@/contexts/theme/theme-provider'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
}

export const args = { dataTheme: 'dark' }

export const decorators = [
  (Story) => {
    return (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  },
]
