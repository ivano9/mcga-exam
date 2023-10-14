'use strict'

const { ERROR_CODE_INVALID_DATA } = require('../const')
const isValidPassword = (password, passwordConfirmation) =>
  !!password &&
  !!passwordConfirmation &&
  password === passwordConfirmation &&
  password.length > 6

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
