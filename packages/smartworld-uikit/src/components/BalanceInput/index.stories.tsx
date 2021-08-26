import React, { useState } from "react";
import Box from "../Box/Box";
import BalanceInput from "./BalanceInput";

export default {
  title: "Components/BalanceInput",
  component: BalanceInput,
  argTypes: {},
};

export const Default: React.FC = () => {
  const STTS_PRICE = 1.26;
  const [decimalValue, setDecimalValue] = useState(1.43333);
  const [numericValue, setNumericValue] = useState(5);
  const [editingUnit, setEditingUnit] = useState<"STTS" | "USD">("STTS");
  const [values, setValues] = useState({
    STTS: "",
    USD: "",
  });
  const conversionUnit = editingUnit === "STTS" ? "USD" : "STTS";

  const currencyValue = (input: number) => {
    return `~${(input * 1.3).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} USD`;
  };

  const currencyValues = !Number.isNaN(parseFloat(values[conversionUnit]))
    ? "~" +
      parseFloat(values[conversionUnit]).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";
  const handleDecimalChange = (input) => {
    setDecimalValue(input);
  };

  const handleNumericChange = (input) => {
    setNumericValue(input);
  };

  const handleSTTSChange = (input: string) => {
    const inputAsFloat = parseFloat(input);
    if (editingUnit !== "USD") {
      setValues({
        STTS: input,
        USD: Number.isNaN(inputAsFloat) ? "" : `${inputAsFloat * STTS_PRICE}`,
      });
    } else {
      setValues({
        STTS: Number.isNaN(inputAsFloat) ? "" : `${inputAsFloat / STTS_PRICE}`,
        USD: input,
      });
    }
  };

  const switchEditingUnits = () => {
    const editingUnitAfterChange = editingUnit === "STTS" ? "USD" : "STTS";
    // This is needed to persist same value as shown for currencyValue after switching
    // otherwise user will see lots of decimals
    const valuesAfterChange = { ...values };
    valuesAfterChange[editingUnitAfterChange] = !Number.isNaN(parseFloat(values[conversionUnit]))
      ? parseFloat(values[conversionUnit]).toFixed(2)
      : "0.00";
    setValues(valuesAfterChange);
    setEditingUnit(editingUnitAfterChange);
  };

  return (
    <Box width="300px">
      <BalanceInput
        value={values[editingUnit]}
        maxValue={1006.086957}
        onUserInput={handleSTTSChange}
        unit={<div>{editingUnit}</div>}
        onUnitClick={() => console.log("object")}
        currencyValue={currencyValues}
        currencyUnit={conversionUnit}
        placeholder={"1006.086957"}
        width={200}
        knobSize={10}
        borderSize={5}
        progressSize={5}
        mb="32px"
        switchEditingUnits={switchEditingUnits}
      />
      <BalanceInput
        unit="STTS"
        onUserInput={handleDecimalChange}
        value={decimalValue}
        maxValue={1006.086957}
        currencyValue={currencyValue(decimalValue)}
        placeholder="0.0"
        width={100}
        mb="32px"
        switchEditingUnits={switchEditingUnits}
      />
      <BalanceInput
        value={values[editingUnit]}
        maxValue={1006.086957}
        onUserInput={handleSTTSChange}
        unit={editingUnit}
        currencyValue={currencyValues}
        currencyUnit={conversionUnit}
        placeholder="1.5"
        mb="32px"
        switchEditingUnits={switchEditingUnits}
      />
      <BalanceInput
        unit="STTS"
        isWarning
        value={numericValue}
        maxValue={1006.086957}
        onUserInput={handleNumericChange}
        inputProps={{ inputMode: "numeric" }}
        currencyValue={currencyValue(numericValue)}
        placeholder="0"
        mb="32px"
        color="#f0f0f0"
      />
    </Box>
  );
};

export const UnitDisplay: React.FC = () => {
  const CAKE_PRICE = 69;
  const [cakeValue, setCakeValue] = useState("1006.086956");

  const cakeToUSD = (input: string) => {
    const convertedToUSD = parseFloat(input) * CAKE_PRICE;
    return `~${convertedToUSD.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} USD`;
  };

  const handleCakeChange = (input: string) => {
    setCakeValue(input);
  };

  return (
    <>
      <Box width="300px" mb="24px">
        <BalanceInput
          onUserInput={handleCakeChange}
          value={cakeValue}
          maxValue={1006.086957}
          currencyValue={cakeToUSD(cakeValue)}
          placeholder="0.0"
          unit="CAKE"
        />
      </Box>
      {/* Long token names with spaces */}
      <Box width="300px">
        <BalanceInput
          onUserInput={handleCakeChange}
          value={cakeValue}
          maxValue={1006.086957}
          currencyValue="2854.66 BADGER-HOTCROSS LP"
          placeholder="0.0"
          unit="CAKE-BNB LP"
        />
      </Box>
    </>
  );
};

export const SwitchUnits: React.FC = () => {
  const CAKE_PRICE = 69;
  const [editingUnit, setEditingUnit] = useState<"CAKE" | "USD">("CAKE");
  const conversionUnit = editingUnit === "CAKE" ? "USD" : "CAKE";
  const [values, setValues] = useState({
    CAKE: "1006.086957",
    USD: `${1006.086957 * CAKE_PRICE}`,
  });

  const currencyValue = !Number.isNaN(parseFloat(values[conversionUnit]))
    ? parseFloat(values[conversionUnit]).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";

  const switchEditingUnits = () => {
    const editingUnitAfterChange = editingUnit === "CAKE" ? "USD" : "CAKE";
    // This is needed to persist same value as shown for currencyValue after switching
    // otherwise user will see lots of decimals
    const valuesAfterChange = { ...values };
    valuesAfterChange[editingUnitAfterChange] = !Number.isNaN(parseFloat(values[conversionUnit]))
      ? parseFloat(values[conversionUnit]).toFixed(2)
      : "0.00";
    setValues(valuesAfterChange);
    setEditingUnit(editingUnitAfterChange);
  };

  const handleCakeChange = (input: string) => {
    const inputAsFloat = parseFloat(input);
    if (editingUnit === "CAKE") {
      setValues({
        CAKE: input,
        USD: Number.isNaN(inputAsFloat) ? "" : `${inputAsFloat * CAKE_PRICE}`,
      });
    } else {
      setValues({
        CAKE: Number.isNaN(inputAsFloat) ? "" : `${inputAsFloat / CAKE_PRICE}`,
        USD: input,
      });
    }
  };
  return (
    <Box width="300px">
      <BalanceInput
        onUserInput={handleCakeChange}
        value={values[editingUnit]}
        maxValue={1006.086957}
        currencyValue={`~${currencyValue} ${conversionUnit}`}
        placeholder="0.0"
        unit={editingUnit}
        isWarning={!values[editingUnit] || parseFloat(values[editingUnit]) <= 0}
        switchEditingUnits={switchEditingUnits}
      />
    </Box>
  );
};
