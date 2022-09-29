import React, { useState } from 'react'
import { Button, FlexBox, Input, Text } from '@/components/atoms'
import { Divider } from '@/components/atoms/divider'
import { AlertDialog } from '@/components/molecules'
import { useEthPrice } from '@/hooks/use-eth-price'
import { useMedia } from '@/hooks/use-media'
import { convertEthToMom, convertMomToEth } from '@dario13/backend/utils/token-conversion'
import { ExchangeMode } from './exchange-card.props'
import { useExchange } from '@/hooks/use-exchange'

const modalTitle = {
  buy: 'Buy MOM',
  sell: 'Sell MOM',
}

const inputLabel = {
  buy: 'Amount to buy',
  sell: 'Amount to sell',
}

const modalMessage = {
  buy: 'You are about to buy ',
  sell: 'You are about to sell ',
  common1: ' MOM for ',
  common2: ' ETH',
  common3:
    '. This action cannot be undone, clicking on confirm will send the transaction to the blockchain',
}

const minimumToExchangeMessage = {
  buy: 'The minimum amount to buy is: ',
  sell: 'The minimum amount to sell is: ',
}

const maskOptions = {
  buy: {
    mask: '0.0000',
    scale: 4,
    signed: false,
    thousandsSeparator: '',
    radix: '.',
    min: 0.0001,
    max: 1,
    lazy: false,
  },
  sell: {
    mask: Number,
    scale: 0,
    signed: false,
    thousandsSeparator: '',
    radix: '.',
    min: 1,
    max: 100000,
  },
}

const minimumMOMToBuyInETH = 0.0001
const minimumMOMToSell = 1

type BuyAndSellCardProps = {
  handleExchangeMode: (mode: ExchangeMode) => void
}

const BuyAndSellCard = (props: BuyAndSellCardProps) => {
  const [exchangeMode, setExchangeMode] = useState<ExchangeMode>('buy')
  const [amountToBuy, setAmountToBuy] = useState('')
  const [amountToSell, setAmountToSell] = useState('')
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const { isMobile } = useMedia()
  const { ethUsdPrice } = useEthPrice()
  const { buyToken, sellToken, transactionInProgress } = useExchange()
  const isBuyMode = exchangeMode === 'buy'
  const mainColor = isBuyMode ? 'success' : 'error'
  const ethDecimals = minimumMOMToBuyInETH.toString().length - 2

  const momToSellIsLessThanMinimum = () => {
    if (!amountToSell) return
    return Number(amountToSell) < minimumMOMToSell
  }
  const momToBuyIsLessThanMinimum = () => {
    if (!amountToBuy) return
    if (Number(amountToBuy) < minimumMOMToBuyInETH) return true
    return false
  }

  const handleExchangeMode = (mode: ExchangeMode) => {
    setExchangeMode(mode)
    props.handleExchangeMode(mode)
    setAmountToBuy('')
    setAmountToSell('')
  }

  const getModalMessage = () => {
    const momAmount = isBuyMode ? convertEthToMom(amountToBuy) : amountToSell
    const ethAmount = isBuyMode ? amountToBuy : convertMomToEth(amountToSell)

    return (
      modalMessage[exchangeMode] +
      momAmount +
      modalMessage.common1 +
      ethAmount +
      modalMessage.common2 +
      modalMessage.common3
    )
  }

  const handleConfirmation = () => {
    if (isBuyMode) {
      buyToken(amountToBuy)
    } else {
      sellToken(amountToSell)
    }
    setShowConfirmationModal(false)
  }

  const shouldConfirmButtonBeDisabled = () => {
    if (transactionInProgress) return true
    if (isBuyMode) {
      if (!amountToBuy) return true
      return momToBuyIsLessThanMinimum()
    } else {
      if (!amountToSell) return true
      return momToSellIsLessThanMinimum()
    }
  }

  const renderConfirmationModal = () => {
    return (
      <AlertDialog
        visible={showConfirmationModal}
        actions={{
          main: { text: 'I agree', color: mainColor, onPress: () => handleConfirmation() },
          dismiss: { text: 'Cancel', onPress: () => setShowConfirmationModal(false) },
        }}
        title={modalTitle[exchangeMode]}
        message={getModalMessage()}
      />
    )
  }

  const header = () => {
    return (
      <FlexBox flexDirection="column" flex="0">
        <FlexBox flexDirection="row" justifyContent="space-around">
          <Button
            text="Buy"
            size="md"
            color={isBuyMode ? mainColor : 'ghost'}
            onClick={() => handleExchangeMode('buy')}
          />

          <Button
            text="Sell"
            size="md"
            color={isBuyMode ? 'ghost' : mainColor}
            onClick={() => handleExchangeMode('sell')}
          />
        </FlexBox>
        <FlexBox marginTop="-1px">
          <Divider color={mainColor} />
        </FlexBox>
      </FlexBox>
    )
  }

  const amountIsValid = () => {
    if (isBuyMode) {
      return !momToBuyIsLessThanMinimum()
    } else {
      return !momToSellIsLessThanMinimum()
    }
  }

  const renderInput = () => {
    return (
      <>
        <Input
          title={'amount-to-' + exchangeMode}
          label={inputLabel[exchangeMode]}
          size={isMobile ? 'sm' : 'md'}
          suffix={isBuyMode ? 'ETH' : 'MOM'}
          type="text"
          autoComplete="off"
          mask={{
            options: maskOptions[exchangeMode],
            onAccept() {
              setAmountToBuy('')
              setAmountToSell('')
            },
            onComplete(value, mask) {
              if (isBuyMode) {
                setAmountToBuy((Number(mask.unmaskedValue) / 10 ** ethDecimals).toString())
              }
              setAmountToSell(mask.unmaskedValue)
            },
          }}
          color={amountIsValid() ? 'ghost' : 'error'}
        />
        {isBuyMode && momToBuyIsLessThanMinimum() && (
          <Text text={minimumToExchangeMessage.buy + minimumMOMToBuyInETH} />
        )}
        {!isBuyMode && momToSellIsLessThanMinimum() && (
          <Text text={minimumToExchangeMessage.sell + minimumMOMToSell} />
        )}
      </>
    )
  }

  const renderEthToUsd = () => {
    const ethToUsd = Number(amountToBuy) * Number(ethUsdPrice)
    return (
      <FlexBox flexDirection="row" gap="1vh" justifyContent="center">
        <Text text={`1 ETH ≈ USD ${ethUsdPrice}`} />
        <Text text="→" />
        <Text text={`${amountToBuy} ETH ≈ USD ${ethToUsd.toFixed(2)}`} bold />
      </FlexBox>
    )
  }

  const renderAmountToReceive = (amount: string) => {
    return (
      <FlexBox flexDirection="row" gap="1vh" justifyContent="center">
        <Text text="You will receive" />
        <Text text="→" />
        <Text text={amount} bold />
      </FlexBox>
    )
  }

  const renderConversion = () => {
    if (!amountToBuy || Number(amountToBuy) === 0) return null
    return (
      <FlexBox flexDirection="column" gap="1vh">
        {isBuyMode && renderEthToUsd()}
        {isBuyMode
          ? renderAmountToReceive(`${convertEthToMom(amountToBuy)} MOM`)
          : renderAmountToReceive(`${convertMomToEth(amountToSell)} ETH`)}
      </FlexBox>
    )
  }

  const content = () => {
    return (
      <FlexBox flexDirection="column" justifyContent="space-around">
        <FlexBox flexDirection="column" padding={isMobile ? '2vh' : '5vh'} flex="0" gap="1vh">
          {renderInput()}
        </FlexBox>
        {(amountToBuy || amountToSell) && renderConversion()}
        <Button
          color="primary"
          text="Confirm"
          responsive={false}
          loading={transactionInProgress}
          disabled={shouldConfirmButtonBeDisabled()}
          onClick={() => setShowConfirmationModal(true)}
        />
      </FlexBox>
    )
  }

  return (
    <>
      <FlexBox flexDirection="column" padding={isMobile ? '5vh' : '7vh'} width="30vw" height="60vh">
        {header()}
        {content()}
      </FlexBox>
      {renderConfirmationModal()}
    </>
  )
}

BuyAndSellCard.displayName = 'BuyAndSellCard'

export { BuyAndSellCard, minimumMOMToBuyInETH, minimumMOMToSell }
