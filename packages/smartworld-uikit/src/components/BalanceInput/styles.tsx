import styled from "styled-components";
import Box from "../Box/Box";
import Input from "../Input/Input";
import Text from "../Text/Text";
import IconButton from "../Button/IconButton";
import { BalanceInputProps } from "./types";

export const SwitchUnitsButton = styled(IconButton)`
  width: ${({ height }) => height}px;
  height: ${({ height }) => height}px;
  border-radius: 0 ${({ theme }) => theme.radii.default} ${({ theme }) => theme.radii.default} 0;
`;

export const UnitContainer = styled(Text)`
  margin-left: 4px;
  text-align: right;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
`;

export const StyledBalanceInput = styled(Box)<{ isWarning: BalanceInputProps["isWarning"] }>`
  background-color: ${({ theme }) => theme.colors.input};
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 50%;
  width: ${({ width }) => (width ? width : 150)}px;
  height: ${({ width }) => (width ? width : 150)}px;
  box-shadow: ${({ theme, isWarning }) => theme.shadows[isWarning ? "warning" : "inset"]};
  padding: 8px 16px;
  user-select: none;
`;

export const StyledInput = styled(Input)`
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  padding-left: 0;
  padding-right: 0;
  height: ${({ height }) => height}px;
  text-align: center;
  font-size: ${({ height }) => (height ? +height / 2 : undefined)}px;
  border: 1px solid ${({ theme, isWarning }) => theme.colors[isWarning ? "warning" : "textDisabled"]};
  border-radius: ${({ theme }) => theme.radii.default};

  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }

  &:focus:not(:disabled) {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.primary};
  }
`;
