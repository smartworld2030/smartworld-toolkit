import React, { cloneElement } from "react";
import styled from "styled-components";
import Box from "../Box/Box";
import Input from "./Input";
import { InputGroupProps, scales, Scales } from "./types";

const getPadding = (scale: Scales, hasIcon: boolean) => {
  if (!hasIcon) {
    return 0;
  }

  switch (scale) {
    case scales.NONE:
      return "16px";
    case scales.SM:
      return "32px";
    case scales.LG:
      return "56px";
    case scales.MD:
    default:
      return "48px";
  }
};
interface StyledInputGroupProps {
  scale: Scales;
  hasStartIcon: boolean;
  hasEndIcon: boolean;
}

const StyledInputGroup = styled(Box)<StyledInputGroupProps>`
  ${Input} {
    padding-left: ${({ hasStartIcon, scale }) => getPadding(scale, hasStartIcon)};
    padding-right: ${({ hasEndIcon, scale }) => getPadding(scale, hasEndIcon)};
  }
`;

const InputIcon = styled.div<{ scale: Scales; isEndIcon?: boolean }>`
  align-items: center;
  display: flex;
  height: 100%;
  position: absolute;
  top: 0;

  ${({ isEndIcon, scale }) =>
    isEndIcon
      ? `
    right: ${scale === scales.NONE ? 0 : scale === scales.SM ? "8px" : "16px"};
  `
      : `
    left: ${scale === scales.NONE ? 0 : scale === scales.SM ? "8px" : "16px"};
  `}
`;

const InputGroup = ({ scale = scales.MD, startIcon, endIcon, children, ...props }: InputGroupProps): JSX.Element => (
  <StyledInputGroup
    scale={scale}
    width="100%"
    position="relative"
    hasStartIcon={!!startIcon}
    hasEndIcon={!!endIcon}
    {...props}
  >
    {startIcon && <InputIcon scale={scale}>{startIcon}</InputIcon>}
    {cloneElement(children, { scale })}
    {endIcon && (
      <InputIcon scale={scale} isEndIcon>
        {endIcon}
      </InputIcon>
    )}
  </StyledInputGroup>
);

export default InputGroup;
