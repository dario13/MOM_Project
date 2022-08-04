import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Navbar } from './navbar'
import { Button } from '../button'
import { HamburguerIcon } from '../primitives/icons/hamburguer-icon'

export default {
  title: 'Atoms/Navbar',
  component: Navbar,
} as ComponentMeta<typeof Navbar>

const Template: ComponentStory<typeof Navbar> = (args) => {
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

export const Primary = Template.bind({})
Primary.args = {}
