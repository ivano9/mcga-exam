'use strict'

const express = require('express')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.get('/', (_req, res) => res.send('Servidor ok'))

app.use('/api', require('./routes'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
