import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AlertDialog } from './alert-dialog'
import { Button, FlexBox } from '@/components/atoms'

export default {
  title: 'Molecules/AlertDialog',
  component: AlertDialog,
} as ComponentMeta<typeof AlertDialog>

const Template: ComponentStory<typeof AlertDialog> = (args) => {
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

export const Primary = Template.bind({})
Primary.args = {}

// export const Secondary = () => <AlertDialog />;
