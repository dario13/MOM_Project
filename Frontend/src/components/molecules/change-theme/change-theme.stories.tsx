import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ChangeTheme } from './change-theme'

export default {
  title: 'Molecules/ChangeTheme',
  component: ChangeTheme,
} as ComponentMeta<typeof ChangeTheme>

const Template: ComponentStory<typeof ChangeTheme> = () => {
  return <ChangeTheme />
}

export const Primary = Template.bind({})
Primary.args = {}
