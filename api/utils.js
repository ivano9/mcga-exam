'use strict'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { SECRET_KEY } = require('./const')
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
const comparePassword = async (password, hashedPassword) =>
  await bcrypt.compare(password, hashedPassword)

const generateToken = (user, exp) =>
  jwt.sign(
    {
      sub: user.id,
      exp,
      iss: 'sso.orders.com',
      scope: user.scope,
    },
    SECRET_KEY
  )

const expires = () => Math.floor(Date.now() / 1000) + 60 * 60 // 1hour

module.exports = {
  orderNumber,
  comparePassword,
  generateToken,
  expires,
}
