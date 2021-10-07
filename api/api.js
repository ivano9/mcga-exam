'use strict'

const express = require('express')

const app = express()


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
