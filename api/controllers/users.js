'use strict'

const logger = require('../config/logger')
const { userService } = require('../service')
const {
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_UNEXPECTED,
  ERROR_CODE_ALREADY_EXISTS,
} = require('../const')

const exist = async (email) => (await userService.find(email)).length > 0

const getUsers = async (req, res) => {
  try {
    res.status(201).json(await userService.list())
  } catch (err) {
    logger.error('Unexpected error. ', err)
    res.status(500).json({
      code: ERROR_CODE_UNEXPECTED,
      message: 'Server internal error.',
    })
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const result = await userService.fetch(id)
    if (result === null)
      return res.status(404).json({
        code: ERROR_CODE_NOT_FOUND,
        message: 'The resources not found.',
      })

    res.status(201).json(result)
  } catch (err) {
    logger.error('Unexpected error. ', err)
    res.status(500).json({
      code: ERROR_CODE_UNEXPECTED,
      message: 'Server internal error.',
    })
  }
}

const createUser = async (req, res) => {
  try {
    const data = req.body
    const { email } = data

    if (await exist({ email: email })) {
      logger.error('Email %s already exists.', email)

      return res.status(409).json({
        code: ERROR_CODE_ALREADY_EXISTS,
        message: `Email ${email} already exists.`,
      })
    }

    const result = await userService.create(data)

    res.status(201).json(result)
  } catch (err) {
    logger.error('Unexpected error.', err)
    res.status(500).json({
      code: ERROR_CODE_UNEXPECTED,
      message: 'Server internal error.',
    })
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const data = req.body
  try {
    if (!(await userService.fetch(id)))
      return res.status(404).json({
        code: ERROR_CODE_NOT_FOUND,
        message: 'The resource not found.',
      })

    res.status(200).json(await userService.update(id, data))
  } catch (err) {
    logger.error('Unexpected error. ', err)
    res.status(500).json({
      code: ERROR_CODE_UNEXPECTED,
      message: 'Server internal error.',
    })
  }
}

const removeUser = async (req, res) => {
  const { id } = req.params
  try {
    res.status(204).json(await userService.remove(id))
  } catch (err) {
    logger.error('Unexpected error. ', err)
    res.status(500).json({
      code: ERROR_CODE_UNEXPECTED,
      message: 'Server internal error.',
    })
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
}
