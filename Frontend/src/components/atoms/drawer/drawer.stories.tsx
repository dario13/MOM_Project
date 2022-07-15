import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Drawer } from './drawer'
import { Button } from '../button'
import { FlexBox } from '../primitives'

export default {
  title: 'Atoms/Drawer',
  component: Drawer,
} as ComponentMeta<typeof Drawer>

const Template: ComponentStory<typeof Drawer> = (args) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }
  return (
    <Drawer {...args} open={visible} onClickOverlay={toggleVisible}>
      <FlexBox justifyContent="center" alignItems="center" height="100%">
        <Button color="primary" onClick={toggleVisible} text="Open drawer" />
      </FlexBox>
    </Drawer>
  )
}

export const Primary = Template.bind({})
Primary.args = {}
