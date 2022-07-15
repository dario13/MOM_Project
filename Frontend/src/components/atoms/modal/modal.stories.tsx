import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Modal } from './modal'
import { Button } from '@/components/atoms/button'
import { FlexBox } from '@/components/atoms'

export default {
  title: 'Atoms/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => {
  const [visible, setVisible] = useState<boolean>(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  return (
    <FlexBox>
      <Button onClick={toggleVisible} text={'Open Modal'} />
      <Modal {...args} open={visible} onClickBackdrop={toggleVisible}>
        <FlexBox>
          <Button onClick={toggleVisible} text={'Close Modal'} />
        </FlexBox>
      </Modal>
    </FlexBox>
  )
}

export const Primary = Template.bind({})
Primary.args = {}
