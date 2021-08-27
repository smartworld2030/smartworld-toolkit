import React, { useState } from "react";
import Box from "../Box/Box";
import { LogoIcon } from "../Svg";
import { Text, TooltipText } from "../Text";
import WithdrawCircle from "./WithdrawCircle";

export default {
  title: "Components/WithdrawCircle",
  component: WithdrawCircle,
  argTypes: {},
};

export const Default: React.FC = () => {
  const STTS_PRICE = 1.26;
  const [decimalValue, setDecimalValue] = useState(1.43333);
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
    <Box size="300px">
      <WithdrawCircle
        name={values[editingUnit]}
        percent={1006.086957}
        onClick={() => console.log("Whithdraw")}
        onUnitClick={() => console.log("Unit Clicked!")}
        totalValue={currencyValues}
        totalValueUnit={conversionUnit}
        size={200}
        borderSize={5}
        progressSize={5}
        topElement={
          <div>
            <TooltipText small>Reward</TooltipText>
            <Text fontWeight="bold" fontSize="12px">
              190290909
            </Text>
          </div>
        }
        bottomElement={
          <div>
            <TooltipText small>Refferals</TooltipText>
            <Text fontWeight="bold" fontSize="12px">
              190290909
            </Text>
          </div>
        }
      />
      <WithdrawCircle
        topElement="STTS"
        onClick={() => console.log("Whithdraw")}
        name={decimalValue}
        percent={0}
        totalValue={currencyValue(decimalValue)}
        size={100}
        isWarning
      />
      <WithdrawCircle
        isWarning
        name={values[editingUnit]}
        percent={1006.086957}
        onClick={() => console.log("Whithdraw")}
        topElement={editingUnit}
        totalValue={currencyValues}
        totalValueUnit={conversionUnit}
        disabled
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
      <Box size="300px" mb="24px">
        <WithdrawCircle
          onClick={() => console.log("Whithdraw")}
          name={cakeValue}
          percent={98}
          totalValue={cakeToUSD(cakeValue)}
          totalValueUnit="USD"
          topElement="CAKE"
        />
      </Box>
      {/* Long token names with spaces */}
      <Box size="300px">
        <WithdrawCircle
          onClick={() => console.log("Whithdraw")}
          name={cakeValue}
          percent={10}
          totalValue="2854.66 BADGER-HOTCROSS LP,2854.66 BADGER-HOTCROSS LP2854.66 BADGER-HOTCROSS LP"
          topElement="CAKE-BNB LP"
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
    <Box size="300px">
      <WithdrawCircle
        onClick={() => console.log("Whithdraw")}
        name={values[editingUnit]}
        percent={1006.086957}
        totalValue={`~${currencyValue} ${conversionUnit}`}
        topElement={editingUnit}
        isWarning={!values[editingUnit] || parseFloat(values[editingUnit]) <= 0}
      />
    </Box>
  );
};

export const BigSwitchUnits: React.FC = () => {
  const CAKE_PRICE = 69;
  const [editingUnit, setEditingUnit] = useState<"CAKE" | "USD">("CAKE");
  const conversionUnit = editingUnit === "CAKE" ? "USD" : "CAKE";
  const [values, setValues] = useState({
    CAKE: "1006.086957",
    USD: `${1006.086957 * CAKE_PRICE}`,
  });

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

  const currencyValues = !Number.isNaN(parseFloat(values[conversionUnit]))
    ? "~" +
      parseFloat(values[conversionUnit]).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";

  return (
    <Box size="300px">
      <WithdrawCircle
        topElement={
          <div>
            <TooltipText size="md">Reward</TooltipText>
            <Text fontWeight="bold" fontSize="50px">
              190290909
            </Text>
          </div>
        }
        bottomElement={
          <div>
            <TooltipText size="md">Refferals</TooltipText>
            <Text fontWeight="bold" fontSize="50px">
              190290909
            </Text>
          </div>
        }
        totalValue={currencyValues}
        size={600}
        percent={1006.086957}
        totalValueUnit="$"
        buttonProps={{ inputMode: "numeric" }}
        onClick={() => console.log("Whithdraw")}
        onLogoClick={() => console.log("Logo Clicked!")}
      />
    </Box>
  );
};
