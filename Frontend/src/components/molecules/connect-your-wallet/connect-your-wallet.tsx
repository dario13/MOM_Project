import React from 'react'
import { FlexBox, Text } from '@/components/atoms'

const ConnectYourWallet: React.FC = () => {
  return (
    <FlexBox flexDirection="row" alignItems="center" justifyContent="center">
      <Text size="xl" bold align="center" text="Please connect your wallet" />
    </FlexBox>
  )
}

export { ConnectYourWallet }
