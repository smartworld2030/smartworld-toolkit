import React from "react";
import styled, { keyframes } from "styled-components";
import SmartWorldIcon from "./SmartWorldIcon";
import PancakeIcon from "./PancakeIcon";
import { SpinnerProps } from "./types";

const rotateY = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`;
const rotateZ = keyframes`
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
`;

const loading = keyframes`
  0%, 25% {
    stroke: #19e285;
    stroke-dashoffset: 280;
    transform: rotate(0);
  }
  50%, 75% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }
  100% {
    stroke: #fe1d4d;
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
`;

const progress = keyframes`
  0% {
    stroke-dashoffset: 75;
    opacity: 0.1;
  }
  100% {
    stroke-dashoffset: 285;
    opacity: 1;
  }
`;

const Container = styled.div`
  position: relative;
`;

const RotatingSmartWorldIcon = styled(SmartWorldIcon)`
  position: absolute;
  top: 0;
  left: 0;
  animation: ${rotateY} 5s linear infinite;
  transform: translate3d(0, 0, 0);
`;

const ProgressingBorder = styled(PancakeIcon)`
  stroke-linecap: round;
  animation: 2s linear infinite both ${rotateZ};
  & > circle {
    animation: 2s ease-in-out infinite both ${loading};
    transform-origin: 50% 50%;
  }
`;

const Spinner: React.FC<SpinnerProps> = ({ size = 128 }) => {
  return (
    <Container>
      <RotatingSmartWorldIcon width={`${size}px`} />
      <ProgressingBorder width={`${size}px`} />
    </Container>
  );
};

export default Spinner;
