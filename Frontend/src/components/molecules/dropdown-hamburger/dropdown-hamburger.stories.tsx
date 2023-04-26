import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'
import { DropdownHamburger } from './dropdown-hamburger'
import { DropdownHamburgerProps } from './dropdown-hamburger.props'

const meta: Meta<DropdownHamburgerProps> = {
  title: 'Molecules/DropdownHamburger',
  component: DropdownHamburger,
}

type DropdownHamburgerStory = Story<DropdownHamburgerProps>

export default meta

const DropdownHamburgerTemplate: React.FC<DropdownHamburgerProps> = (args) => (
  <DropdownHamburger {...args} />
)

export const Primary: DropdownHamburgerStory = {
  render: withTemplate(DropdownHamburgerTemplate),
  args: {
    menuItems: [
      { label: 'Example item 1', onClick: () => ({}) },
      { label: 'Example item 2', onClick: () => ({}) },
      { label: 'Example item 3', onClick: () => ({}) },
      { label: 'Example item 4', onClick: () => ({}) },
    ],
  },
}
