'use strict'

const { ENVIRONMENT } = require('./const')
const express = require('express')
const { connect } = require('./config/dbConnection')
const cors = require('cors')
const logger = require('./config/logger')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use(cors())
app.options('*', cors())

app.get('/', (_req, res) => res.send('Servidor ok'))

app.use('/api/v1.0', require('./routes'))

logger.info('ENVIRONMENT: %s', ENVIRONMENT)

connect()
const PORT = PORT || 3000
app.listen(PORT, () => {
  logger.info('API running on http://localhost:%s', PORT)
})
