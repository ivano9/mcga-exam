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

const create = async (res, data) => {
  const order = ordersModel(data)
  try {
    return res.status(200).json({
      data: await order.save(),
      error: false,
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      message: `Invalid data. Error: ${err}`,
      error: true,
    })
  }
}

const update = (res, id, data) => {
  ordersModel
    .findOneAndUpdate({ _id: id }, data, { runValidators: true, new: true })
    .then((result) =>
      res.status(200).json({
        data: result,
        error: false,
      })
    )
    .catch((err) =>
      res.status(422).json({
        data: err.errors,
        error: true,
      })
    )
}

const remove = async (res, id) => {
  const result = await ordersModel.findByIdAndRemove(id)
  return !result
    ? res.status(404).json({
        data: 'Order not found',
        error: true,
      })
    : res.status(204).json({
        data: {},
        error: false,
      })
}

module.exports = { list, fetch, create, update, remove }
