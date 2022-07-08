import React from 'react'
import { FlexBoxProps } from './flex-box.props'
import { StyledFlexBox } from './flex-box.styles'

const FlexBox = (props: FlexBoxProps) => {
  const {
    alignItems,
    children,
    className,
    display = 'flex',
    flex,
    flexBasis,
    flexDirection = 'column',
    flexGrow,
    flexShrink,
    flexWrap,
    justifyContent,
    style,
    ref,
    ...rest
  } = props

  return (
    <StyledFlexBox
      display={display}
      alignItems={alignItems}
      flex={flex}
      flexBasis={flexBasis}
      flexDirection={flexDirection}
      flexGrow={flexGrow}
      flexShrink={flexShrink}
      flexWrap={flexWrap}
      justifyContent={justifyContent}
      {...rest}
      className={className}
      data-testid="FlexBox"
      style={style}
      ref={ref}
    >
      {children}
    </StyledFlexBox>
  )
}

FlexBox.displayName = 'FlexBox'

export { FlexBox }
