import { FlexBox } from '@/components/atoms'
import { MainNavbar } from '@/components/organisms/main-navbar'
import React from 'react'
import { PageLayoutProps } from './page-layout.props'
import { ThemeProvider } from '@/contexts/theme/theme-provider'

const PageLayout = (pageLayoutProps: PageLayoutProps) => {
  const { content } = pageLayoutProps

  return (
    <ThemeProvider>
      <FlexBox
        gap="3.5rem"
        paddingTop="1rem"
        paddingLeft="0.8rem"
        paddingRight="0.8rem"
        className="bg-base-200"
        height="100vh"
        minHeight="100vh"
      >
        <FlexBox flex="0">
          <MainNavbar />
        </FlexBox>
        <FlexBox>{content}</FlexBox>
      </FlexBox>
    </ThemeProvider>
  )
}

PageLayout.displayName = 'PageLayout'

export { PageLayout }
