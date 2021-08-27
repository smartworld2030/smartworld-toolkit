import React from "react";
import { useTheme } from "styled-components";
import { Flex, RelativeFlex } from "../Box";
import { CircleSlider } from "../CircleSlider";
import Text from "../Text/Text";
import { StyledButton, StyledFlex } from "./styles";
import { WithdrawCircleProps } from "./types";

const WithdrawCircle: React.FC<WithdrawCircleProps> = ({
  name,
  percent,
  onClick,
  totalValue,
  totalValueUnit,
  buttonProps,
  topElement,
  bottomElement,
  isWarning = false,
  size = 150,
  progressSize,
  borderSize,
  color,
  borderColor,
  progressColor,
  disabled = false,
}) => {
  const { colors } = useTheme();

  const sizeCalc = (divide: number = 1) => (size ? Number(size) : 150) / divide;

  return (
    <CircleSlider
      value={percent}
      size={sizeCalc()}
      progressWidth={progressSize ? progressSize : sizeCalc(30)}
      circleWidth={borderSize ? borderSize : sizeCalc(30)}
      knobRadius={0}
      progressColor={isWarning ? colors.failure : progressColor ? progressColor : colors.primary}
      insideColor={color ? color : colors.input}
      circleColor={isWarning ? colors.failure : borderColor}
      disabled={true}
    >
      <RelativeFlex
        padding={sizeCalc(15)}
        height={sizeCalc()}
        width={sizeCalc()}
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        margin="auto"
      >
        <StyledFlex width={sizeCalc(1.3)}>{topElement && topElement}</StyledFlex>
        <StyledFlex width={sizeCalc(1.3)} overflow="hidden">
          <Flex justifyContent="center">
            <StyledButton
              margin="1px"
              height={sizeCalc(6)}
              width={sizeCalc(1.3)}
              onClick={onClick}
              disabled={disabled}
              {...buttonProps}
            >
              {name ? name : "WITHRAW"}
            </StyledButton>
          </Flex>
          <Flex justifyContent="flex-end" overflow="hidden" height={sizeCalc(15)}>
            <Text color="secondary" fontSize={sizeCalc(15) + "px"} lineHeight="1">
              {totalValue ?? totalValue}
            </Text>
            <Text color="secondary" fontWeight="bold" ml="3px" fontSize={sizeCalc(15) + "px"} lineHeight="1">
              {totalValueUnit ?? totalValueUnit}
            </Text>
          </Flex>
        </StyledFlex>
        <StyledFlex width={sizeCalc(1.3)}>{bottomElement && bottomElement}</StyledFlex>
      </RelativeFlex>
    </CircleSlider>
  );
};

export default WithdrawCircle;
