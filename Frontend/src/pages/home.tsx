import React from 'react'
import { FlexBox } from '@/components'
import { PageLayout } from '@/components/layouts/page-layout'
import { ExchangeCard } from '@/components/organisms/exchange-card'
import { ThemeProvider } from '@/contexts/theme/theme-provider'

const Home = () => {
  const renderExchangeCard = () => {
    return (
      <FlexBox alignItems="center">
        <ExchangeCard />
      </FlexBox>
    )
  }

  return (
    <ThemeProvider>
      <>
        <PageLayout content={renderExchangeCard()} />
      </>
    </ThemeProvider>
  )
}

export default Home
