'use strict'

const { ordersModel } = require('../models')

const list = async (res, category) => {
  if (!category)
    return res.status(200).json({
      data: await ordersModel.find(),
      error: false,
    })

  const orders = await ordersModel.find({ category }).exec()
  return res.status(200).json({
    data: !orders ? 'Not orders to show' : orders,
    error: false,
  })
}
