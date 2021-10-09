'use strict'

const { ordersService } = require('../service')

const getOrders = (req, res) => {
  const { customer_name } = req.query

  try {
    return ordersService.list(res, customer_name)
  } catch (err) {
    return res.status(500).json({
      data: `Something wrong while listing the customers. Error: ${err}`,
      error: true,
    })
  }
}

module.exports = {
  getOrders,
}
