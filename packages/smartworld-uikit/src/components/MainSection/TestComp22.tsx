import React, { useState } from 'react'
import Text from '../Text/Text'
import { Button } from '../Button'
import { BalanceInput } from '../BalanceInput'
import { WithdrawCircle } from '../WithdrawCircle'
import { TooltipText } from '../Text'
import { LongPressButton } from '../LongPressButton'
import { Skeleton } from '../Skeleton'
import { ReverseFlex } from '../Box'
import { Updater } from './TestComp'
import { RouteProps } from 'react-router'
import { MainComp } from '.'

export const MainPool: React.FC<RouteProps> = (props) => {
  return (
    <>
      <Updater comp="pool" />
      <Deposit />
      <Withdraw />
      <Details />
    </>
  )
}

const Withdraw = () => {
  return (
    <ReverseFlex>
      <MainComp
        tip="Withdraw Circle"
        flex={8}
        justifyContent="space-around"
        alignItems="center"
        tipSize={4}
        demo={<Skeleton size={180} />}
      >
        <WithdrawCircle
          name="WHITHDRAW"
          percent={1006.086957}
          onClick={() => console.log('Whithdraw')}
          onUnitClick={() => console.log('Unit Clicked!')}
          totalValue="200"
          totalValueUnit="USD"
          size={180}
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
    </ReverseFlex>
  )
}

const Details = () => {
  return (
    <ReverseFlex>
      <MainComp
        tip="Withdraw Circle"
        flex={6}
        justifyContent="space-around"
        alignItems="center"
        tipSize={4}
        demo={<Skeleton size={80} />}
      >
        <LongPressButton shape="circle" size={80} onClick={() => console.log('object')} />
      </MainComp>
    </ReverseFlex>
  )
}
const Deposit = () => {
  const [value, setValue] = useState('100')

  return (
    <ReverseFlex>
      <MainComp
        tip="Token Selection"
        flex={6}
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        tipSize={3}
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
        flex={8}
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        tipSize={3}
        demo={<Skeleton size={180} />}
      >
        <BalanceInput onUserInput={(e) => setValue(e)} value={value} maxValue={200} unit="STTS" size={180} />
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
    </ReverseFlex>
  )
}

export default MainPool
