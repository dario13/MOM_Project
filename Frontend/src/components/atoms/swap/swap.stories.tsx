import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Swap } from './swap'
import { HamburguerIcon } from '../primitives/icons/hamburguer-icon'
import { CloseIcon } from '../primitives/icons/close-icon'
import { MoonIcon } from '../primitives/icons/moon-icon'
import { SunIcon } from '../primitives/icons/sun-icon'

export default {
  title: 'Atoms/Swap',
  component: Swap,
} as ComponentMeta<typeof Swap>

const Template: ComponentStory<typeof Swap> = (args) => <Swap {...args} />

export const Rotate = Template.bind({})
Rotate.args = {
  rotate: true,
  onElement: <MoonIcon className="h-8 w-8" />,
  offElement: <SunIcon className="h-8 w-8" />,
}

export const Flip = Template.bind({})
Flip.args = {
  flip: true,
  onElement: <HamburguerIcon className="h-8 w-8" />,
  offElement: <CloseIcon className="h-8 w-8" />,
}
