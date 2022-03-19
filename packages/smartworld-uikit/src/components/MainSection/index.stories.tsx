import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { AnimatedTipFlex, AnimatedFlex, MainFlex } from '../Box/Flex'
import MainSection from './MainSection'
import { LogoIcon, SwapIcon, NoProfileAvatarIcon, CogIcon } from '../Svg'
import { Toggle } from '../Toggle'

export default {
  title: 'Components/MainSection',
  component: MainSection,
  argTypes: {},
}

export const Example: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const refFunction = (ref: HTMLDivElement) => {
    console.log(ref?.getBoundingClientRect())
  }
  return (
    <>
      <Router>
        <Suspense
          fallback={
            <>
              {console.log('loading')}
              <Spinner />
            </>
          }
        >
          <Switch>
            <MainSection
              // transition={{
              //   from: { opacity: 0, marginTop: '-300px' },
              //   enter: { opacity: 1, marginTop: '0px' },
              //   leave: { opacity: 0, marginTop: '-150px' },
              // }}
              refFunc={refFunction}
              loading={loading}
              list={{
                links: [
                  {
                    label: 'INVESTMENT',
                    path: ['/invest'],
                    icon: <LogoIcon onClick={() => setLoading((prev) => !prev)} />,
                  },
                  { label: 'SWAP', path: ['/swap'], icon: <SwapIcon onClick={() => setLoading((prev) => !prev)} /> },
                  { label: 'POOL', path: ['/pool'], icon: <SwapIcon onClick={() => setLoading((prev) => !prev)} /> },
                ],
                default: '/invest',
              }}
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
              <MainInvestment path="/iframe.html" />
            </MainSection>
          </Switch>
        </Suspense>
      </Router>
      <MainFlex height="50vh" />
    </>
  )
}
