import { Children, cloneElement, isValidElement } from 'react'

const recursiveRouteMap = (children: any, comporder = 0): any => {
  return Children.map(children, (child: any) => {
    if (!isValidElement(child)) {
      return child
    }
    const { type: Comp, props } = child as any
    const name = Comp.displayName || Comp.name || Comp.$$typeof || 'nothing'
    const nameArray = typeof name === 'symbol' ? name.description : name.match(/[A-Z][a-z]+/g)

    if (nameArray && nameArray[0] === 'Main') {
      if (typeof Comp === 'function') {
        return Children.map(Comp({ ...props, comporder }), (child: any) =>
          recursiveRouteMap(child, comporder <= 1 ? 1 : 2),
        )
      }
      return cloneElement(child, {
        // @ts-ignore
        comporder,
        children: recursiveRouteMap(props.children, comporder + 1),
      })
    }
    if (nameArray && nameArray[0] === 'Updater') {
      return cloneElement(child, {
        // @ts-ignore
        comporder: 0,
      })
    }

    if (props.children) {
      return cloneElement(child, {
        // @ts-ignore
        comporder,
        children: recursiveRouteMap(props.children, comporder + 1),
      })
    }
    // @ts-ignore
    return cloneElement(child, { comporder })
  })
}

export default recursiveRouteMap
