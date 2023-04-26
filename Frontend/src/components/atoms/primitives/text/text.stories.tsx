import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'
import { Text } from './text'
import { TextProps } from './text.props'

const meta: Meta<TextProps> = {
  title: 'Atoms/Primitives/Text',
  component: Text,
}

type TextStory = Story<TextProps>

export default meta

const SimpleTextTemplate: React.FC<TextProps> = (args) => <Text {...args} />

export const Primary: TextStory = {
  render: withTemplate(SimpleTextTemplate),
  args: {
    size: 'lg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut augue leo, venenatis eu turpis nec, tincidunt maximus tortor. Donec suscipit hendrerit orci, et fringilla purus imperdiet sed. Pellentesque mattis dictum dui, at egestas massa fermentum sed      Phasellus sed ante at quam faucibus sodales at vitae risus. Suspendisse tempor, urna eget hendrerit tempor, magna nisl malesuada erat, vel tempus est turpis eget erat. Aenean sollicitudin, sapien eget rutrum placerat, libero urna dignissim nulla, quis condimentum lectus erat at elit. Integer in orci imperdiet, maximus ipsum eget, finibus metus. Fusce vestibulum, sem nec maximus consectetur, ipsum dolor sagittis augue, vel pulvinar enim turpis pretium arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In hac habitasse platea dictumst. Etiam euismod purus vel justo pharetra facilisis. Aliquam imperdiet ante nulla.',
  },
}

const CompositeTextTemplate: React.FC = (args) => (
  <>
    <Text {...args}>
      <Text text="A text example. " />
      <Text text="Another text" />
    </Text>
  </>
)

export const Composite: TextStory = {
  render: withTemplate(CompositeTextTemplate),
  args: {
    align: 'center',
    size: 'md',
  },
}
