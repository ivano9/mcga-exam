'use strict'

const { ordersModel } = require(__dirname + '/../models')
const { address, datatype, name, phone, system } = require('faker')
const { connect, disconnect, dropCollection } = require(__dirname +
  '/../config/dbConnection')

const TOTAL_ORDERS = 500

const seedOrders = async () => {
  try {
    await connect()
    await dropCollection('orders')
    await ordersModel.insertMany(buildSetOfOrders())
  } catch (err) {
    console.error(err.stack)
  } finally {
    await disconnect()
  }
}

const buildSetOfOrders = () => {
  let orders = []
  for (let i = 0; i < TOTAL_ORDERS; i++) {
    let order = {
      number: `${system.fileExt()}-${datatype.number()}`,
      deliveryDateTime: Date.now(),
      address: address.streetAddress(),
      deliverer: datatype.uuid(),
      state: choseRandomStates(),
      customerName: name.firstName(),
      customerPhone: phone.phoneNumberFormat(),
      deliverType: choseDeliverType(),
      amount: datatype.number(),
    }
    orders.push(order)
  }
  return orders
}

const choseRandomStates = () => {
  const states = ['CANCELED', 'DELIVERED', 'ON THE WAY', 'PREPARING']
  const randIdx = Math.floor(Math.random() * states.length)
  return states[randIdx]
}

const choseDeliverType = () =>
  Math.random() > 0.5 ? 'NON-CONTACT' : 'IN-CONTACT'

module.exports = seedOrders
