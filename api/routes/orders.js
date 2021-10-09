'use strict'

const express = require('express')
const router = express.Router()
const {
  getOrders,
  getOrderById,
  createOrder,
} = require('../controllers/orders')

router.route('/').get(getOrders)

router.route('/:id').get(getOrderById)

router.route('/').post(createOrder)

module.exports = router
