import { FlexBox } from '@/components/atoms'
import { Divider } from '@/components/atoms/divider'
import { MainNavbar } from '@/components/organisms/main-navbar'
import React from 'react'
import { PageLayoutProps } from './page-layout.props'
import Head from 'next/head'

const PageLayout = (pageLayoutProps: PageLayoutProps) => {
  const { content } = pageLayoutProps

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="images/favicon/favicon-16x16.png" />
        <link rel="mask-icon" href="images/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

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
    </>
  )
}

PageLayout.displayName = 'PageLayout'

export { PageLayout }
