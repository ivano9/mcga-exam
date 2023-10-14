'use strict'

const express = require('express')
const validateUserData = require('../middlewares/validateUserData')
const router = express.Router()
const { createUser } = require('../controllers/users')

router.post('/', validateUserData, createUser)

module.exports = router
