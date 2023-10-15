'use strict'

const PREFIX = 'com.orders.error.'
const ERROR_CODE_INVALID_DATA = PREFIX + 'invalid_data'
const ERROR_CODE_NOT_FOUND = PREFIX + 'not_found'
const ERROR_CODE_UNAUTHORIZED = PREFIX + 'unauthorized'
const ERROR_CODE_UNEXPECTED = PREFIX + 'unexpected_error'
const ERROR_CODE_ALREADY_EXISTS = PREFIX + 'already_exists'

const SECRET_KEY = process.env.SECRET_KEY || 'Orders@pp333'
const ENVIRONMENT = process.env.ENV || 'dev'

module.exports = {
  ERROR_CODE_INVALID_DATA,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_UNAUTHORIZED,
  ERROR_CODE_UNEXPECTED,
  ERROR_CODE_ALREADY_EXISTS,

  SECRET_KEY,
  ENVIRONMENT,
}
