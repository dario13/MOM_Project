import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MainNavbar } from './main-navbar'

export default {
  title: 'Organisms/MainNavbar',
  component: MainNavbar,
} as ComponentMeta<typeof MainNavbar>

const Template: ComponentStory<typeof MainNavbar> = () => {
  return <MainNavbar />
}

export const Primary = Template.bind({})
Primary.args = {}
