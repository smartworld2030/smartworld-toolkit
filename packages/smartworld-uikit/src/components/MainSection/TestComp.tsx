import React, { useEffect } from 'react'
import { Skeleton } from '../Skeleton'
import { MainFlex, ReverseFlex } from '../Box'
import { MainComp } from '.'
import { RouteProps } from 'react-router'

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
      <MainComp tip="Withdraw Circle" flex={12} justifyContent="space-around" alignItems="center" tipSize={3}>
        <Skeleton size={150} />
      </MainComp>
    </ReverseFlex>
  )
}

const MainDetails = () => {
  return (
    <ReverseFlex>
      <MainComp tip="Withdraw Circle" flex={12} justifyContent="space-around" alignItems="center" tipSize={3}>
        <Skeleton size={80} />{' '}
      </MainComp>
    </ReverseFlex>
  )
}
const MainDeposit = () => {
  return (
    <ReverseFlex>
      <MainComp tip="Token Selection" flex={3} flexDirection={'row'} justifyContent="space-around" alignItems="center">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} shape="circle" scale="lg" />
        ))}
      </MainComp>
      <MainComp
        tip="Balance Input"
        flex={6}
        flexDirection={'column'}
        justifyContent="space-around"
        alignItems="center"
        tipSize={3}
      >
        <Skeleton size={150} />
      </MainComp>
      <MainComp tip="Long Press Button" flex={3} justifyContent="space-around" alignItems="center" tipSize={3}>
        <Skeleton size={80} />{' '}
      </MainComp>
    </ReverseFlex>
  )
}
export default MainInvestment
