'use strict'

const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
  number: { type: Number, required: [true, 'Number of order is required.'] },
  deliveryDateTime: { type: Date, required: [true, 'Dispach date is required.'] },
  address: { type: String, required: [true, 'Address is required.'] },
  deliverer: { type: Schema.Types.ObjectId, ref: 'Employe', required: [true, 'Deliverer is required.'] },
  state: {
    type: String,
    enum: {
      values: ['CANCELED', 'DELIVERED', 'ON THE WAY', 'PREPARING'],
      message: '{VALUE} is not supported.'
    },
    required: [true, 'State is required.']
  },
  customerName: { type: String, required: [true, 'Customer name is required.'] },
  customerPhone: {
    type: String,
    validate: {
      validator: (v) => /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`
    },
    required: [true, 'Customer phone number is required.']
  },
  deliverType: {
    type: String,
    enum: {
      values: ['NON-CONTACT', 'IN-CONTACT'],
      message: '{VALUE} is not supported.'
    }
  },
  amount: { type: Number, required: [true, 'The amount is required.'] }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('Orders', ordersSchema)
