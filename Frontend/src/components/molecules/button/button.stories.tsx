import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from './button'
import { WalletIcon } from '@/components/atoms/icons/wallet-icon'

export default {
  title: 'Molecules/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <div>
    <Button {...args} />
  </div>
)

export const Primary = Template.bind({})
Primary.args = {
  text: 'Wallet',
  startIcon: <WalletIcon />,
}
