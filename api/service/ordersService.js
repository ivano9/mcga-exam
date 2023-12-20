'use strict'

const { ERROR_CODE_INVALID_DATA, ERROR_CODE_NOT_FOUND } = require('../const.js')
const { ordersModel } = require('../models')
const { orderNumber } = require('../utils.js')

const list = async (res, query) => {
  if (!query)
    return res.status(200).json({
      data: await ordersModel.find(),
      error: false,
    })

  const orders = await ordersModel.find(query).exec()
  return res.status(200).json({
    data: orders,
    error: false,
  })
}

const fetch = async (id) => await ordersModel.findById(id).exec()

const create = async (res, data) => {
  try {
    data.number = orderNumber()
    data.deliveryDateTime = Date.now()
    const order = ordersModel(data)

    return res.status(200).json({
      data: await order.save(),
      error: false,
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      code: ERROR_CODE_INVALID_DATA,
      message: `Invalid data. Error: ${err}`,
    })
  }
}

const update = (res, id, data) => {
  ordersModel
    .findOneAndUpdate({ _id: id }, data, { runValidators: true, new: true })
    .then((result) =>
      !result
        ? res.status(404).json({
            code: ERROR_CODE_NOT_FOUND,
            message: 'Order not found',
          })
        : res.status(200).json({
            data: result,
            error: false,
          })
    )
    .catch((err) =>
      res.status(422).json({
        code: ERROR_CODE_INVALID_DATA,
        message: err.message,
      })
    )
}

const remove = async (res, id) => {
  const result = await ordersModel.findByIdAndRemove(id)
  return !result
    ? res.status(404).json({
        code: ERROR_CODE_NOT_FOUND,
        message: 'Order not found',
      })
    : res.status(204).json()
}

module.exports = { list, fetch, create, update, remove }
