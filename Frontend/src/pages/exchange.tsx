import React from 'react'
import { FlexBox } from '@/components'
import { PageLayout } from '@/components/layouts/page-layout'
import { ExchangeCard } from '@/components/organisms/exchange-card'
import { ConnectYourWallet } from '@/components/molecules/connect-your-wallet'
import { useWallet } from '@/hooks/use-wallet'

const Exchange = () => {
  const { isAccountConnected } = useWallet()

  const showConnectWallet = () => {
    return <ConnectYourWallet />
  }

  const renderExchangeCard = () => {
    return <ExchangeCard />
  }

  const renderContent = () => {
    return (
      <FlexBox alignItems="center">
        {isAccountConnected ? renderExchangeCard() : showConnectWallet()}
      </FlexBox>
    )
  }

  return <PageLayout content={renderContent()} />
}

export default Exchange
