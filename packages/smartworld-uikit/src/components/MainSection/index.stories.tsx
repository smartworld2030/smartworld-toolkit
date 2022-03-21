import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Flex, { AnimatedTipFlex } from '../Box/Flex'
import MainSection from './MainSection'
import { NoProfileAvatarIcon, CogIcon } from '../Svg'
import { Toggle } from '../Toggle'
import { Spinner } from '../Spinner'
import MainComponent from './components'
import SelectableToken from '../SelectableToken/SelectableToken'

export default {
  title: 'Components/MainSection',
  component: MainSection,
  argTypes: {},
}

export const Default: React.FC = () => {
  const [loading, setLoading] = useState(true)

  const [clickedItem, setClickedItem] = useState('BTCB')
  const tokenList1 = [
    { symbol: 'BTCB', balance: '0.00000002', logoURI: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=018' },
  ]
  const tokenList2 = [
    { symbol: 'USDT', balance: '30', logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=018' },
    { symbol: 'SHIB', balance: '6600', logoURI: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png?v=018' },
  ]
  const tokenList3 = [
    { symbol: 'DOGE', balance: '900', logoURI: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=018' },
    { symbol: 'BNB', balance: '138', logoURI: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=018' },
  ]

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => {
      clearTimeout(t)
    }
  }, [])

  return (
    <Router>
      <Suspense
        fallback={
          <>
            <Spinner />
          </>
        }
      >
        <Switch>
          <MainSection
            // transition={{
            //   from: { opacity: 0, marginLeft: '-300px' },
            //   enter: { opacity: 1, marginLeft: '0px' },
            //   leave: { opacity: 0, marginLeft: '-150px' },
            // }}
            initialValue={{ height: 600 }}
            loading={loading}
            rightIcon={({ checked, onChange }) =>
              checked ? <NoProfileAvatarIcon onClick={onChange} /> : <NoProfileAvatarIcon onClick={onChange} />
            }
            leftIcon={({ checked, onChange }) =>
              checked ? <CogIcon onClick={onChange} /> : <CogIcon onClick={onChange} />
            }
            right={({ toggle: { showRight }, responsiveSize }) => (
              <AnimatedTipFlex {...responsiveSize(3, showRight)} flexDirection="column" justifyContent="space-around">
                <div>USER MENU</div>
              </AnimatedTipFlex>
            )}
            left={({ toggle: { showLeft }, responsiveSize, showTip, tipChanger }) => (
              <AnimatedTipFlex {...responsiveSize(3, showLeft)} justifyContent="space-around" alignContent="center">
                <div>SETTING</div>
                <Toggle onChange={tipChanger} checked={showTip} />
              </AnimatedTipFlex>
            )}
          >
            <Flex width="100%" height="100%" flexDirection="column-reverse" margin="auto">
              <MainComponent
                flex={4}
                tipSize={3}
                tip="hi"
                justifyContent="space-around"
                flexDirection="column"
                alignItems="center"
              >
                {tokenList1.map((item, i) => (
                  <SelectableToken
                    loading
                    onClick={() => setClickedItem(item.symbol)}
                    key={`${item.symbol + i}`}
                    inputProps={{ inputMode: 'numeric' }}
                    mb="10px"
                    text={clickedItem === item.symbol ? 'SELECTED' : ''}
                    {...item}
                  />
                ))}
              </MainComponent>
              <MainComponent flex={4} tipSize={2} tip="hi" justifyContent="space-around" alignItems="center">
                {tokenList2.map((item, i) => (
                  <SelectableToken
                    loading
                    onClick={() => setClickedItem(item.symbol)}
                    key={`${item.symbol + i}`}
                    inputProps={{ inputMode: 'numeric' }}
                    mb="10px"
                    text={clickedItem === item.symbol ? 'SELECTED' : ''}
                    {...item}
                  />
                ))}
              </MainComponent>
              <MainComponent
                flex={4}
                tipSize={2}
                tip="hi"
                justifyContent="space-around"
                flexDirection="column"
                alignItems="center"
              >
                {tokenList3.map((item, i) => (
                  <SelectableToken
                    loading
                    onClick={() => setClickedItem(item.symbol)}
                    key={`${item.symbol + i}`}
                    inputProps={{ inputMode: 'numeric' }}
                    mb="10px"
                    text={clickedItem === item.symbol ? 'SELECTED' : ''}
                    {...item}
                  />
                ))}
              </MainComponent>
            </Flex>
          </MainSection>
        </Switch>
      </Suspense>
    </Router>
  )
}
