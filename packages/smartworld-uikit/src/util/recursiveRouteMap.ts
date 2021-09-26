import { Children, cloneElement, isValidElement } from 'react'
import { useLocation } from 'react-router'

const recursiveRouteMap = (children: any, comporder = 'First'): any => {
  const { pathname } = useLocation()

  return Children.map(children, (child: any) => {
    if (!isValidElement(child)) {
      return child
    }
    const { type: Comp, props } = child as any
    const name = Comp.displayName || Comp.name || Comp.$$typeof || 'nothing'
    const nameArray = typeof name === 'symbol' ? name.description : name.match(/[A-Z][a-z]+/g)

    if (nameArray && nameArray[0] !== 'Redirect' && nameArray[0] === 'Route') {
      const { component: Comp } = props as any
      const name = Comp?.displayName || Comp?.name || Comp?.$$typeof.description || 'nothing'

      const pathArray = typeof props.path === 'string' ? [props.path] : props.path

      if (name === 'react.lazy' && pathArray.includes(pathname)) {
        const lazy = Comp._init(Comp._payload)
        return cloneElement(lazy(), {
          // @ts-ignore
          comporder,
          pathArray,
          children: Children.map(lazy(), (child: any) => recursiveRouteMap(child, 'Second')),
        })
      } else if (typeof Comp === 'function') {
        return Comp({ ...props, comporder })
      }

      return cloneElement(child, {
        // @ts-ignore
        comporder: 'Last',
      })
    }

    if (nameArray && nameArray[0] === 'Main') {
      if (typeof Comp === 'function') {
        return Children.map(Comp({ ...props, comporder }), (child: any) => recursiveRouteMap(child, 'Second'))
      } else {
        return cloneElement(child, {
          // @ts-ignore
          comporder,
          children: recursiveRouteMap(props.children, 'Third'),
        })
      }
    }

    if (nameArray && nameArray[0] === 'Updater') {
      return cloneElement(child, {
        // @ts-ignore
        comporder: 'Last',
      })
    }

    if (props.children) {
      return cloneElement(child, {
        // @ts-ignore
        comporder,
        children: recursiveRouteMap(props.children, 'Last'),
      })
    }
    // @ts-ignore
    return cloneElement(child, { comporder })
  })
}

export default recursiveRouteMap
