import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { Swap } from './swap'
import { HamburguerIcon } from '../primitives/icons/hamburguer-icon'
import { CloseIcon } from '../primitives/icons/close-icon'
import { MoonIcon } from '../primitives/icons/moon-icon'
import { SunIcon } from '../primitives/icons/sun-icon'
import { SwapProps } from './swap.props'

const meta: Meta<SwapProps> = {
  title: 'Atoms/Swap',
  component: Swap,
}

type SwapStory = Story<SwapProps>

export default meta

export const Rotate: SwapStory = {
  args: {
    rotate: true,
    onElement: <MoonIcon className="h-8 w-8" />,
    offElement: <SunIcon className="h-8 w-8" />,
  },
}

export const Flip: SwapStory = {
  args: {
    flip: true,
    onElement: <HamburguerIcon className="h-8 w-8" />,
    offElement: <CloseIcon className="h-8 w-8" />,
  },
}
