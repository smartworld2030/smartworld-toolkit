import React, { useState } from 'react'
import Box from '../Box/Box'
import { variants } from '../Button/types'
import { LogoIcon } from '../Svg'
import SelectableToken from './SelectableToken'

export default {
  title: 'Components/SelectableToken',
  component: SelectableToken,
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

  return (
    <Box size="300px">
      <SelectableToken
        value={values[editingUnit]}
        unit={<div>{editingUnit}</div>}
        onSelect={() => console.log('Unit Clicked!')}
        currencyValue={currencyValues}
        currencyUnit={conversionUnit}
        placeholder="1006.086957"
        mb="32px"
      />
      <SelectableToken
        unit="STTS"
        onSelect={() => console.log('clicked')}
        value={decimalValue}
        currencyValue={currencyValue(decimalValue)}
        placeholder="0.0"
        size={100}
        mb="32px"
      />
      <SelectableToken
        value={values[editingUnit]}
        unit={editingUnit}
        image="https://picsum.photos/id/237/300/300?grayscale"
        currencyValue={currencyValues}
        currencyUnit={conversionUnit}
        placeholder="1.5"
        disabled
        mb="32px"
        onSelect={() => console.log('clicked')}
      />
    </Box>
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

  return (
    <SelectableToken
      onSelect={() => console.log('clicked')}
      value={values[editingUnit]}
      currencyValue={`~${currencyValue} ${conversionUnit}`}
      placeholder="0.0"
      image="https://i.postimg.cc/rqpyX8K0/Smart-World-Stock.png"
      unit={editingUnit}
    />
  )
}

export const SwapUnitLists: React.FC = () => {
  const tokenList = [{ unit: 'STTS', value: '13.0325', image: 'https://i.postimg.cc/rqpyX8K0/Smart-World-Stock.png' }]
  return (
    <Box size="300px">
      {tokenList.map((item) => (
        <SelectableToken
          loading
          onSelect={() => console.log(item.unit)}
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

export const Variants: React.FC = () => {
  return (
    <Box>
      {Object.values(variants).map((variant, i) => (
        <SelectableToken
          key={variant}
          unit="STTS"
          value={100 + i * 10}
          currencyValue={16000}
          variant={variant}
          image="https://i.postimg.cc/rqpyX8K0/Smart-World-Stock.png"
          inputProps={{ inputMode: 'numeric' }}
          placeholder="0"
          size={100 + i * 10}
          mb="32px"
          loading
          text={variant.toUpperCase()}
          onSelect={() => console.log('Button Clicked!')}
          onClick={() => console.log('Clicked!')}
        />
      ))}
    </Box>
  )
}
