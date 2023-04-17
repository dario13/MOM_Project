import React from 'react'
import { Meta, Story } from '@/stories/story-types'
import { Button } from './button'
import { WalletIcon } from '@/components/atoms/primitives/icons/wallet-icon'
import { ButtonProps } from './button.props'

const meta: Meta<ButtonProps> = {
  title: 'Atoms/Button',
  component: Button,
}

type ButtonStory = Story<ButtonProps>

export const Primary: ButtonStory = {
  args: {
    color: 'secondary',
    text: 'Button',
    startIcon: <WalletIcon />,
  },
}
export default meta
