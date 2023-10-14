'use strict'

const { Schema, model } = require('mongoose')
const uuid = require('uuid')

const userSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    scope: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

module.exports = model('users', userSchema)
