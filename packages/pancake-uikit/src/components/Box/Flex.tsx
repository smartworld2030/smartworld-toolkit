import styled from "styled-components";
import { flexbox } from "styled-system";
import Box from "./Box";
import { FlexProps } from "./types";

const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`;

export const FullFlex = styled(Box)<FlexProps>`
  display: flex;
  position: relative;
  height: 100%;
  ${flexbox}
`;

export const AbsoluteFlex = styled(Box)<FlexProps>`
  display: flex;
  position: absolute;
  ${flexbox}
`;

export default Flex;
