import React from 'react'
import { FlexBox } from '@/components'
import { PageLayout } from '@/components/layouts/page-layout'
import { HomeAnimated } from '@/components/molecules'

const Home = () => {
  const renderHome = () => {
    return (
      <FlexBox>
        <HomeAnimated />
      </FlexBox>
    )
  }

  return <PageLayout name={'Home'} content={renderHome()} />
}

export default Home
