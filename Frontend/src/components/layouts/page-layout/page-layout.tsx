import { FlexBox } from '@/components/atoms'
import { Divider } from '@/components/atoms/divider'
import { MainNavbar } from '@/components/organisms/main-navbar'
import React from 'react'
import { PageLayoutProps } from './page-layout.props'

const PageLayout = (pageLayoutProps: PageLayoutProps) => {
  const { content } = pageLayoutProps

  return (
    <FlexBox
      gap="1rem"
      paddingTop="0.5rem"
      paddingLeft="0.8rem"
      paddingRight="0.8rem"
      className={'bg-base-200'}
    >
      <MainNavbar />
      <Divider />
      {content}
    </FlexBox>
  )
}

PageLayout.displayName = 'PageLayout'

export { PageLayout }
