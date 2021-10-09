'use strict'

const express = require('express')
const { connect } = require('./config/dbConnection')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.get('/', (_req, res) => res.send('Servidor ok'))

app.use('/api/v1.0', require('./routes'))

connect()
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
