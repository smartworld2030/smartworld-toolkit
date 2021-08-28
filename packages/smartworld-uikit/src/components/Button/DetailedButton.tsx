import React, { ReactNode } from "react";
import styled from "styled-components";
import { Flex } from "../Box";
import { Text } from "../Text";
import { StyledFlex } from "../WidthrawCircle/styles";
import { ButtonProps } from "./types";
import Button from "./Button";
import { scaleVariants } from "./theme";

const StyledFlexText = styled(StyledFlex)`
  line-height: 1;
  text-shadow: ${({ theme }) => theme.textShadows.inset};
`;

interface DetailedButtonProps extends ButtonProps {
  top?: ReactNode;
  bottom?: ReactNode;
  topFontSize?: string;
  bottomFontSize?: string;
}

export const DetailedButton: React.FC<DetailedButtonProps> = ({
  fontSize,
  top,
  bottom,
  children,
  width,
  scale = "md",
  topFontSize,
  bottomFontSize,
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
    <Button width={sizeCalc()} height={sizeCalc()} {...rest}>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        margin="auto"
        height={sizeCalc(1.2)}
        width={sizeCalc()}
      >
        <StyledFlexText width={sizeCalc(1.3)} fontSize={topFontSize ? topFontSize : sizeCalc(6)}>
          {top && top}
        </StyledFlexText>
        <StyledFlexText width={sizeCalc(1.3)}>
          <Text fontSize={fontSize ? fontSize : sizeCalc(4.5)} fontWeight="bold" lineHeight="1">
            {children}
          </Text>
        </StyledFlexText>
        <StyledFlexText width={sizeCalc(1.3)} fontSize={bottomFontSize ? bottomFontSize : sizeCalc(6)}>
          {bottom && bottom}
        </StyledFlexText>
      </Flex>
    </Button>
  );
};
export default DetailedButton;
