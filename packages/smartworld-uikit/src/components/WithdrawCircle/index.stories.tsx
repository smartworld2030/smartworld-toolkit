import React, { useState } from 'react'
import Box from '../Box/Box'
import { Text, TooltipText } from '../Text'
import WithdrawCircle from './WithdrawCircle'

export default {
  title: 'Components/WithdrawCircle',
  component: WithdrawCircle,
  argTypes: {},
}

export const Default: React.FC = () => {
  const STTS_PRICE = 1.26
  const [decimalValue, setDecimalValue] = useState(1.43333)
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
      <WithdrawCircle
        percent={1006.086957}
        onClick={() => console.log('Whithdraw')}
        onUnitClick={() => console.log('Unit Clicked!')}
        totalValue={currencyValues}
        totalValueUnit={conversionUnit}
        size={200}
        borderSize={5}
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
        onClick={() => console.log('Whithdraw')}
        percent={0}
        totalValue={currencyValue(decimalValue)}
        size={100}
        isWarning
      />
      <WithdrawCircle
        isWarning
        name={values[editingUnit]}
        percent={1006.086957}
        onClick={() => console.log('Whithdraw')}
        topElement={editingUnit}
        totalValue={currencyValues}
        totalValueUnit={conversionUnit}
        disabled
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

  return (
    <>
      <Box size="300px" mb="24px">
        <WithdrawCircle
          onClick={() => console.log('Whithdraw')}
          name={cakeValue}
          percent={100}
          totalValue={cakeToUSD(cakeValue)}
          totalValueUnit="USD"
          topElement="CAKE"
        />
      </Box>
      {/* Long token names with spaces */}
      <Box size="300px">
        <WithdrawCircle
          onClick={() => console.log('Whithdraw')}
          name={cakeValue}
          percent={10}
          totalValue="2854.66 BADGER-HOTCROSS LP,2854.66 BADGER-HOTCROSS LP2854.66 BADGER-HOTCROSS LP"
          topElement="CAKE-BNB LP"
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

  return (
    <Box size="300px">
      <WithdrawCircle
        onClick={() => console.log('Whithdraw')}
        name={values[editingUnit]}
        percent={1006.086957}
        totalValue={`~${currencyValue} ${conversionUnit}`}
        topElement={editingUnit}
        isWarning={!values[editingUnit] || parseFloat(values[editingUnit]) <= 0}
      />
    </Box>
  )
}

export const WithLoading: React.FC = () => {
  const CAKE_PRICE = 69
  const [editingUnit, setEditingUnit] = useState<'CAKE' | 'USD'>('CAKE')
  const conversionUnit = editingUnit === 'CAKE' ? 'USD' : 'CAKE'
  const [values, setValues] = useState({
    CAKE: '1006.086957',
    USD: `${1006.086957 * CAKE_PRICE}`,
  })

  const currencyValues = !Number.isNaN(parseFloat(values[conversionUnit]))
    ? `~${parseFloat(values[conversionUnit]).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : '0.00'

  return (
    <Box size="300px">
      <WithdrawCircle
        topElement={
          <div>
            <TooltipText size="md">HOURLY</TooltipText>
            <Text fontWeight="bold" fontSize="30px">
              190290909
            </Text>
          </div>
        }
        bottomElement={
          <div>
            <Text fontWeight="bold" fontSize="30px">
              190290909
            </Text>
            <TooltipText size="md">REFERRAL</TooltipText>
          </div>
        }
        totalValue={currencyValues}
        size={400}
        percent={1006.086957}
        totalValueUnit="$"
        loading
        buttonProps={{ variant: 'secondary' }}
        onClick={() => console.log('Whithdraw')}
        onLogoClick={() => console.log('Logo Clicked!')}
      />
    </Box>
  )
}
