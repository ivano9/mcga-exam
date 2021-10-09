'use strict'

const express = require('express')
const router = express.Router()
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  removeOrder,
} = require('../controllers/orders')

router.route('/').get(getOrders)

router.route('/:id').get(getOrderById)

router.route('/').post(createOrder)

router.route('/').patch(updateOrder)

router.route('/:id').delete(removeOrder)

module.exports = router
