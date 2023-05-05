import React, { useCallback, useEffect, useState } from 'react'
import { Button, FlexBox } from '@/components/atoms'
import { useMedia } from '@/hooks/use-media'
import { ExchangeMode } from '../exchange-card.props'
import { useExchange } from '@/hooks/use-exchange'
import AmountInput from './amount-input'
import ConversionInfo from './conversion-info'
import ConfirmationModal from './confirmation-modal'
import BuyAndSellHeader from './buy-and-sell-header'
import { MOMToBuyIsLessThanMinimum, MOMToSellIsLessThanMinimum } from './buy-and-sell-constants'
import { useHydration } from '@/hooks/use-hydration'
import { useOperationInProgress } from '@/hooks/use-operation-in-progress'

type BuyAndSellCardProps = {
  handleExchangeMode: (mode: ExchangeMode) => void
  exchangeMode: ExchangeMode
}

const BuyAndSellCard = React.memo((props: BuyAndSellCardProps) => {
  const { exchangeMode, handleExchangeMode } = props
  const [amountToBuy, setAmountToBuy] = useState<string>('')
  const [amountToSell, setAmountToSell] = useState<string>('')
  const [stableCoinNeededToBuyMOM, setStableCoinNeededNeededToBuyMOM] = useState<string>('')
  const [stableCoinToReceiveFromMOM, setStableCoinToReceiveFromMOM] = useState<string>('')
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false)
  const { isMobile, isTabletOrMobile } = useMedia()
  const hasHydrated = useHydration()
  const { operationInProgress } = useOperationInProgress()
  const { buyToken, sellToken, getStableCoinNeededToBuyMOM, getStableCoinToReceiveFromMOM } =
    useExchange()

  const fetchStableCoinNeededToBuyMOM = useCallback(async () => {
    if (amountToBuy) {
      const stableCoinNeeded = await getStableCoinNeededToBuyMOM(amountToBuy)
      if (stableCoinNeeded) {
        setStableCoinNeededNeededToBuyMOM(stableCoinNeeded)
      }
    }
  }, [amountToBuy])

  const fetchStableCoinToReceiveFromMOM = useCallback(async () => {
    if (amountToSell) {
      const stableCoinToReceive = await getStableCoinToReceiveFromMOM(amountToSell)
      if (stableCoinToReceive) {
        setStableCoinToReceiveFromMOM(stableCoinToReceive)
      }
    }
  }, [amountToSell])

  useEffect(() => {
    fetchStableCoinNeededToBuyMOM()
  }, [fetchStableCoinNeededToBuyMOM])

  useEffect(() => {
    fetchStableCoinToReceiveFromMOM()
  }, [fetchStableCoinToReceiveFromMOM])

  const isBuyMode = exchangeMode === 'buy'

  const shouldConfirmButtonBeDisabled = () => {
    if (operationInProgress) return true
    if (isBuyMode) {
      if (!amountToBuy) return true
      return MOMToBuyIsLessThanMinimum(amountToBuy)
    } else {
      if (!amountToSell) return true
      return MOMToSellIsLessThanMinimum(amountToSell)
    }
  }

  const handleConfirmation = () => {
    if (isBuyMode) {
      buyToken(amountToBuy, stableCoinNeededToBuyMOM)
    } else {
      sellToken(amountToSell, stableCoinToReceiveFromMOM)
    }
    setShowConfirmationModal(false)
  }

  const handleInputChange = (mask: IMask.InputMask<IMask.AnyMaskedOptions>) => {
    if (isBuyMode) {
      setAmountToBuy(mask.unmaskedValue)
    } else {
      setAmountToSell(mask.unmaskedValue)
    }
  }

  const handleResetInput = () => {
    setAmountToBuy('')
    setAmountToSell('')
    setStableCoinNeededNeededToBuyMOM('')
    setStableCoinToReceiveFromMOM('')
  }

  const content = () => {
    return (
      <FlexBox>
        <FlexBox padding="2rem" paddingBottom={isMobile ? '4rem' : '5rem'} gap="0.5rem">
          {hasHydrated && (
            <AmountInput
              exchangeMode={exchangeMode}
              isMobile={isMobile}
              amountToBuy={amountToBuy}
              amountToSell={amountToSell}
              handleInputChange={handleInputChange}
              handleResetInput={handleResetInput}
            />
          )}

          {(!MOMToBuyIsLessThanMinimum(amountToBuy) ||
            !MOMToSellIsLessThanMinimum(amountToSell)) && (
            <ConversionInfo
              isBuyMode={isBuyMode}
              amount={stableCoinToReceiveFromMOM || stableCoinNeededToBuyMOM}
            />
          )}
        </FlexBox>
        <FlexBox justifyContent="flex-end">
          <Button
            key={exchangeMode + '-confirm'}
            color="primary"
            text="Confirm"
            responsive={false}
            loading={operationInProgress}
            disabled={shouldConfirmButtonBeDisabled()}
            onClick={() => setShowConfirmationModal(true)}
          />
        </FlexBox>
      </FlexBox>
    )
  }

  return (
    <FlexBox>
      <FlexBox
        paddingTop={isTabletOrMobile ? '5vh' : '7vh'}
        paddingRight={isTabletOrMobile ? '5vh' : '7vh'}
        paddingLeft={isTabletOrMobile ? '5vh' : '7vh'}
        paddingBottom={isTabletOrMobile ? '3vh' : '3vh'}
      >
        <BuyAndSellHeader exchangeMode={exchangeMode} handleExchangeMode={handleExchangeMode} />
        {content()}
      </FlexBox>
      {showConfirmationModal && (
        <ConfirmationModal
          visible={showConfirmationModal}
          exchangeMode={exchangeMode}
          MOMAmount={amountToSell || amountToBuy}
          stableCoinAmount={stableCoinToReceiveFromMOM || stableCoinNeededToBuyMOM}
          onConfirm={() => handleConfirmation()}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
    </FlexBox>
  )
})

BuyAndSellCard.displayName = 'BuyAndSellCard'

export { BuyAndSellCard }
