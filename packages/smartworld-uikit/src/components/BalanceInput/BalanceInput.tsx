import React, { ReactText } from "react";
import { useTheme } from "styled-components";
import { AbsoluteFlex, Flex, RelativeFlex } from "../Box";
import { Button } from "../Button";
import { InputGroup } from "../Input";
import { SwapVertIcon } from "../Svg";
import Text from "../Text/Text";
import { UnitContainer, SwitchUnitsButton, StyledInput, StyledCircleSlider } from "./styles";
import { BalanceInputProps } from "./types";

const BalanceInput: React.FC<BalanceInputProps> = ({
  value,
  maxValue = "0",
  placeholder = "0.0",
  onUserInput,
  onUnitClick,
  currencyValue,
  currencyUnit,
  inputProps,
  innerRef,
  isWarning = false,
  decimals = 8,
  unit,
  switchEditingUnits,
  width = 150,
  progressSize,
  borderSize,
  knobSize,
  color,
  knobColor,
  borderColor,
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
    onUserInput(percentToValue(val, maxValue));
  };

  const percentToValue = (val: ReactText, per: ReactText = 0) => ((+val * +per) / 100).toFixed(decimals);

  const valueToPercent = () => +((+value / +maxValue) * 100);

  const maxButtonHandler = () => {
    if (maxValue) onUserInput(maxValue.toString());
  };

  const widthCalc = (divide: number = 1, minus: number = 0) => (width ? Number(width) : 150) / divide - minus;

  return (
    <RelativeFlex width={width} height={width} {...props}>
      <RelativeFlex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        width={widthCalc(3)}
        margin="auto"
        height={widthCalc(1.7)}
      >
        <AbsoluteFlex top={-widthCalc(15) + "px"}>
          <UnitContainer onClick={onUnitClick} zIndex={2} fontWeight="bold" fontSize={widthCalc(12)}>
            {unit}
          </UnitContainer>
        </AbsoluteFlex>
        <AbsoluteFlex top={widthCalc(5) + "px"} width={widthCalc(1.4)}>
          <Flex zIndex={2} flexDirection="column" justifyContent="center">
            <InputGroup
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
                value={value ? value : ""}
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
          </Flex>
        </AbsoluteFlex>
        {maxValue && (
          <AbsoluteFlex bottom={-widthCalc(15) + "px"}>
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
          </AbsoluteFlex>
        )}
      </RelativeFlex>
      <StyledCircleSlider
        value={valueToPercent()}
        size={widthCalc()}
        progressWidth={progressSize ? progressSize : widthCalc(30)}
        circleWidth={borderSize ? borderSize : widthCalc(30)}
        knobRadius={knobSize ? knobSize : widthCalc(15)}
        onInputChange={handleChangeRange}
        knobColor={knobColor ? knobColor : "white"}
        progressColor={progressColor ? progressColor : colors.secondary}
        insideColor={color ? color : colors.input}
        circleColor={borderColor}
      />
    </RelativeFlex>
  );
};

export default BalanceInput;
