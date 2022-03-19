import React, { useMemo, useState } from 'react'
import SwapUnitList from './SwapUnitList'
import { MainComponent } from '../MainSection'
import tokenList from './TestList'

export default {
  title: 'Components/SwapUnitList',
  component: SwapUnitList,
  argTypes: {},
}

export const Default: React.FC = () => {
  const STTS_PRICE = 1.26
  const [showList, setShowList] = useState(false)
  const [decimalValue, setDecimalValue] = useState(1.43333)
  const [token, setToken] = useState()
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
    <MainComponent overflow="visible" marginTop={200}>
      <SwapUnitList
        topElement={<input type="text" />}
        tokenList={tokenList}
        onTokenSelect={setToken}
        onUnitSelect={(unit) => {
          setSelectedUnit(unit)
          setEditingUnit(unit)
          setValues({
            [unit]: '',
            USD: '',
          })
        }}
        token={token}
        value={values[editingUnit]}
        onUserInput={handleSTTSChange}
        unit={editingUnit}
        currencyValue={currencyValues}
        currencyUnit={conversionUnit}
        switchEditingUnits={switchEditingUnits}
        showList={showList}
        setShowList={setShowList}
        onMissClick={() => console.log(false)}
      />
      <button onClick={() => setShowList(false)}>dismiss</button>
    </MainComponent>
  )
}

export const WithToken: React.FC = () => {
  const [token1, setToken1] = useState(tokenList[4])
  const [token2, setToken2] = useState(tokenList[2])
  const [value, setValue] = useState('0')
  const [showList1, setShowList1] = useState(false)
  const [showList2, setShowList2] = useState(false)

  return (
    <MainComponent overflow="visible" mt={200}>
      <SwapUnitList
        topElement={<input type="text" />}
        onUnitSelect={(unit) => console.log(unit)}
        onTokenSelect={(t) => {
          setToken1(t)
          setValue('0')
        }}
        size={200}
        onUserInput={setValue}
        value={value}
        token={token1}
        maxValue={200}
        tokenList={tokenList}
        setShowList={setShowList1}
        showList={showList1}
      />
      <SwapUnitList
        topElement={<input type="text" />}
        onUnitSelect={(unit) => console.log(unit)}
        onTokenSelect={(t) => {
          setToken2(t)
          setValue('0')
        }}
        size={200}
        listHeight={5}
        defaultSelected={2}
        onUserInput={setValue}
        value={value}
        token={token2}
        maxValue={200}
        tokenList={tokenList}
        setShowList={setShowList2}
        showList={showList2}
      />
    </MainComponent>
  )
}

export const Sizes: React.FC = () => {
  const [showList, setShowList] = useState({})
  const [token, setToken] = useState()
  const [value, setValue] = useState('0')

  return (
    <MainComponent overflow="visible" mt={200}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <SwapUnitList
          topElement={<input type="text" />}
          size={i * 60}
          key={i}
          onUnitSelect={(unit) => console.log(unit)}
          onTokenSelect={(t) => {
            setToken(t)
            setValue('0')
          }}
          onUserInput={setValue}
          value={value}
          token={token}
          maxValue={200}
          setShowList={() => setShowList((prev) => ({ ...prev, [i]: !prev[i] }))}
          showList={showList[i]}
          tokenList={tokenList}
        />
      ))}
    </MainComponent>
  )
}
