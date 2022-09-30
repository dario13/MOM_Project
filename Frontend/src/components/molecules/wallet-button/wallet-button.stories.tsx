import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { WalletButton } from './wallet-button'

export default {
  title: 'Molecules/WalletButton',
  component: WalletButton,
} as ComponentMeta<typeof WalletButton>

const Template: ComponentStory<typeof WalletButton> = () => <WalletButton />

export const Primary = Template.bind({})
Primary.args = {}
