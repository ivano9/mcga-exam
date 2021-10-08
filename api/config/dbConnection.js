'use strict'

const mongoose = require('mongoose')

if (
  process.env.ENV != 'production' &&
  require('dotenv').config({ path: __dirname + '/../../.env' }).error
)
  throw new Error('Error while setting the environments variables')

const { MONGO_STR_CON } = process.env

const connect = async () => {
  try {
    await mongoose.connect(MONGO_STR_CON, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Mongodb connected')
  } catch (err) {
    console.error(
      `Error was ocurred when tried to connect to mongodb... error: ${err}`
    )
  }
}

const disconnect = async () => {
  try {
    await mongoose.disconnect()
    console.log('Mongodb disconnected')
  } catch (err) {
    console.error(`Error while disconnecting the mongo, error: ${err}`)
  }
}

const dropCollection = async (collection) => {
  try {
    await mongoose.connection.db.dropCollection(collection)
    console.log(`Collection ${collection} droped!`)
  } catch (err) {
    console.error(`Error while droping the collection, error: ${err}`)
  }
}

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err)
  process.exit(1)
})

module.exports = {
  connect,
  disconnect,
  dropCollection,
}
