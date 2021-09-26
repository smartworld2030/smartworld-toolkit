import React, { useState } from 'react'
import Text from '../Text/Text'
import { Button } from '../Button'
import { BalanceInput } from '../BalanceInput'
import { WithdrawCircle } from '../WithdrawCircle'
import { TooltipText } from '../Text'
import { LongPressButton } from '../LongPressButton'
import { Skeleton } from '../Skeleton'
import { useWindowSize } from '../..'
import { MainComp, MainFlex } from '../Box'
import { MainRoute } from '.'
import { Updater } from './TestComp'
import { RouteProps } from 'react-router'

export const MainPool: React.FC<RouteProps> = (props) => {
  const { isMobile, flexSize, isTablet } = useWindowSize()
  return (
    <MainRoute {...props}>
      <Updater comp="pool" />
      <MainDeposit {...{ isMobile, isTablet, flexSize }} />
      <MainWithdraw {...{ isMobile, isTablet, flexSize }} />
      <MainDetails {...{ isMobile, isTablet, flexSize }} />
    </MainRoute>
  )
}

const MainWithdraw = ({ isMobile, flexSize, isTablet }: any) => {
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

const MainDetails = ({ isMobile, flexSize, isTablet }: any) => {
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
const MainDeposit = ({ isMobile, flexSize, isTablet }: any) => {
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

export default MainPool