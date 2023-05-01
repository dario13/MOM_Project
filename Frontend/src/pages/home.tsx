import React from 'react'
import { FlexBox } from '@/components'
import { PageLayout } from '@/components/layouts/page-layout'

const Home = () => {
  const renderHome = () => {
    return <FlexBox alignItems="center"></FlexBox>
  }

  return <PageLayout content={renderHome()} />
}

export default Home
