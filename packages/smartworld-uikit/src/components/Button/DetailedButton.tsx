import React, { ReactNode } from "react";
import styled from "styled-components";
import { Text } from "../Text";
import { StyledFlex } from "../WithdrawCircle/styles";
import { ButtonProps, Variant } from "./types";
import Button from "./Button";
import { scaleVariants } from "./theme";

const StyledFlexText = styled(StyledFlex)<{ color?: Variant | string }>`
  line-height: 1;
  color: ${({ color }) => color};
  text-shadow: ${({ theme }) => theme.textShadows.inset};
`;

interface DetailedButtonProps extends ButtonProps {
  backgroundColor?: string;
  topIcon?: ReactNode;
  bottomIcon?: ReactNode;
  topFontSize?: string;
  bottomFontSize?: string;
}

export const DetailedButton: React.FC<DetailedButtonProps> = ({
  fontSize,
  topIcon,
  bottomIcon,
  children,
  width,
  scale = "md",
  topFontSize,
  bottomFontSize,
  variant,
  ...rest
}) => {
  const sizeCalc = (divide: number = 1) => {
    if (!width) {
      const scales = scaleVariants[scale].height.split("px");
      return +scales[0] / divide + "px";
    }
    return +width / divide + "px";
  };
  return (
    <Button scale={scale} variant={variant} width={sizeCalc()} height={sizeCalc()} {...rest}>
      <StyledFlexText color={variant} width={sizeCalc(1.3)} fontSize={topFontSize && topFontSize}>
        {topIcon && topIcon}
      </StyledFlexText>
      <StyledFlexText color={variant} width={sizeCalc(1.3)}>
        <Text color={variant} fontSize={fontSize && fontSize} fontWeight="bold" lineHeight="1">
          {children}
        </Text>
      </StyledFlexText>
      <StyledFlexText color={variant} width={sizeCalc(1.3)} fontSize={bottomFontSize && bottomFontSize}>
        {bottomIcon && bottomIcon}
      </StyledFlexText>
    </Button>
  );
};
export default DetailedButton;
