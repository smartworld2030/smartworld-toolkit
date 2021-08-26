import styled from "styled-components";
import { flexbox } from "styled-system";
import Box from "./Box";
import { FlexProps } from "./types";

const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`;

export const RelativeFlex = styled(Box)<FlexProps>`
  position: relative;
  display: flex;
  text-align: center;
  user-select: none;
  ${flexbox}
`;

export const FullFlex = styled(Box)<FlexProps>`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  ${flexbox}
`;

export const AbsoluteFlex = styled(Box)<FlexProps>`
  display: flex;
  position: absolute;
  ${flexbox}
`;

export default Flex;
