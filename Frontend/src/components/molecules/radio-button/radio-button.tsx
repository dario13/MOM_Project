import React from 'react'
import { RadioButtonProps } from './radio-button.props'
import { Card, FlexBox, Radio } from '@/components/atoms'

const RadioButtonComponent: React.FC<RadioButtonProps> = (props: RadioButtonProps) => {
  const { children, onChange, disabled = false, checked, value, color, name } = props

  const handleClick = () => {
    if (!disabled) {
      onChange(value)
    }
  }

  const cardColor = () => {
    if (disabled) return
    return !checked ? color : 'primary'
  }

  return (
    <FlexBox
      onClick={handleClick}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
      role="container"
    >
      <Card border color={cardColor()}>
        <FlexBox padding="1rem" gap="1rem">
          {children}
          <FlexBox alignItems="center">
            <Radio
              value={value}
              name={name}
              disabled={disabled}
              checked={checked}
              onChange={(e) => onChange(e.target.value)}
            />
          </FlexBox>
        </FlexBox>
      </Card>
    </FlexBox>
  )
}

RadioButtonComponent.displayName = 'RadioButton'

export const RadioButton = React.memo(RadioButtonComponent)
