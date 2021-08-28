import styled from "styled-components";
import { Flex } from "../Box";
import Box from "../Box/Box";
import Button from "../Button/Button";
import Text from "../Text/Text";
import { WithdrawCircleProps } from "./types";

export const StyledFlex = styled(Flex)<{ fontSize?: string }>`
  flex: 4;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  font-size: ${({ fontSize }) => fontSize};
`;
export const WithdrawUnitContainer = styled(Text)`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  z-index: ${({ zIndex }) => zIndex};
  white-space: nowrap;
`;

export const StyledWithdrawCircle = styled(Box)<{ isWarning: WithdrawCircleProps["isWarning"] }>`
  position: relative;
  background-color: ${({ theme, color }) => (color ? color : theme.colors.input)};
  border-radius: 50%;
  width: ${({ width }) => calcWidth(width)};
  height: ${({ width }) => calcWidth(width)};
  min-width: ${({ width }) => calcWidth(width, 50)};
  min-height: ${({ width }) => calcWidth(width, 50)};
  padding: ${({ width }) => calcPadding(width)};
`;

export const StyledButton = styled(Button)`
  background: transparent;
  box-shadow: none;
  padding-left: 0;
  padding-right: 0;
  height: ${({ height }) => height}px;
  text-align: center;
  font-size: ${({ height }) => (height ? +height / 2.5 : undefined)}px;
  border: 1px solid ${({ theme, isWarning }) => theme.colors[isWarning ? "warning" : "textDisabled"]};
  border-radius: ${({ theme }) => theme.radii.default};
  color: ${({ theme }) => theme.colors.text};

  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }

  &:focus:not(:disabled) {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.primary};
  }
`;

const calcPadding = (width?: any) => {
  const p = width ? +width / 10 : 16;
  return `${p / 2}px ${p}px`;
};

const calcWidth = (width?: any, allowedMin: number = 0) => {
  const w = width ? +width - allowedMin : 150;
  return `${w > 100 ? w : 100}px`;
};
