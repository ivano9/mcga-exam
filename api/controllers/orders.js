'use strict'

const { ordersService } = require('../service')

const getOrders = (req, res) => {
  const query = req.query
  try {
    return ordersService.list(res, query)
  } catch (err) {
    return res.status(500).json({
      data: `Something wrong while listing the customers. Error: ${err}`,
      error: true,
    })
  }
}

const getOrderById = (req, res) => {
  const { id } = req.params
  try {
    return ordersService.fetch(res, id)
  } catch (err) {
    return res.status(500).json({
      message: err,
      error: true,
    })
  }
}

const createOrder = (req, res) => {
  const data = req.body
  try {
    return ordersService.create(res, data)
  } catch (err) {
    return res.status(500).json({
      data: `Something wrong while listing the customers. Error: ${err}`,
      error: true,
    })
  }
}

const updateOrder = (req, res) => {
  const { id } = req.params
  const data = req.body
  try {
    return ordersService.update(res, id, data)
  } catch (err) {
    return res.status(500).json({
      message: err,
      error: true,
    })
  }
}

const removeOrder = (req, res) => {
  const { id } = req.params
  try {
    return ordersService.remove(res, id)
  } catch (err) {
    return res.status(500).json({
      message: err,
      error: true,
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
