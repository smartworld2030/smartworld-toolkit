import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-grid-system'

import { BalanceInput } from '../BalanceInput'

export default {
  title: 'Components/SmartInvest',
  component: BalanceInput,
  argTypes: {},
}

const tokenNames = ['STTS', 'BNB', 'BTC']

const dollar = { stts: 1.26, bnb: 495, btc: 48700 }
const prices = { btc: 100000000, stt: 4, stts: 2591, bnb: 1030999 }
const tokens = { stts: 12200, bnb: 1.5, btc: 0.01 }

export const Default: React.FC = () => {
  const [token, setToken] = useState('STTS')
  const [editingUnit, setEditingUnit] = useState<string | 'USD'>(token)

  const [values, setValues] = useState({
    [token]: tokens[token] ? tokens[token] : '',
    USD: `${tokens[token] * dollar[token]}`,
  })

  const conversionUnit = editingUnit === token ? 'USD' : token

  useEffect(() => {
    setEditingUnit(token)
    setValues({
      [token]: tokens[token],
      USD: `${tokens[token] * dollar[token]}`,
    })
    return () => {
      setValues({
        [token]: '',
        USD: '',
      })
    }
  }, [token])

  const minimumAmount = (t: string) => (500000 / Number(prices[t.toLowerCase()])).toString()
  const clickHandler = (t: string) => setToken(t)
  const currencyValues = !Number.isNaN(parseFloat(values[conversionUnit]))
    ? '~' +
      parseFloat(values[conversionUnit]).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : '0.00'

  const handleInputChange = (input: string) => {
    console.log(input)
    const inputAsFloat = parseFloat(input)
    if (editingUnit !== 'USD') {
      setValues({
        [token]: input,
        USD: Number.isNaN(inputAsFloat) ? '' : `${inputAsFloat * dollar[token.toLocaleLowerCase()]}`,
      })
    } else {
      setValues({
        [token]: Number.isNaN(inputAsFloat) ? '' : `${inputAsFloat / dollar[token.toLocaleLowerCase()]}`,
        USD: input,
      })
    }
  }

  const switchEditingUnits = () => {
    const editingUnitAfterChange = editingUnit === token ? 'USD' : token
    // This is needed to persist same value as shown for currencyValue after switching
    // otherwise user will see lots of decimals
    const valuesAfterChange = { ...values }
    valuesAfterChange[editingUnitAfterChange] = !Number.isNaN(parseFloat(values[conversionUnit]))
      ? parseFloat(values[conversionUnit]).toFixed(2)
      : ''
    setValues(valuesAfterChange)
    setEditingUnit(editingUnitAfterChange)
  }

  const balanceValues = () => {
    const inputAsFloat = parseFloat(tokens?.[token])
    if (editingUnit !== 'USD') {
      return tokens?.[token]
    } else {
      return Number.isNaN(inputAsFloat) ? '' : `${inputAsFloat * dollar[token.toLocaleLowerCase()]}`
    }
  }

  console.log(balanceValues())
  return (
    <Row direction="row" style={{ height: '100%' }}>
      <Col md={2}>
        <Row direction={'column'} justify="around" align="center" style={{ height: '100%' }}>
          {tokenNames.map((t) => (
            <button key={t} onClick={() => clickHandler(t)}>
              {t + minimumAmount(t)}
            </button>
          ))}
        </Row>
      </Col>
      <Col md={4}>
        <Row justify="around" align="center" style={{ height: '100%' }}>
          <BalanceInput
            value={values[editingUnit]}
            maxValue={balanceValues()}
            onUserInput={handleInputChange}
            unit={editingUnit}
            currencyValue={currencyValues}
            currencyUnit={conversionUnit}
            placeholder={balanceValues()}
            width={210}
            switchEditingUnits={switchEditingUnits}
          />
        </Row>
      </Col>
    </Row>
  )
}
