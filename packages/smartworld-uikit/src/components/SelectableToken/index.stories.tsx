import React, { useState } from 'react'
import SelectableToken from './SelectableToken'
import { MainComponent } from '../MainSection'

export default {
  title: 'Components/SelectableToken',
  component: SelectableToken,
  argTypes: {},
}

export const Default: React.FC = () => {
  const [clickedItem, setClickedItem] = useState(-1)
  const tokenList = [
    { symbol: 'STTS', balance: '13.0325', logoURI: 'https://i.postimg.cc/rqpyX8K0/Smart-World-Stock.png' },
    { symbol: 'BTCB', balance: '0.00000002', logoURI: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=018' },
    { symbol: 'USDT', balance: '30', logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=018' },
    { symbol: 'SHIB', balance: '6600', logoURI: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png?v=018' },
    { symbol: 'DOGE', balance: '900', logoURI: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=018' },
    { symbol: 'BNB', balance: '138', logoURI: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=018' },
  ]

  return (
    <MainComponent flexDirection="column" overflow="visible">
      {tokenList.map((item, i) => (
        <SelectableToken
          loading
          onClick={() => setClickedItem(i)}
          key={`${item.symbol + i}`}
          inputProps={{ inputMode: 'numeric' }}
          mb="10px"
          borderColor="orange"
          text={clickedItem === i ? 'SELECTED' : ''}
          {...item}
        />
      ))}
    </MainComponent>
  )
}
