import { Children, cloneElement, isValidElement } from 'react'

const recursiveMap = (children: any, compOrder = 'First'): any => {
  return Children.map(children, (child: any) => {
    if (!isValidElement(child)) {
      return child
    }
    const { type: Comp, props } = child as any
    const name = Comp.displayName || Comp.name
    const nameArray = name?.match(/[A-Z][a-z]+/g)

    if (nameArray && nameArray[0] === 'Main') {
      if (typeof Comp === 'function') {
        return Children.map(Comp({ ...props, compOrder }), (child: any) => recursiveMap(child, 'Second'))
      } else {
        return cloneElement(child, {
          // @ts-ignore
          compOrder,
          children: recursiveMap(props.children, 'Third'),
        })
      }
    }

    if (nameArray && nameArray[0] === 'Updater') {
      return cloneElement(child, {
        // @ts-ignore
        compOrder: 'Last',
      })
    }
    if (props.children) {
      return cloneElement(child, {
        // @ts-ignore
        compOrder,
        children: recursiveMap(props.children, 'Last'),
      })
    }
    // @ts-ignore
    return cloneElement(child, { compOrder })
  })
}

export default recursiveMap
