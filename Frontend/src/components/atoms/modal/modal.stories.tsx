import React, { useState } from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'
import { Modal } from './modal'
import { Button } from '@/components/atoms/button'
import { FlexBox } from '@/components/atoms'
import { ModalProps } from './modal.props'

const meta: Meta<ModalProps> = {
  title: 'Atoms/Modal',
  component: Modal,
}

type ModalStory = Story<ModalProps>

export default meta

const ModalTemplate: React.FC<ModalProps> = (args) => {
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

export const Primary: ModalStory = {
  render: withTemplate(ModalTemplate),
  args: {},
}
