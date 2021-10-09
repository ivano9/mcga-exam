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

module.exports = {
  getOrders,
}
