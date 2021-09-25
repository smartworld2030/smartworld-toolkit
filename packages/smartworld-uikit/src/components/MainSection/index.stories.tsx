import React, { useEffect, useState } from 'react'
import { AnimatedTipFlex, AnimatedFlex, MainFlex, MainComp } from '../Box/Flex'
import MainSection from './MainSection'
import Text from '../Text/Text'
import { Button } from '../Button'
import { BalanceInput } from '../BalanceInput'
import { WithdrawCircle } from '../WithdrawCircle'
import { TooltipText } from '../Text'
import { LogoIcon, SwapIcon, NoProfileAvatarIcon, CogIcon } from '../Svg'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { LongPressButton } from '../LongPressButton'
import { Skeleton } from '../Skeleton'
import { Toggle } from '../Toggle'
import { useWindowSize } from '../..'
import { MainRoute } from './Component'

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

export default {
  title: 'Components/MainSection',
  component: MainSection,
  argTypes: {},
}

export const MainSectionExample: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <Router>
      <Switch>
        <MainSection
          loading={loading}
          links={React.useMemo(
            () => [
              {
                label: 'INVESTMENT',
                href: '/invest',
                icon: <LogoIcon onClick={() => setLoading((prev) => !prev)} />,
              },
              { label: 'SWAP', href: '/swap', icon: <SwapIcon onClick={() => setLoading((prev) => !prev)} /> },
              { label: 'POOL', href: '/pool', icon: <SwapIcon onClick={() => setLoading((prev) => !prev)} /> },
            ],
            [],
          )}
          rightIcon={({ checked, onChange }) =>
            checked ? <NoProfileAvatarIcon onClick={onChange} /> : <NoProfileAvatarIcon onClick={onChange} />
          }
          leftIcon={({ checked, onChange }) =>
            checked ? <CogIcon onClick={onChange} /> : <CogIcon onClick={onChange} />
          }
          right={({ toggle: { showRight }, responsiveSize }) => (
            <AnimatedFlex {...responsiveSize(3, showRight)} flexDirection="column" justifyContent="space-around">
              <div>USER MENU</div>
            </AnimatedFlex>
          )}
          left={({ toggle: { showLeft }, isMobile, responsiveSize, showTip, tipChanger }) => (
            <AnimatedTipFlex
              {...responsiveSize(3, showLeft)}
              flexDirection={isMobile ? 'row' : 'column'}
              justifyContent="space-around"
            >
              <div>SETTING</div>
              <Toggle onChange={tipChanger} checked={showTip} />
            </AnimatedTipFlex>
          )}
        >
          <Route exact strict path={['/iframe.html', '/invest']}>
            <MainInvestment />
          </Route>
          <Route exact strict path={['/swap', '/freeze']}>
            <MainRoute>
              <Updater comp="swap" />
              <MainFlex>
                <div>swap</div>
              </MainFlex>
            </MainRoute>
          </Route>
          <Route exact strict path="/pool">
            <MainRoute>
              <Updater comp="pool" />
              <MainFlex>
                <div>pool</div>
              </MainFlex>
            </MainRoute>
          </Route>
          <Route exact path="/">
            <Redirect to="/invest" />
          </Route>
        </MainSection>
      </Switch>
    </Router>
  )
}

const MainInvestment = () => {
  const { isMobile, flexSize, isTablet } = useWindowSize()
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
        flex={3}
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
