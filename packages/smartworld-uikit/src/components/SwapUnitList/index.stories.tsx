import React, { useMemo, useState } from 'react'
import SwapUnitList from './SwapUnitList'
import { MainComponent } from '../MainSection'
import { SelectableToken, SelectableTokenProps } from '../SelectableToken'

export default {
  title: 'Components/SwapUnitList',
  component: SwapUnitList,
  argTypes: {},
}

const tokenList: SelectableTokenProps[] = [
  { address: 'a1', unit: 'STTS', maxValue: '13.0325', image: 'https://i.postimg.cc/rqpyX8K0/Smart-World-Stock.png' },
  {
    address: 'a2',
    decimals: 18,
    unit: 'BTCB',
    maxValue: '0.00000002',
    image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=018',
  },
  { address: 'a3', unit: 'USDT', maxValue: '30', image: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=018' },
  {
    address: 'a4',
    unit: 'SHIB',
    decimals: 18,
    maxValue: '6600',
    image: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png?v=018',
  },
  {
    address: 'a5',
    unit: 'DOGE',
    maxValue: '900',
    image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=018',
  },
  {
    address: 'a6',
    unit: 'BNB',
    maxValue: '138',
    image: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=018',
  },
]

export const Default: React.FC = () => {
  const STTS_PRICE = 1.26
  const [decimalValue, setDecimalValue] = useState(1.43333)
  const [numericValue, setNumericValue] = useState(5)
  const [selectedUnit, setSelectedUnit] = useState<string>('STTS')
  const [editingUnit, setEditingUnit] = useState<string>('STTS')
  const [values, setValues] = useState({
    [selectedUnit]: '',
    USD: '',
  })
  const conversionUnit = useMemo(() => (editingUnit === 'USD' ? selectedUnit : 'USD'), [editingUnit, selectedUnit])

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
        [selectedUnit]: input,
        USD: Number.isNaN(inputAsFloat) ? '' : `${inputAsFloat * STTS_PRICE}`,
      })
    } else {
      setValues({
        [selectedUnit]: Number.isNaN(inputAsFloat) ? '' : `${inputAsFloat / STTS_PRICE}`,
        USD: input,
      })
    }
  }

  const switchEditingUnits = () => {
    const editingUnitAfterChange = editingUnit === selectedUnit ? 'USD' : selectedUnit
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
    <MainComponent overflow="visible" marginTop={100}>
      <SwapUnitList
        tokenList={tokenList}
        selectedItem={(unit) => {
          setSelectedUnit(unit)
          setEditingUnit(unit)
          setValues({
            [unit]: '',
            USD: '',
          })
        }}
        value={values[editingUnit]}
        onUserInput={handleSTTSChange}
        unit={editingUnit}
        currencyValue={currencyValues}
        currencyUnit={conversionUnit}
        mb="32px"
        switchEditingUnits={switchEditingUnits}
      />
    </MainComponent>
  )
}

export const WithChildren: React.FC = () => {
  return (
    <MainComponent overflow="visible" marginTop={100}>
      <SwapUnitList
        selectedItem={(unit) => console.log(unit)}
        selectedToken={(token) => console.log(token)}
        defaultSelected={1}
        mb="32px"
        value={undefined}
      >
        {({ onClick }) =>
          tokenList.map((item, i) => (
            <SelectableToken mb={10} key={item.address} onClick={() => onClick(i, item.unit, item.token)} {...item} />
          ))
        }
      </SwapUnitList>
    </MainComponent>
  )
}
