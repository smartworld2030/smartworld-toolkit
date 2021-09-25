import { useState, useEffect } from 'react'

const useLongPress = (startFunc = () => {}, endFunc = () => {}, doneFunc = () => {}, ms = 300) => {
  const [startLongPress, setStartLongPress] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let timerId: NodeJS.Timeout
    let countdown: NodeJS.Timeout
    const endingFunction = () => {
      endFunc()
      clearTimeout(timerId)
      if (!countdown) clearTimeout(countdown)
    }
    if (startLongPress) {
      startFunc()
      setDone(false)
      timerId = setTimeout(() => {
        countdown = setTimeout(() => setDone(false), ms)
        setDone(true)
        doneFunc()
      }, ms)
    } else {
      endingFunction()
    }

    return () => {
      endingFunction()
    }
  }, [ms, startLongPress])

  return {
    done,
    setDone,
    props: {
      onMouseDown: () => setStartLongPress(true),
      onMouseUp: () => setStartLongPress(false),
      onMouseLeave: () => setStartLongPress(false),
      onTouchStart: () => setStartLongPress(true),
      onTouchEnd: () => setStartLongPress(false),
    },
  }
}

export default useLongPress
