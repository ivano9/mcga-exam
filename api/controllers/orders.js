'use strict'

const { ordersService } = require('../service')

const getCustomers = (req, res) => {
  const type = req.query.type
  try {
    return customersRepository.list(res, type)
  } catch (err) {
    return res.status(500).json({
      data: `Something wrong while listing the customers. Error: ${err}`,
      error: true,
    })
  }
}
