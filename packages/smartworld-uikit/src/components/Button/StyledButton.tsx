import styled, { DefaultTheme } from "styled-components";
import { space, layout, variant } from "styled-system";
import { scaleVariants, styleShape, styleVariants } from "./theme";
import { BaseButtonProps } from "./types";

interface ThemedButtonProps extends BaseButtonProps {
  theme: DefaultTheme;
}

interface TransientButtonProps extends ThemedButtonProps {
  $isLoading?: boolean;
}

const getDisabledStyles = ({ variant, $isLoading, theme }: TransientButtonProps) => {
  if ($isLoading === true) {
    return `
      &:disabled,
      &.pancake-button--disabled {
        cursor: not-allowed;
      }
    `;
  }

  return `
    &:disabled,
    &.pancake-button--disabled {
      background-color: ${variant === "text" ? "transparent" : theme.colors.backgroundDisabled};
      border-color: ${theme.colors.backgroundDisabled};
      box-shadow: none;
      color: ${theme.colors.textDisabled};
      cursor: not-allowed;
    }
  `;
};

/**
 * This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */

const getOpacity = ({ $isLoading = false }: TransientButtonProps) => {
  return $isLoading ? ".5" : "1";
};

const getFontSize = ({ fontSize }: { fontSize?: string | number }) => {
  return fontSize ? fontSize : 16;
};

const getFontWeight = ({ fontWeight }: { fontWeight?: string | number }) => {
  return fontWeight ? fontWeight : 600;
};

const StyledButton = styled.button<BaseButtonProps>`
  align-items: center;
  border: 0;
  box-shadow: 0px -1px 0px 0px rgba(14, 14, 44, 0.4) inset;
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
  transition: background-color 0.2s, opacity 0.2s;

  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {
    opacity: 0.65;
  }

  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }

  ${getDisabledStyles}
  ${variant({
    prop: "scale",
    variants: scaleVariants,
  })}
  ${variant({
    variants: styleVariants,
  })}
  ${variant({
    prop: "shape",
    variants: styleShape,
  })}

  ${layout}
  ${space}

  padding: ${({ variant }) => (variant === "text" ? 0 : undefined)};
`;

export default StyledButton;