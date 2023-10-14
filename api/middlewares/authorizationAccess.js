'use strict'

const jwt = require('jsonwebtoken')
const { ERROR_CODE_UNAUTHORIZED } = require('../const')
const authAdminRequest = (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer)
    return res.status(401).json({
      code: ERROR_CODE_UNAUTHORIZED,
      message: 'Invalid token',
    })

  const token = bearer.split(' ')[1]

  try {
    req.user = jwt.verify(token, process.env.SECRET_KEY)

    if (req.user.scope !== 'admin')
      return res.status(401).json({
        code: ERROR_CODE_UNAUTHORIZED,
        message: 'Invalid token',
      })

    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({
      code: ERROR_CODE_UNAUTHORIZED,
      message: 'Invalid token.',
    })
  }
}

const authUserRequest = (req, res, next) => {
  const bearer = req.headers.authorization
  if (!bearer)
    return res.status(401).json({
      code: ERROR_CODE_UNAUTHORIZED,
      message: 'Invalid token',
    })

  const token = bearer.split(' ')[1]

  try {
    req.user = jwt.verify(token, process.env.SECRET_KEY)
    const scope = req.user.scope
    if (scope !== 'admin' && scope !== 'user')
      return res.status(401).json({
        code: ERROR_CODE_UNAUTHORIZED,
        message: 'Invalid token',
      })

    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({
      code: ERROR_CODE_UNAUTHORIZED,
      message: 'Invalid token.',
    })
  }
}

module.exports = {
  authUserRequest,
  authAdminRequest,
}
