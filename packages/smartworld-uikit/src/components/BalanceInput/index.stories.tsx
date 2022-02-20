import React, { useState } from 'react'
import Box from '../Box/Box'
import { LogoIcon } from '../Svg'
import BalanceInput from './BalanceInput'

export default {
  title: 'Components/BalanceInput',
  component: BalanceInput,
  argTypes: {},
}

export const Default: React.FC = () => {
  const STTS_PRICE = 1.26
  const [decimalValue, setDecimalValue] = useState(1.43333)
  const [numericValue, setNumericValue] = useState(5)
  const [editingUnit, setEditingUnit] = useState<'STTS' | 'USD'>('STTS')
  const [values, setValues] = useState({
    STTS: '',
    USD: '',
  })
  const conversionUnit = editingUnit === 'STTS' ? 'USD' : 'STTS'

  const currencyValue = (input: number) => {
    return `~${(input * 1.3).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} USD`
  }

  const currencyValues = !Number.isNaN(parseFloat(values[conversionUnit]))
    ? `~${parseFloat(values[conversionUnit]).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : '0.00'

  const handleDecimalChange = (input) => {
    setDecimalValue(input)
  }

  const handleSTTSChange = (input: string) => {
    const inputAsFloat = parseFloat(input)
    if (editingUnit !== 'USD') {
      setValues({
        STTS: input,
        USD: Number.isNaN(inputAsFloat) ? '' : `${inputAsFloat * STTS_PRICE}`,
      })
    } else {
      setValues({
        STTS: Number.isNaN(inputAsFloat) ? '' : `${inputAsFloat / STTS_PRICE}`,
        USD: input,
      })
    }
  }

  const switchEditingUnits = () => {
    const editingUnitAfterChange = editingUnit === 'STTS' ? 'USD' : 'STTS'
    // This is needed to persist same value as shown for currencyValue after switching
    // otherwise user will see lots of decimals
    const valuesAfterChange = { ...values }
    valuesAfterChange[editingUnitAfterChange] = !Number.isNaN(parseFloat(values[conversionUnit]))
      ? parseFloat(values[conversionUnit]).toFixed(2)
      : '0.00'
    setValues(valuesAfterChange)
    setEditingUnit(editingUnitAfterChange)
  }

  return (
    <Box size="300px">
      <BalanceInput
        value={values[editingUnit]}
        maxValue={1006.086957}
        onUserInput={handleSTTSChange}
        unit={<div>{editingUnit}</div>}
        onUnitClick={() => console.log('Unit Clicked!')}
        currencyValue={currencyValues}
        currencyUnit={conversionUnit}
        placeholder="1006.086957"
        mb="32px"
        switchEditingUnits={switchEditingUnits}
      />
      <BalanceInput
        unit="STTS"
        onUserInput={handleDecimalChange}
        value={decimalValue}
        maxValue={0}
        currencyValue={currencyValue(decimalValue)}
        placeholder="0.0"
        size={100}
        isWarning
        mb="32px"
        switchEditingUnits={switchEditingUnits}
      />
      <BalanceInput
        isWarning
        value={values[editingUnit]}
        maxValue={1006.086957}
        onUserInput={handleSTTSChange}
        unit={editingUnit}
        logo={<LogoIcon width={10} />}
        image="https://picsum.photos/id/237/300/300?grayscale"
        currencyValue={currencyValues}
        currencyUnit={conversionUnit}
        placeholder="1.5"
        disabled
        mb="32px"
      />
    </Box>
  )
}

export const UnitDisplay: React.FC = () => {
  const CAKE_PRICE = 69
  const [cakeValue, setCakeValue] = useState('1006.086956')

  const cakeToUSD = (input: string) => {
    const convertedToUSD = parseFloat(input) * CAKE_PRICE
    return `~${convertedToUSD.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} USD`
  }

  const handleCakeChange = (input: string) => {
    setCakeValue(input)
  }

  return (
    <>
      <Box size="300px" mb="24px">
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
      <Box size="300px">
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
  )
}

export const SwitchUnits: React.FC = () => {
  const CAKE_PRICE = 69
  const [editingUnit, setEditingUnit] = useState<'CAKE' | 'USD'>('CAKE')
  const conversionUnit = editingUnit === 'CAKE' ? 'USD' : 'CAKE'
  const [values, setValues] = useState({
    CAKE: '1006.086957',
    USD: `${1006.086957 * CAKE_PRICE}`,
  })

  const currencyValue = !Number.isNaN(parseFloat(values[conversionUnit]))
    ? parseFloat(values[conversionUnit]).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : '0.00'

  const switchEditingUnits = () => {
    const editingUnitAfterChange = editingUnit === 'CAKE' ? 'USD' : 'CAKE'
    // This is needed to persist same value as shown for currencyValue after switching
    // otherwise user will see lots of decimals
    const valuesAfterChange = { ...values }
    valuesAfterChange[editingUnitAfterChange] = !Number.isNaN(parseFloat(values[conversionUnit]))
      ? parseFloat(values[conversionUnit]).toFixed(2)
      : '0.00'
    setValues(valuesAfterChange)
    setEditingUnit(editingUnitAfterChange)
  }

  const handleCakeChange = (input: string) => {
    const inputAsFloat = parseFloat(input)
    if (editingUnit === 'CAKE') {
      setValues({
        CAKE: input,
        USD: Number.isNaN(inputAsFloat) ? '' : `${inputAsFloat * CAKE_PRICE}`,
      })
    } else {
      setValues({
        CAKE: Number.isNaN(inputAsFloat) ? '' : `${inputAsFloat / CAKE_PRICE}`,
        USD: input,
      })
    }
  }
  return (
    <BalanceInput
      onUserInput={handleCakeChange}
      value={values[editingUnit]}
      maxValue={1006.086957}
      currencyValue={`~${currencyValue} ${conversionUnit}`}
      placeholder="0.0"
      image="https://i.postimg.cc/rqpyX8K0/Smart-World-Stock.png"
      unit={editingUnit}
      isWarning={!values[editingUnit] || parseFloat(values[editingUnit]) <= 0}
      switchEditingUnits={switchEditingUnits}
    />
  )
}

export const WithLoading: React.FC = () => {
  const tokenList = [{ unit: 'STTS', value: '13.0325', image: 'https://i.postimg.cc/rqpyX8K0/Smart-World-Stock.png' }]
  return (
    <Box size="300px">
      {tokenList.map((item) => (
        <BalanceInput
          selectable
          loading
          onSelect={() => console.log(item.unit)}
          maxValue={0}
          key={item.unit}
          image="https://i.postimg.cc/rqpyX8K0/Smart-World-Stock.png"
          inputProps={{ inputMode: 'numeric' }}
          mb="32px"
          borderColor="orange"
          {...item}
        />
      ))}
    </Box>
  )
}

export const BigSwitchUnits: React.FC = () => {
  const CAKE_PRICE = 69
  const [editingUnit, setEditingUnit] = useState<'CAKE' | 'USD'>('CAKE')
  const conversionUnit = editingUnit === 'CAKE' ? 'USD' : 'CAKE'
  const [values, setValues] = useState({
    CAKE: '1006.086957',
    USD: `${1006.086957 * CAKE_PRICE}`,
  })

  const switchEditingUnits = () => {
    const editingUnitAfterChange = editingUnit === 'CAKE' ? 'USD' : 'CAKE'
    // This is needed to persist same value as shown for currencyValue after switching
    // otherwise user will see lots of decimals
    const valuesAfterChange = { ...values }
    valuesAfterChange[editingUnitAfterChange] = !Number.isNaN(parseFloat(values[conversionUnit]))
      ? parseFloat(values[conversionUnit]).toFixed(2)
      : '0.00'
    setValues(valuesAfterChange)
    setEditingUnit(editingUnitAfterChange)
  }

  const currencyValues = !Number.isNaN(parseFloat(values[conversionUnit]))
    ? `~${parseFloat(values[conversionUnit]).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : '0.00'

  return (
    <Box size="300px">
      <BalanceInput
        unit="STTS"
        value={values[editingUnit]}
        currencyValue={currencyValues}
        size={600}
        maxValue={1006.086957}
        image="https://i.postimg.cc/rqpyX8K0/Smart-World-Stock.png"
        inputProps={{ inputMode: 'numeric' }}
        onUserInput={(val) => setValues((prev) => ({ ...prev, CAKE: val }))}
        placeholder="0"
        mb="32px"
        switchEditingUnits={switchEditingUnits}
        logo={<LogoIcon width="30" />}
        onLogoClick={() => console.log('Logo Clicked!')}
      />
    </Box>
  )
}
