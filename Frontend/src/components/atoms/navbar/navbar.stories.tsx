import React from 'react'
import { Meta, Story } from '@/stories/story-types'
import { withTemplate } from '@/stories/with-template'
import { Navbar } from './navbar'
import { Button } from '../button'
import { HamburguerIcon } from '../primitives/icons/hamburguer-icon'
import { NavbarProps } from './navbar.props'

const meta: Meta<NavbarProps> = {
  title: 'Atoms/Navbar',
  component: Navbar,
}

type NavbarStory = Story<NavbarProps>

export default meta

const NavbarTemplate: React.FC<NavbarProps> = (args) => {
  return (
    <Navbar
      {...args}
      left={
        <Button shape="square" color="ghost">
          {<HamburguerIcon />}
        </Button>
      }
      center={<Button>Another button</Button>}
      right={<Button>Get started</Button>}
    />
  )
}

export const Primary: NavbarStory = {
  render: withTemplate(NavbarTemplate),
  args: {},
}
