import React, { useState } from 'react'
import { Meta, Story } from '@/stories/story-types'
import { withTemplate } from '@/stories/with-template'
import { Drawer } from './drawer'
import { Button } from '../button'
import { FlexBox } from '../primitives'
import { DrawerProps } from './drawer.props'

const meta: Meta<DrawerProps> = {
  title: 'Atoms/Drawer',
  component: Drawer,
}

type DrawerStory = Story<DrawerProps>

export default meta

const DrawerTemplate: React.FC<DrawerProps> = (args) => {
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

export const Primary: DrawerStory = {
  render: withTemplate(DrawerTemplate),
  args: {},
}
