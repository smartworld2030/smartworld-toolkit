import React from 'react'
import styled, { keyframes } from 'styled-components'
import { variant } from 'styled-system'
import { BaseButtonProps } from './types'
import { PayIcon } from '../Svg'
import Button from './Button'
import { scaleVariants } from './theme'

const loadingKey = keyframes`
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`

const StyledPayIcon = styled(PayIcon)`
  position: absolute;
  top: 2%;
  stroke: ${({ theme }) => theme.colors.primary};
`

const StyledButton = styled(Button)`
  position: relative;
  animation: ${({ isLoading }) => (isLoading ? loadingKey : '')} 5s linear infinite;

  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) > svg {
    transform: scale(1.1, 1.1);
  }
`

export const PayButton = (props: BaseButtonProps & { onClick: () => void }): JSX.Element => {
  const size = variant({
    prop: 'scale',
    variants: scaleVariants,
  })

  return (
    <StyledButton shape="circle" {...props}>
      <StyledPayIcon width={size(props).iconSize} />
    </StyledButton>
  )
}
PayButton.defaultProps = {
  scale: 'md',
}

export default PayButton
