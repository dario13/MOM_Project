import React from 'react'
import { AlertDialog } from '@/components/molecules'
import { ExchangeMode } from '../exchange-card.props'
import { modalTitle, modalMessage } from './buy-and-sell-constants'

type ConfirmationModalProps = {
  visible: boolean
  exchangeMode: ExchangeMode
  MOMAmount: string
  stableCoinAmount: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  exchangeMode,
  MOMAmount,
  stableCoinAmount,
  onConfirm,
  onCancel,
}) => {
  const isBuyMode = exchangeMode === 'buy'
  const mainColor = isBuyMode ? 'success' : 'error'

  const getModalMessage = () => {
    return (
      modalMessage[exchangeMode] +
      MOMAmount +
      modalMessage.common1 +
      stableCoinAmount +
      modalMessage.common2 +
      modalMessage.common3
    )
  }

  return (
    <AlertDialog
      visible={visible}
      actions={{
        main: { text: 'I agree', color: mainColor, onPress: onConfirm },
        dismiss: { text: 'Cancel', onPress: onCancel },
      }}
      title={modalTitle[exchangeMode]}
      message={getModalMessage()}
    />
  )
}

export default React.memo(ConfirmationModal)
