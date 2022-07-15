import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DropdownHamburger } from './dropdown-hamburger'

export default {
  title: 'Molecules/DropdownHamburger',
  component: DropdownHamburger,
} as ComponentMeta<typeof DropdownHamburger>

const Template: ComponentStory<typeof DropdownHamburger> = (args) => <DropdownHamburger {...args} />

export const Primary = Template.bind({})
Primary.args = {
  menuItems: [
    { label: 'Example item 1', onClick: () => ({}) },
    { label: 'Example item 2', onClick: () => ({}) },
    { label: 'Example item 3', onClick: () => ({}) },
    { label: 'Example item 4', onClick: () => ({}) },
  ],
}
