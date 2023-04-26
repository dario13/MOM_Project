import React from 'react'
import { RadioCardButtonProps } from './card-radio-button.props'
import { Card, FlexBox, Radio } from '@/components/atoms'

const RadioCardButtonComponent: React.FC<RadioCardButtonProps> = (props: RadioCardButtonProps) => {
  const { children, onChange, disabled, checked, value, color } = props

  return (
    <FlexBox onClick={() => onChange(value)} style={{ cursor: 'pointer' }} role="container">
      <Card border color={!checked ? color : 'primary'}>
        <FlexBox padding="1rem" gap="1rem">
          {children}
          <FlexBox alignItems="center">
            <Radio value={value} disabled={disabled} checked={checked} onChange={() => ({})} />
          </FlexBox>
        </FlexBox>
      </Card>
    </FlexBox>
  )
}

RadioCardButtonComponent.displayName = 'RadioCard'

export const RadioCardButton = React.memo(RadioCardButtonComponent)
