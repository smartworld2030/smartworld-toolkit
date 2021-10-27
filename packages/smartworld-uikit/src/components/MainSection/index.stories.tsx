import React, { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatedTipFlex, AnimatedFlex, MainFlex } from '../Box/Flex'
import MainSection from './MainSection'
import MainSection2 from './MainSection2'
import { LogoIcon, SwapIcon, NoProfileAvatarIcon, CogIcon } from '../Svg'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toggle } from '../Toggle'
import { MainRoute } from './Component'
import { Updater } from './TestComp'
import { Spinner } from '../Spinner'
import MainPool from './TestComp2'
import MainInvestment from './TestComp'

const MainPool2 = lazy(() => import('./TestComp22'))
const MainInvestment2 = lazy(() => import('./TestComp21'))

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
              background="red"
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
              <MainInvestment2 exact strict path={['/iframe.html', '/invest']} />
              <Route exact strict path="/pool" component={MainPool2} />
              <MainRoute exact strict path={['/swap', '/freeze']}>
                <Updater comp="swap" />
                <MainFlex>
                  <div>swap</div>
                </MainFlex>
              </MainRoute>
              <Route exact path="/iframe.html">
                <Redirect to="/pool" />
              </Route>
            </MainSection>
          </Switch>
        </Suspense>
      </Router>
      <MainFlex height="50vh" />
    </>
  )
}

export const Example2: React.FC = () => {
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
            <Spinner />
          </>
        }
      >
        <Switch>
          <MainSection2
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
            <MainInvestment exact strict path={['/iframe.html', '/invest']} />
            <MainPool exact strict path="/pool" />
            <MainRoute exact strict path={['/swap', '/freeze']}>
              <Updater comp="swap" />
              <MainFlex>
                <div>swap</div>
              </MainFlex>
            </MainRoute>
            <Route exact path="/iframe.html">
              <Redirect to="/pool" />
            </Route>
            <div>Test</div>
          </MainSection2>
        </Switch>
      </Suspense>
    </Router>
  )
}
