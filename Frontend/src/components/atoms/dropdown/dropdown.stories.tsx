import React from 'react'
import { Meta, Story } from '@/stories/story-types'
import { withTemplate } from '@/stories/with-template'
import { Dropdown } from './dropdown'
import { FlexBox, Text } from '../primitives'
import { Button } from '../button'
import { Card } from '../card'
import { DropdownProps } from './dropdown.props'

const meta: Meta<DropdownProps> = {
  title: 'Atoms/Dropdown',
  component: Dropdown,
}

type DropdownStory = Story<DropdownProps>

export default meta

const WithMenuTemplate: React.FC<DropdownProps> = (args) => (
  <FlexBox
    alignItems="center"
    justifyContent="center"
    height="100vh"
    width="100%"
    padding="0"
    margin="0"
  >
    <Dropdown
      {...args}
      toggleElement={<Button>Toggle</Button>}
      content={[
        { label: 'Example item 1', onClick: () => ({}) },
        { label: 'Example item 2', onClick: () => ({}) },
        { label: 'Example item 3', color: 'primary', onClick: () => ({}) },
      ]}
    />
  </FlexBox>
)

export const WithMenu: DropdownStory = {
  render: withTemplate(WithMenuTemplate),
  args: {},
}

const WithCardTemplate: React.FC<DropdownProps> = (args) => (
  <FlexBox
    alignItems="center"
    justifyContent="center"
    height="100vh"
    width="100%"
    padding="0"
    margin="0"
  >
    <Dropdown
      {...args}
      toggleElement={<Button>Toggle</Button>}
      content={
        <Card color="secondary">
          <FlexBox gap="0.5rem" width="20rem" padding="1rem">
            <Text size="lg" bold text={'This is an example title inside a Card'} align="center" />
            <Text text={'This is an example text description.'} />
          </FlexBox>
        </Card>
      }
    />
  </FlexBox>
)

export const WithCard: DropdownStory = {
  render: withTemplate(WithCardTemplate),
  args: {},
}
