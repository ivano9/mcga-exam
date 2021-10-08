'use strict'

const { Schema, model } = require('mongoose')
const uuid = require('uuid')

const employeSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    first_name: {
      type: String,
      required: [true, 'Employe first name is required'],
    },
    last_name: {
      type: String,
      required: [true, 'Employe last name is required'],
    },
    street: {
      type: String,
      required: [true, 'Employe street is required'],
    },
    city: String,
    email: {
      type: String,
      validate: {
        validator: (v) =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ),
        message: (props) => `${props.value} is not a valid email!`,
      },
      required: [true, 'Employe email is required'],
      unique: true,
    },
    phone: {
      type: String,
      validate: {
        validator: (v) =>
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(v),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, 'Employe phone number is required'],
      unique: true,
    },
    state: String,
    country: String,
    is_active: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

module.exports = model('Employes', employeSchema)
