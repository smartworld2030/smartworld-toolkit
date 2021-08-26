import styled from "styled-components";
import { background, border, layout, position, space } from "styled-system";
import { BoxProps } from "./types";

const Box = styled.div<BoxProps>`
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
  color:${({ color, theme }) => (color ? color : theme.colors.text)}
`;

export const ClearBox = styled.div<BoxProps>`
  ${border}
  ${layout}
  ${position}
  ${space}
`;

export default Box;
