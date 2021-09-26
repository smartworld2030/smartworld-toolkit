import { Children, cloneElement, isValidElement } from 'react'

const recursiveRouteMap = (children: any, comporder = 'First'): any => {
  return Children.map(children, (child: any) => {
    if (!isValidElement(child)) {
      return child
    }
    const { type: Comp, props } = child as any
    const name = Comp.displayName || Comp.name || Comp.$$typeof || 'nothing'
    const nameArray = typeof name === 'symbol' ? name.description : name.match(/[A-Z][a-z]+/g)

    if (nameArray && nameArray[0] !== 'Redirect' && nameArray[0] === 'Route') {
      const { children, component, ...routeRest } = props
      const childs = children || component
      const { type: Comp, ...rest } = childs as any

      const name = childs?.displayName || childs?.name || childs?.$$typeof?.description || 'nothing'

      const pathArray = typeof props.path === 'string' ? [props.path] : props.path
      console.log(childs)
      if (name === 'react.lazy') {
        const lazy = childs._init(childs._payload)
        return cloneElement(lazy(), {
          ...routeRest,
          // @ts-ignore
          comporder,
          pathArray,
          children: Children.map(lazy(), (child: any) => recursiveRouteMap(child, 'Second')),
        })
      } else if (typeof Comp === 'function') {
        return cloneElement(Comp(rest), {
          ...routeRest,
          comporder,
          pathArray,
          component: Children.map(Comp(rest), (child: any) => recursiveRouteMap(child, 'Second')),
        })
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
