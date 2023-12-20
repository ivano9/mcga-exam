'use strict'
const logger = require('../config/logger')
const { ordersService } = require('../service')

const { ERROR_CODE_UNEXPECTED, ERROR_CODE_NOT_FOUND } = require('../const')

const getOrders = (req, res) => {
  const query = req.query
  try {
    return ordersService.list(res, query)
  } catch (err) {
    logger.error('Unexpected error. Error: ', err)
    return res.status(500).json({
      code: ERROR_CODE_UNEXPECTED,
      message: `Error while fetching order. Error: ${err}`,
    })
  }
}

const getOrderById = (req, res) => {
  const { id } = req.params
  try {
    const result = ordersService.fetch(id)
    if (result === null)
      return res.status(404).json({
        code: ERROR_CODE_NOT_FOUND,
        message: 'The resources not found.',
      })

    res.status(201).json(result)
  } catch (err) {
    logger.error('Unexpected error. Error: ', err)
    return res.status(500).json({
      code: ERROR_CODE_UNEXPECTED,
      message: `Error while fetching order. Error: ${err}`,
    })
  }
}

const createOrder = async (req, res) => {
  const data = req.body
  try {
    return await ordersService.create(res, data)
  } catch (err) {
    logger.error('Unexpected error. Error: ', err)
    return res.status(500).json({
      code: ERROR_CODE_UNEXPECTED,
      message: `Error while creating order. Error: ${err}`,
    })
  }
}

const updateOrder = (req, res) => {
  const { id } = req.params
  const data = req.body
  try {
    return ordersService.update(res, id, data)
  } catch (err) {
    logger.error('Unexpected error. Error: ', err)
    return res.status(500).json({
      code: ERROR_CODE_UNEXPECTED,
      message: `Error while updating order. Error: ${err}`,
    })
  }
}

const removeOrder = (req, res) => {
  const { id } = req.params
  try {
    return ordersService.remove(res, id)
  } catch (err) {
    logger.error('Unexpected error. Error: ', err)
    return res.status(500).json({
      code: ERROR_CODE_UNEXPECTED,
      message: `Error while removing order. Error: ${err}`,
    })
  }
}
module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  removeOrder,
}
