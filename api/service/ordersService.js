'use strict'

const { ordersModel } = require('../models')

const list = async (res, customer_name) => {
  if (!customer_name)
    return res.status(200).json({
      data: await ordersModel.find(),
      error: false,
    })

  const orders = await ordersModel.find({ customerName: customer_name }).exec()
  return res.status(200).json({
    data: !orders ? 'Not orders to show' : orders,
    error: false,
  })
}

module.exports = {
  list,
}
