import styled from 'styled-components'
import Input from '../Input/Input'
import Text from '../Text/Text'
import { Button } from '../Button'
import { getTextShadows } from '../../theme/base'

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

export const StyledInput = styled(Input)`
  border-radius: 0;
  box-shadow: none;
  cursor: pointer;
  padding-left: 0;
  padding-right: 0;
  height: ${({ height }) => height}px;
  text-align: center;
  font-size: ${({ height }) => (height ? +height / 2.5 : undefined)}px;
  border: 1px solid ${({ theme, isWarning }) => theme.colors[isWarning ? 'warning' : 'textDisabled']};
  border-radius: ${({ theme }) => theme.radii.default};

  &:placeholder {
    color: ${({ theme }) => theme.colors.primary};
  }
  &:disabled {
    color: ${({ theme }) => theme.colors.contrast};
    cursor: pointer;
  }
  &:focus:not(:disabled) {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.primary};
  }
`
