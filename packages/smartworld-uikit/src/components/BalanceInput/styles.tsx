import styled from 'styled-components'
import Box from '../Box/Box'
import Input from '../Input/Input'
import Text from '../Text/Text'
import { BalanceInputProps } from './types'
import CircleSlider from '../CircleSlider/CircleSlider'
import { Button } from '../Button'
import { getTextShadows } from '../../theme/base'

const calcPadding = (width?: any) => {
  const p = width ? +width / 10 : 16
  return `${p / 2}px ${p}px`
}

const calcWidth = (width?: any, allowedMin = 0) => {
  const w = width ? +width - allowedMin : 150
  return `${w > 100 ? w : 100}px`
}

export const SwitchUnitsButton = styled(Button)`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: ${({ theme, endIcon }) =>
    endIcon
      ? `0 ${theme.radii.default} ${theme.radii.default} 0`
      : `${theme.radii.default} 0 0 ${theme.radii.default}`};
`

export const ShadowedText = styled(Text)<{ shadowSize?: number }>`
  text-shadow: ${({ theme, shadowSize }) => getTextShadows(theme.colors.background, shadowSize || 1)};
}`

export const ShadowedButton = styled(Button)<{ shadowSize?: number }>`
  text-shadow: ${({ theme, shadowSize }) => getTextShadows(theme.colors.background, shadowSize || 1)};
}`

export const UnitContainer = styled(Text)<{ shadowSize?: number }>`
  text-align: center;
  text-shadow: ${({ theme, shadowSize }) => getTextShadows(theme.colors.background, shadowSize || 1)};
  color: ${({ theme }) => theme.colors.text};
  z-index: ${({ zIndex }) => zIndex};
  white-space: nowrap;
`

export const StyledCircleSlider = styled(CircleSlider)`
  user-select: none;
  touch-action: none;
  z-index: 1;
}`

export const StyledInput = styled(Input)`
  padding-left: 0;
  padding-right: 0;
  box-shadow: none;
  height: ${({ height }) => height}px;
  text-align: center;
  font-size: ${({ height }) => (height ? +height / 2.5 : undefined)}px;
  border: 1px solid ${({ theme, isWarning }) => theme.colors[isWarning ? 'warning' : 'textDisabled']};
  border-radius: ${({ theme }) => theme.radii.default};

  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }

  &:focus:not(:disabled) {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.primary};
  }
`

export const StyledBalanceInput = styled(Box)<{ isWarning: BalanceInputProps['isWarning'] }>`
  position: relative;
  background-color: ${({ theme, color }) => color || theme.colors.input};
  border-radius: 50%;
  width: ${({ width }) => calcWidth(width)};
  height: ${({ width }) => calcWidth(width)};
  min-width: ${({ width }) => calcWidth(width, 50)};
  min-height: ${({ width }) => calcWidth(width, 50)};
  padding: ${({ width }) => calcPadding(width)};
`
