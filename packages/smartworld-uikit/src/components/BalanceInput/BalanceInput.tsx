import React from "react";
import { Flex, FullFlex, AbsoluteFlex } from "../Box";
import { Button } from "../Button";
import { InputGroup } from "../Input";
import { SwapVertIcon } from "../Svg";
import Text from "../Text/Text";
import { StyledBalanceInput, UnitContainer, SwitchUnitsButton, StyledInput } from "./styles";
import { BalanceInputProps } from "./types";

const BalanceInput: React.FC<BalanceInputProps> = ({
  value,
  placeholder = "0.0",
  onUserInput,
  maxButton,
  currencyValue,
  currencyUnit,
  inputProps,
  innerRef,
  isWarning = false,
  decimals = 18,
  unit,
  switchEditingUnits,
  ...props
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      onUserInput(e.currentTarget.value.replace(/,/g, "."));
    }
  };
  const widthCalc = (divide: number) => {
    const width = props.width ? Number(props.width) : 150;
    return width / divide;
  };
  console.log(unit);
  return (
    <StyledBalanceInput isWarning={isWarning} {...props}>
      <FullFlex alignItems="center" flexDirection="column" justifyContent="space-between" pt="7%" pb="7%">
        <UnitContainer fontWeight="bold" fontSize={widthCalc(12)}>
          {unit}
        </UnitContainer>
        <AbsoluteFlex flexDirection="column" justifyContent="center" left={0} top="40%">
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
              value={value}
              onChange={handleOnChange}
              placeholder={placeholder}
              ref={innerRef}
              {...inputProps}
            />
          </InputGroup>
          <Flex justifyContent="flex-end">
            <Text color="secondary" fontSize={widthCalc(15)}>
              {currencyValue ?? currencyValue}
            </Text>
            <Text color="secondary" fontWeight="bold" ml="3px" fontSize={widthCalc(15)}>
              {currencyUnit ?? currencyUnit}
            </Text>
          </Flex>
        </AbsoluteFlex>
        <Flex>
          {maxButton && (
            <Button variant="text" fontWeight="bold" height={widthCalc(8)} fontSize={widthCalc(12)}>
              MAX
            </Button>
          )}
        </Flex>
      </FullFlex>
    </StyledBalanceInput>
  );
};

export default BalanceInput;
