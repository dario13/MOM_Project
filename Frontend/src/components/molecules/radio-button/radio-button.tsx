import React from 'react'
import { RadioButtonProps } from './radio-button.props'
import { Card, FlexBox, Radio } from '@/components/atoms'

const RadioButtonComponent: React.FC<RadioButtonProps> = (props: RadioButtonProps) => {
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

RadioButtonComponent.displayName = 'RadioButton'

export const RadioButton = React.memo(RadioButtonComponent)
