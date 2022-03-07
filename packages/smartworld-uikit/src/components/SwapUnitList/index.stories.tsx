import React, { useMemo, useState } from 'react'
import SwapUnitList from './SwapUnitList'
import { MainComponent } from '../MainSection'
import { SelectableTokenProps } from '../SelectableToken'

export default {
  title: 'Components/SwapUnitList',
  component: SwapUnitList,
  argTypes: {},
}

const tokenList: SelectableTokenProps['token'][] = [
  {
    chainId: 56,
    address: 'a1',
    symbol: 'STTS',
    balance: '13.0325',
    logoURI: ['https://i.postimg.cc/rqpyX8K0/ggd.png', 'https://i.postimg.cc/rqpyX8K0/Smart-World-Stock.png'],
  },
  {
    chainId: 56,
    address: 'a2',
    decimals: 18,
    symbol: 'BTCB',
    balance: '0.00000002',
    logoURI: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=018',
  },
  {
    chainId: 56,
    address: 'a3',
    symbol: 'USDT',
    balance: '30',
    logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=018',
  },
  {
    chainId: 56,
    address: 'a4',
    symbol: 'SHIB',
    decimals: 18,
    balance: '6600',
    logoURI: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png?v=018',
  },
  {
    chainId: 56,
    address: 'a5',
    symbol: 'DOGE',
    balance: '900',
    logoURI: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=018',
  },
  {
    chainId: 56,
    address: 'a6',
    symbol: 'BNB',
    balance: '138',
    logoURI: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=018',
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
        selectUnitHandler={(unit) => {
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

export const WithToken: React.FC = () => {
  const [token, setToken] = useState(tokenList[4])
  const [value, setValue] = useState('0')
  console.log(token)
  return (
    <MainComponent overflow="visible" marginTop={100}>
      <SwapUnitList
        selectUnitHandler={(unit) => console.log(unit)}
        selectTokenHandler={(t) => {
          setToken(t)
          setValue('0')
        }}
        mb="32px"
        defaultSelected={4}
        onUserInput={(v) => setValue(v)}
        value={value}
        token={token}
        maxValue={200}
        tokenList={tokenList}
      />
    </MainComponent>
  )
}
