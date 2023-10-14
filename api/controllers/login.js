'use strict'

const jwt = require('jsonwebtoken')
const { generateToken, comparePassword, expires } = require('../utils')
const { userService } = require('../service')
const { ERROR_CODE_UNAUTHORIZED, ERROR_CODE_UNEXPECTED } = require('../const')
const logger = require('../config/logger')

// const storeSession = (id, token) =>
//     cacheSessions.push(token)
//     user.id
const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await userService.findOne(
      { email: email },
      { password: 1, scope: 1 }
    )

    if (!user)
      return res.status(401).json({
        code: ERROR_CODE_UNAUTHORIZED,
        message: 'Invalid email or password',
      })

    if (!(await comparePassword(password, user.password)))
      return res.status(401).json({
        code: ERROR_CODE_UNAUTHORIZED,
        message: 'Invalid email or password',
      })

    const exp = expires()
    const token = generateToken(user, exp)
    // storeSession(user.id, token)

    res.status(200).json({
      access_token: token,
      scope: user.scope,
      expires_in: exp,
    })
  } catch (err) {
    logger.error('Unexpected error. Error: %s', err)
    res.status(500).json({
      code: ERROR_CODE_UNEXPECTED,
      message: 'Unexpected error.',
    })
  }
}

module.exports = {
  login,
}
