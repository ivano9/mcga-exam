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
const { authAdminRequest } = require('../middlewares/authorizationAccess')

router.route('/').get(getOrders)

router.get('/:id', authAdminRequest, getOrderById)

router.post('/', authAdminRequest, createOrder)

router.patch('/:id', authAdminRequest, updateOrder)

router.delete('/:id', authAdminRequest, removeOrder)

module.exports = router
