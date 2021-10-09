'use strict'

const { ordersModel } = require('../models')

const list = async (res, query) => {
  if (!query)
    return res.status(200).json({
      data: await ordersModel.find(),
      error: false,
    })

  const orders = await ordersModel.find(query).exec()
  return res.status(200).json({
    data: !orders ? 'Not orders to show' : orders,
    error: false,
  })
}

const fetch = async (res, id) => {
  const result = await ordersModel.findById(id).exec()
  return !result
    ? res.status(404).json({
        data: 'Order not found',
        error: true,
      })
    : res.status(201).json({
        data: result,
        error: false,
      })
}

module.exports = { list, fetch }
