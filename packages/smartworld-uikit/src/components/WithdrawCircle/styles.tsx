import styled from 'styled-components'
import { variant } from 'styled-system'
import { Flex } from '../Box'
import Box from '../Box/Box'
import Text from '../Text/Text'
import Button from '../Button/Button'
import { WithdrawCircleProps } from './types'
import { styleVariants } from '../Button/theme'

const calcPadding = (width?: any) => {
  const p = width ? +width / 10 : 16
  return `${p / 2}px ${p}px`
}

const calcWidth = (width?: any, allowedMin = 0) => {
  const w = width ? +width - allowedMin : 150
  return `${w > 100 ? w : 100}px`
}

export const StyledFlex = styled(Flex)<{ fontSize?: string }>`
  flex: 4;
  flex-direction: column;
  text-align: center;
  overflow: hidden;
  font-size: ${({ fontSize }) => fontSize};
`

export const WithdrawUnitContainer = styled(Text)`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  z-index: ${({ zIndex }) => zIndex};
  white-space: nowrap;
`

export const StyledWithdrawCircle = styled(Box)<{ isWarning: WithdrawCircleProps['isWarning'] }>`
  position: relative;
  background-color: ${({ theme, color }) => color || theme.colors.tertiary};
  border-radius: 50%;
  width: ${({ width }) => calcWidth(width)};
  height: ${({ width }) => calcWidth(width)};
  min-width: ${({ width }) => calcWidth(width, 50)};
  min-height: ${({ width }) => calcWidth(width, 50)};
  padding: ${({ width }) => calcPadding(width)};
`

export const StyledButton = styled(Button)`
  padding-left: 0;
  padding-right: 0;
  height: ${({ height }) => height}px;
  text-align: center;
  font-size: ${({ height }) => (height ? +height / 2.5 : undefined)}px;

  ${variant({
    variants: styleVariants,
  })}

  ${({ height }) => height && height < 50 && 'border-width: 1px'};
  color: ${({ color }) => color ?? color};
  background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.colors.input};

  &:focus:not(:disabled) {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.primary};
  }
`
