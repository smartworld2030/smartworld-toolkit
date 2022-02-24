import { ReactText } from 'react'

const getFixedDecimals = (num: ReactText): string => {
  const number = Number(num)
  if (number < 0.000001) {
    const numChunks = number.toString().split('e') || []

    const numOfZeroes = Math.abs(+numChunks[1]) - 1
    let zeroes = ''
    let int = numChunks[0]

    for (let i = 0; i < int.length; i++) {
      int = int.replace('.', '')
    }

    for (let i = 0; i < numOfZeroes; i++) {
      zeroes += '0'
    }

    return `0.${zeroes}${int}`
  }
  return number.toString()
}
export default getFixedDecimals
