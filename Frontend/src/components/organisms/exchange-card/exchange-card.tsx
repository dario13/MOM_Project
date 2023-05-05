import { Card, FlexBox, Text } from '@/components/atoms'
import { useMedia } from '@/hooks/use-media'
import React, { useState } from 'react'
import { ExchangeMode } from './exchange-card.props'
import { InfoCard } from './info-card'
import { BuyAndSellCard } from './buy-and-sell-card/buy-and-sell-card'
import exchangeModeContent from './exchange-mode-content'

const ExchangeCard: React.FC = () => {
  const { isMobile, isTabletOrMobile } = useMedia()
  const [exchangeMode, setExchangeMode] = useState<ExchangeMode>('buy')
  const { title, description } = exchangeModeContent(exchangeMode)

  const renderMobileTitleAndDescription = () => {
    return (
      <FlexBox maxHeight="10vh">
        <Text size="xl" bold align="center" text={title} />
        <Text size="md" align="center" text={description} />
      </FlexBox>
    )
  }

  const showExchange = () => {
    return (
      <Card color="base200">
        <FlexBox flexDirection={isMobile ? 'column' : 'row'}>
          {!isMobile && <InfoCard exchangeMode={exchangeMode} />}
          <BuyAndSellCard
            handleExchangeMode={(mode) => setExchangeMode(mode)}
            exchangeMode={exchangeMode}
          />
        </FlexBox>
      </Card>
    )
  }

  return (
    <FlexBox maxHeight={isMobile ? '60vh' : '50vh'} width={isTabletOrMobile ? '90vw' : '60vw'}>
      <FlexBox gap="1rem">
        {isMobile && renderMobileTitleAndDescription()}
        {showExchange()}
      </FlexBox>
    </FlexBox>
  )
}

ExchangeCard.displayName = 'ExchangeCard'

export { ExchangeCard }
