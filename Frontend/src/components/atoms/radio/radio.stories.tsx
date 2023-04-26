import React from 'react'
import { Radio } from './radio'
import { RadioProps } from './radio.props'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'

const meta: Meta<RadioProps> = {
  title: 'Atoms/Radio',
  component: Radio,
}

type RadioStory = Story<RadioProps>

const RadioTemplate: React.FC<RadioProps> = (args) => (
  <form>
    <Radio {...args} />
    <Radio {...args} /> <Radio {...args} checked />
  </form>
)

export const Primary: RadioStory = {
  render: withTemplate(RadioTemplate),
  args: {
    value: 'example',
    color: 'primary',
    size: 'md',
  },
}

export const Secondary: RadioStory = {
  render: withTemplate(RadioTemplate),
  args: {
    value: 'example',
    color: 'secondary',
    size: 'md',
  },
}

export const Large: RadioStory = {
  render: withTemplate(RadioTemplate),
  args: {
    value: 'example',
    color: 'primary',
    size: 'lg',
  },
}

export const Small: RadioStory = {
  render: withTemplate(RadioTemplate),
  args: {
    value: 'example',
    color: 'primary',
    size: 'sm',
  },
}

export default meta
