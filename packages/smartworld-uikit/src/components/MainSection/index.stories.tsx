import React, { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatedTipFlex, AnimatedFlex, MainFlex } from '../Box/Flex'
import MainSection from './MainSection'
import { LogoIcon, SwapIcon, NoProfileAvatarIcon, CogIcon } from '../Svg'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toggle } from '../Toggle'
import { MainRoute } from './Component'
import { Updater } from './TestComp'
import { Spinner } from '../Spinner'

const MainPool = lazy(() => import('./TestComp2'))
const MainInvestment = lazy(() => import('./TestComp'))

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
      <Suspense
        fallback={
          <>
            {console.log('loading')}
            loading...
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
            <Route exact strict path="/pool" component={MainPool} />
            <Route exact strict path={['/invest', '/investment']} component={MainInvestment} />
            <Route exact strict path="/swap">
              <MainRoute>
                <Updater comp="swap" />
                <MainFlex>
                  <div>swap</div>
                </MainFlex>
              </MainRoute>
            </Route>
            <Route exact path="/iframe.html">
              <Redirect to="/pool" />
            </Route>
          </MainSection>
        </Switch>
      </Suspense>
    </Router>
  )
}
