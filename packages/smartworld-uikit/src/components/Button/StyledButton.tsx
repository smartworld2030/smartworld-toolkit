import styled, { DefaultTheme } from 'styled-components'
import { space, layout, variant } from 'styled-system'
import { getBoxShadows } from '../../theme/base'
import { scaleVariants, styleShape, styleVariants } from './theme'
import { BaseButtonProps } from './types'

interface ThemedButtonProps extends BaseButtonProps {
  theme: DefaultTheme
}

interface TransientButtonProps extends ThemedButtonProps {
  $isLoading?: boolean
}

const getDisabledStyles = ({ variant: v, $isLoading, theme }: TransientButtonProps) => {
  if ($isLoading === true) {
    return `
      &:disabled,
      &.smartworld-button--disabled {
        cursor: not-allowed;
      }
    `
  }

  return `
    &:disabled,
    &.smartworld-button--disabled {
      background-color: ${v === 'text' ? 'transparent' : theme.colors.backgroundDisabled};
      border-color: ${theme.colors.backgroundDisabled};
      box-shadow: none;
      color: ${theme.colors.textDisabled};
      cursor: not-allowed;
    }
  `
}

/**
 * This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */

const getOpacity = ({ $isLoading = false }: TransientButtonProps) => {
  return $isLoading ? '.5' : '1'
}

const getFontSize = ({ fontSize }: { fontSize?: string | number }) => {
  return fontSize || 16
}

const getFontWeight = ({ fontWeight }: { fontWeight?: string | number }) => {
  return fontWeight || 600
}

const StyledButton = styled.button<BaseButtonProps & { $shadow: number; $shadowSize: number }>`
  align-items: center;
  border: 0;
  z-index: ${({ zIndex }) => zIndex};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: ${getFontSize}px;
  font-weight: ${getFontWeight};
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1.5;
  opacity: ${getOpacity};
  outline: 0;
  transform: translateZ(-1000px);
  transition: background-color 0.2s, opacity 0.2s;
  box-shadow: ${({ $shadow, $shadowSize, theme }) => $shadow && getBoxShadows(theme.colors.primary, $shadowSize || 2)};

  &:hover:not(:disabled):not(.smartworld-button--disabled):not(.smartworld-text):not(:active) {
    filter: saturate(1.5);
  }

  &.smartworld-text:hover {
    text-shadow: ${({ $shadow, $shadowSize, theme }) =>
      $shadow && getBoxShadows(theme.colors.primary, $shadowSize || 2)};
    filter: saturate(1.5);
  }

  &:active:not(:disabled):not(.smartworld-button--disabled) {
    transform: translateY(1px);
    box-shadow: none;
  }

  ${getDisabledStyles}
  ${variant({
    prop: 'scale',
    variants: scaleVariants,
  })}
  ${variant({
    variants: styleVariants,
  })}
  ${variant({
    prop: 'shape',
    variants: styleShape,
  })}

  ${layout}
  ${space}

  ${({ active }) => active && 'filter: saturate(1.5);'}

  border-width: ${({ borderWidth }) => borderWidth}px;
  padding: ${({ variant: v }) => (v === 'text' ? 0 : undefined)};
`

export default StyledButton
