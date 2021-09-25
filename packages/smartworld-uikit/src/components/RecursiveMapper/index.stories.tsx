import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { useWindowSize } from '../..'
import { BalanceInput } from '../BalanceInput'
import { MainComp, MainFlex } from '../Box'
import { Button } from '../Button'
import { LongPressButton } from '../LongPressButton'
import { MainRoute } from '../MainContainer/Component'
import { Skeleton } from '../Skeleton'
import { TooltipText, Text } from '../Text'
import { WithdrawCircle } from '../WithdrawCircle'
import RecursiveMap from '../../util/recursiveMap'

export default {
  title: 'Components/RecursiveMap',
  component: RecursiveMap,
}
export const RecursiveMaper = () => (
  <Mapping>
    <Route exact strict path={['/iframe.html', '/invest']}>
      <MainInvestment />
    </Route>
    <Route exact strict path={['/swap', '/freeze']}>
      <Updater comp="swap" />
      <MainFlex>
        <div>swap</div>
      </MainFlex>
    </Route>
    <div>swap</div>
  </Mapping>
)

const Mapping = ({ children }) => {
  console.log(RecursiveMap(children))
  return <>{RecursiveMap(children).map((child) => child.toString())}</>
}

const Updater = ({ comp }: { comp: string }) => {
  let int: NodeJS.Timeout
  useEffect(() => {
    console.log(comp)
    int = setInterval(() => {
      console.log(comp)
    }, 3000)
    return () => clearInterval(int)
  }, [])
  return null
}

const MainInvestment = () => {
  const isMobile = false,
    flexSize = 12,
    isTablet = false
  return (
    <MainRoute>
      <Updater comp="invest" />
      <MainDeposit {...{ isMobile, isTablet, flexSize }} />
      <MainWithdraw {...{ isMobile, isTablet, flexSize }} />
      <MainDetails {...{ isMobile, isTablet, flexSize }} />
    </MainRoute>
  )
}

const MainWithdraw = ({ isMobile, flexSize, isTablet }) => {
  return (
    <MainFlex {...{ flex: 3, md: 6, sm: 4, xs: 4 }}>
      <MainComp
        tip="Withdraw Circle"
        flex={12}
        justifyContent="space-around"
        alignItems="center"
        tipSize={3}
        demo={<Skeleton size={isMobile ? flexSize * 3.5 : isTablet ? flexSize * 2.5 : flexSize * 2} />}
      >
        <WithdrawCircle
          name="WHITHDRAW"
          percent={1006.086957}
          onClick={() => console.log('Whithdraw')}
          onUnitClick={() => console.log('Unit Clicked!')}
          totalValue="200"
          totalValueUnit="USD"
          size={isMobile ? flexSize * 4 : isTablet ? flexSize * 3 : flexSize * 2}
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
      </MainComp>
    </MainFlex>
  )
}

const MainDetails = ({ isMobile, flexSize, isTablet }) => {
  return (
    <MainFlex {...{ flex: 3, md: 6, sm: 4, xs: 4 }}>
      <MainComp
        tip="Withdraw Circle"
        flex={12}
        justifyContent="space-around"
        alignItems="center"
        tipSize={3}
        demo={<Skeleton size={80} />}
      >
        <LongPressButton shape="circle" size={80} onClick={() => console.log('object')} />
      </MainComp>
    </MainFlex>
  )
}
const MainDeposit = ({ isMobile, flexSize, isTablet }) => {
  const [value, setValue] = useState('100')

  return (
    <MainFlex {...{ flex: 6, md: 12, sm: 12, xs: 12 }}>
      <MainComp
        tip="Token Selection"
        flex={3}
        flexDirection={isMobile ? 'row' : 'column'}
        justifyContent="space-around"
        alignItems="center"
        demo={[0, 1, 2].map((i) => (
          <Skeleton key={i} shape="circle" scale="lg" />
        ))}
      >
        {[0, 1, 2].map((i) => (
          <Button key={i} shape="circle" scale="lg" value="BNB" />
        ))}
      </MainComp>
      <MainComp
        tip="Balance Input"
        flex={6}
        flexDirection={isMobile ? 'row' : 'column'}
        justifyContent="space-around"
        alignItems="center"
        tipSize={3}
        demo={<Skeleton size={isMobile ? flexSize * 3.5 : isTablet ? flexSize * 2.5 : flexSize * 2} />}
      >
        <BalanceInput
          onUserInput={(e) => setValue(e)}
          value={value}
          maxValue={200}
          unit="STTS"
          size={isMobile ? flexSize * 4 : isTablet ? flexSize * 3 : flexSize * 2}
        />
      </MainComp>
      <MainComp
        tip="Long Press Button"
        flex={6}
        justifyContent="space-around"
        alignItems="center"
        tipSize={3}
        demo={<Skeleton size={80} />}
      >
        <LongPressButton shape="circle" size={80} onClick={() => console.log('object')} />
      </MainComp>
    </MainFlex>
  )
}
