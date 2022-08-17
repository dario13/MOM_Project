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

export const decorators = [
  (Story, options) => {
    const { toggle, theme } = useTheme()

    useEffect(() => {
      if (options?.args?.dataTheme !== theme) {
        toggle()
      }
    }, [options.args.dataTheme])

    return (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  },
]
