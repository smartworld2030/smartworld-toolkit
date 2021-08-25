import React, { ReactText } from "react";
import { useTheme } from "styled-components";
import { Flex, FullFlex, AbsoluteFlex } from "../Box";
import { Button } from "../Button";
import { InputGroup } from "../Input";
import { SwapVertIcon } from "../Svg";
import Text from "../Text/Text";
import { StyledBalanceInput, UnitContainer, SwitchUnitsButton, StyledInput, StyledCircleSlider } from "./styles";
import { BalanceInputProps } from "./types";

const BalanceInput: React.FC<BalanceInputProps> = ({
  value,
  balance,
  placeholder = "0.0",
  onUserInput,
  maxButton,
  currencyValue,
  currencyUnit,
  inputProps,
  innerRef,
  isWarning = false,
  decimals = 8,
  unit,
  switchEditingUnits,
  width,
  color,
  knobColor,
  progressColor,
  ...props
}) => {
  const { colors } = useTheme();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      onUserInput(e.currentTarget.value.replace(/,/g, "."));
    }
  };

  const handleChangeRange = (val: any) => {
    onUserInput(percentToValue(val, balance));
  };

  const percentToValue = (val: ReactText, per: ReactText) => ((+val * +per) / 100).toFixed(decimals);

  const valueToPercent = (val: ReactText, max: ReactText) => +((+val / +max) * 100);

  const maxButtonHandler = () => {
    onUserInput(balance.toString());
  };

  const widthCalc = (divide: number = 1) => (width ? Number(width) : 150) / divide;

  return (
    <StyledBalanceInput color="transparent" isWarning={isWarning} width={width} {...props}>
      <FullFlex alignItems="center" flexDirection="column" justifyContent="space-between" pt="7%" pb="7%">
        <UnitContainer zIndex={2} fontWeight="bold" fontSize={widthCalc(11)}>
          {unit}
        </UnitContainer>
        <AbsoluteFlex flexDirection="column" justifyContent="center" left={0} top="40%">
          <InputGroup
            zIndex={2}
            scale="none"
            endIcon={
              switchEditingUnits && (
                <Flex alignItems="center">
                  <SwitchUnitsButton variant="text" height={widthCalc(6.5)} onClick={switchEditingUnits}>
                    <SwapVertIcon color="primary" width={widthCalc(7)} />
                  </SwitchUnitsButton>
                </Flex>
              )
            }
          >
            <StyledInput
              pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
              inputMode="decimal"
              min="0"
              height={widthCalc(6.5)}
              value={value}
              onChange={handleOnChange}
              placeholder={placeholder}
              ref={innerRef}
              {...inputProps}
            />
          </InputGroup>
          <Flex zIndex={2} justifyContent="flex-end">
            <Text color="secondary" fontSize={widthCalc(15)}>
              {currencyValue ?? currencyValue}
            </Text>
            <Text color="secondary" fontWeight="bold" ml="3px" fontSize={widthCalc(15)}>
              {currencyUnit ?? currencyUnit}
            </Text>
          </Flex>
        </AbsoluteFlex>
        {maxButton && (
          <Button
            zIndex={2}
            variant="text"
            fontWeight="bold"
            onClick={maxButtonHandler}
            height={widthCalc(8)}
            fontSize={widthCalc(11)}
          >
            MAX
          </Button>
        )}
      </FullFlex>
      <StyledCircleSlider
        value={valueToPercent(value, balance)}
        size={widthCalc() + 29}
        progressWidth={widthCalc(20)}
        circleWidth={widthCalc(20)}
        knobRadius={widthCalc(12)}
        onInputChange={handleChangeRange}
        knobColor={knobColor ? knobColor : "white"}
        progressColor={progressColor ? progressColor : colors.secondary}
        insideColor={color ? color : colors.input}
      />
    </StyledBalanceInput>
  );
};

export default BalanceInput;
