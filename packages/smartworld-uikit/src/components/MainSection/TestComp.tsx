import React, { useEffect } from 'react'
import { RouteProps } from 'react-router'
import { Skeleton } from '../Skeleton'
import { ReverseFlex } from '../Box'
import MainComponent from './MainComponent'

export const Updater = ({ comp }: { comp: string }) => {
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

const MainInvestment: React.FC<RouteProps> = (props) => {
  return (
    <>
      <MainDeposit />
      <MainWithdraw />
      <MainDetails />
    </>
  )
}

const MainWithdraw = () => {
  return (
    <ReverseFlex>
      <MainComponent tip="Withdraw Circle" flex={12} justifyContent="space-around" alignItems="center" tipSize={3}>
        <Skeleton size={150} />
      </MainComponent>
    </ReverseFlex>
  )
}

const MainDetails = () => {
  return (
    <ReverseFlex>
      <MainComponent tip="Withdraw Circle" flex={12} justifyContent="space-around" alignItems="center" tipSize={3}>
        <Skeleton size={80} />{' '}
      </MainComponent>
    </ReverseFlex>
  )
}
const MainDeposit = () => {
  return (
    <ReverseFlex>
      <MainComponent
        tip="Token Selection"
        flex={3}
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
      >
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} shape="circle" scale="lg" />
        ))}
      </MainComponent>
      <MainComponent
        tip="Balance Input"
        flex={6}
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        tipSize={3}
      >
        <Skeleton size={150} />
      </MainComponent>
      <MainComponent tip="Long Press Button" flex={3} justifyContent="space-around" alignItems="center" tipSize={3}>
        <Skeleton size={80} />{' '}
      </MainComponent>
    </ReverseFlex>
  )
}
export default MainInvestment
