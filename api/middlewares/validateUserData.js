'use strict'

const { ERROR_CODE_INVALID_DATA } = require('../const')
const isValidPassword = (password, passwordConfirmation) =>
  !!password &&
  !!passwordConfirmation &&
  password === passwordConfirmation &&
  password.length > 6

const isValidPhoneNumber = (phone) => {
  if (phone !== undefined)
    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(phone)
  else return true
}
const isValidUserData = (data) => {
  const map = new Map(Object.entries(data))

  for (const [key, _] of map) {
    switch (key) {
      case 'username':
        continue
      case 'email':
        continue
      case 'phone':
        continue
      case 'street':
        continue
      case 'city':
        continue
      case 'state':
        continue
      case 'country':
        continue
      case 'role':
        continue
      default:
        return false
    }
  }
}

module.exports = function validateUserData(req, res, next) {
  let { username, password, password_confirmation } = req.body

  if (username.length <= 3)
    return res.json({
      code: ERROR_CODE_INVALID_DATA,
      message: `Invalid length username ${username}. Must be an username greater or equal than 4 characters.`,
    })

  if (!isValidPassword(password, password_confirmation))
    return res.status(401).json({
      code: ERROR_CODE_INVALID_DATA,
      message: 'Invalid password.',
    })

  next()
}
