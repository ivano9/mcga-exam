'use strict'

const express = require('express')
const router = express.Router()
const {
  getOrders
} = require('../controllers/orders')

router.route('/').get(getOrders)

module.exports = router
