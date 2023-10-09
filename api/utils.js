'use strict'

const choseBetween = (min, max) => {
  // generate random number
  let rand = Math.random()
  rand = Math.floor(rand * max)
  rand = rand + min
  return rand
}

const threeChars = () => {
  const chars = 'abcdefghijkmnopqrstuvwxyz'
  const lengthChars = chars.length
  let i = choseBetween(0, lengthChars)
  let j = i + 3

  if (j > lengthChars) {
    i = 0
    j = 3
  }

  let three = ''

  for (i; i < j; i++) {
    three += chars[i]
  }

  return three
}

const orderNumber = () => {
  const randNumber = Math.floor(1000 + Math.random() * 9000)
  return `${threeChars()}-${randNumber}`
}

module.exports = orderNumber
