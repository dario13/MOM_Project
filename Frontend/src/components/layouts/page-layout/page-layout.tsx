import { FlexBox } from '@/components/atoms'
import { MainNavbar } from '@/components/organisms/main-navbar'
import React from 'react'
import { PageLayoutProps } from './page-layout.props'
import { ThemeProvider } from '@/contexts/theme/theme-provider'

const PageLayout = (pageLayoutProps: PageLayoutProps) => {
  const { content, name } = pageLayoutProps

  const renderHome = () => {
    return (
      <ThemeProvider>
        <FlexBox height="100vh" minHeight="100vh">
          {content}
          <FlexBox
            maxHeight="5%"
            paddingTop="1rem"
            paddingLeft="0.8rem"
            paddingRight="0.8rem"
            style={{ position: 'absolute' }}
            width="100%"
          >
            <MainNavbar />
          </FlexBox>
        </FlexBox>
      </ThemeProvider>
    )
  }

  const renderDefaultLayout = () => {
    return (
      <ThemeProvider>
        <FlexBox gap="5rem" className="bg-base-200" height="100vh" minHeight="100vh">
          <FlexBox maxHeight="5%" paddingTop="1rem" paddingLeft="0.8rem" paddingRight="0.8rem">
            <MainNavbar />
          </FlexBox>
          <FlexBox>{content}</FlexBox>
        </FlexBox>
      </ThemeProvider>
    )
  }

  return name === 'Home' ? renderHome() : renderDefaultLayout()
}

PageLayout.displayName = 'PageLayout'

export { PageLayout }
