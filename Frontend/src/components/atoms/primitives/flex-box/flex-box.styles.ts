import styled from 'styled-components'
import { FlexBoxProps } from './flex-box.props'

export const StyledFlexBox = styled.div<Omit<FlexBoxProps, 'children' | 'className'>>`
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  flex-wrap: ${(props) => props.flexWrap};
  align-items: ${(props) => props.alignItems};
  flex-grow: ${(props) => props.flexGrow};
  flex-shrink: ${(props) => props.flexShrink};
  flex-basis: ${(props) => props.flexBasis};
  flex: ${(props) => props.flex};
  padding: ${(props) => `p-4`};
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  max-width: ${(props) => props.maxWidth};
  max-height: ${(props) => props.maxHeight};
  gap: ${(props) => props.gap};
`
