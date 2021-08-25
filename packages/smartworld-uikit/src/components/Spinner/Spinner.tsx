import React from "react";
import styled, { keyframes } from "styled-components";
import SmartWorldIcon from "./SmartWorldIcon";
import SpinIcon from "./SpinIcon";
import { SpinnerProps } from "./types";

interface RotatingSmartWorld {
  left?: string;
  top?: string;
}

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
    stroke: #fe1d4d;
    stroke-dashoffset: 280;
    transform: rotate(0);
  }
  50% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }
  75% {
    stroke: #19e285;
  }
  100% {
    stroke: #19e285;
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  position: relative;
`;

const RotatingSmartWorldIcon = styled(SmartWorldIcon)<RotatingSmartWorld>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  animation: ${rotateY} 5s linear infinite;
  transform: translate3d(0, 0, 0);
`;

const ProgressingBorder = styled(SpinIcon)`
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
      <RotatingSmartWorldIcon top={`${size * 0.1}px`} left={`${size * 0.1}px`} width={`${size * 0.8}px`} />
      <ProgressingBorder width={`${size}px`} />
    </Container>
  );
};

export default Spinner;
