import React, { useState } from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'
import { AlertDialog } from './alert-dialog'
import { Button, FlexBox } from '@/components/atoms'
import { AlertDialogProps } from './alert-dialog.props'

const meta: Meta<AlertDialogProps> = {
  title: 'Molecules/AlertDialog',
  component: AlertDialog,
}

type AlertDialogStory = Story<AlertDialogProps>

export default meta

const AlertDialogTemplate: React.FC<AlertDialogProps> = (args) => {
  const [visible, setVisible] = useState<boolean>(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  return (
    <FlexBox>
      <Button onClick={toggleVisible} text={'Open Alert Dialog'} />
      <AlertDialog
        {...args}
        message={'This is a message'}
        title={'This is a title'}
        visible={visible}
        actions={{
          main: {
            color: 'success',
            text: 'OK',
            onPress: () => setVisible(false),
          },
          dismiss: {
            text: 'Cancel',
            onPress: () => setVisible(false),
          },
        }}
      />
    </FlexBox>
  )
}

export const Primary: AlertDialogStory = {
  render: withTemplate(AlertDialogTemplate),
  args: {},
}
