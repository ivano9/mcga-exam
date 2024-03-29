'use strict'

const { Schema, model } = require('mongoose')
const uuid = require('uuid')

const ordersSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    number: {
      type: String,
      required: [true, 'Number of order is required.'],
      unique: true,
    },
    deliveryDateTime: {
      type: Number,
      required: [true, 'Dispatch date is required.'],
    },
    address: { type: String, required: [true, 'Address is required.'] },
    deliverer: {
      type: String,
      ref: 'Employees',
      required: [true, 'Deliverer is required.'],
    },
    state: {
      type: String,
      enum: {
        values: ['CANCELED', 'DELIVERED', 'ON THE WAY', 'PREPARING'],
        message: '{VALUE} is not supported.',
      },
      required: [true, 'State is required.'],
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required.'],
    },
    customerPhone: {
      type: String,
      validate: {
        validator: (v) =>
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(v),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, 'Customer phone number is required.'],
    },
    deliverType: {
      type: String,
      enum: {
        values: ['NON-CONTACT', 'IN-CONTACT'],
        message: '{VALUE} is not supported.',
      },
    },
    amount: { type: Number, required: [true, 'The amount is required.'] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

module.exports = model('Orders', ordersSchema)
