import { FlexBox } from '@/components/atoms'
import { MainNavbar } from '@/components/organisms/main-navbar'
import React from 'react'
import { PageLayoutProps } from './page-layout.props'

const PageLayout = (pageLayoutProps: PageLayoutProps) => {
  const { content } = pageLayoutProps

  return (
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
      <FlexBox flex="1">{content}</FlexBox>
    </FlexBox>
  )
}

PageLayout.displayName = 'PageLayout'

export { PageLayout }
