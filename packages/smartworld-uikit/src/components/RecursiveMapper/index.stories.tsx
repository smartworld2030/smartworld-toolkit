import { Children } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RecursiveMap from '../../util/recursiveRouteMap'
import { MainFlex } from '../Box'
import { MainRoute } from '../MainSection/Component'
import MainInvestment, { Updater } from '../MainSection/TestComp'

export default {
  title: 'Components/RecursiveMap',
  component: RecursiveMap,
}
export const RecursiveMaper = () => (
  <Router>
    <Mapping>
      <MainInvestment exact strict path={['/iframe.html', '/invest']} />
      <MainRoute exact strict path={['/swap', '/freeze']}>
        <Updater comp="swap" />
        <MainFlex>
          <div>swap</div>
        </MainFlex>
      </MainRoute>
      <div>swap</div>
    </Mapping>
  </Router>
)

const Mapping = ({ children }) => {
  console.log(RecursiveMap(children))
  return (
    <pre>
      <code>{Children.map(RecursiveMap(children), (child) => JSON.stringify(child, safeStringify(), 2))}</code>
    </pre>
  )
}

// safely handles circular references
const safeStringify = () => {
  const seen = new WeakSet()
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  }
}
