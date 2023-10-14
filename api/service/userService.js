'use strict'

const bcrypt = require('bcrypt')
const { userModel } = require('../models')
const logger = require('../config/logger')

const list = async () => await userModel.find({})

const create = async (data) => {
  data.password = await bcrypt.hash(data.password, 10)

  try {
    const user = userModel(data)
    return fetch(await user.save())
  } catch (err) {
    logger.error(
      'Message: Unexpected error while saving in db.\nError: %s',
      err
    )

    throw err
  }
}

const update = async (id, data) =>
  await userModel.findByIdAndUpdate(id, data, { new: true })

const find = async (pattern) => await userModel.find(pattern).exec()

const findOne = async (pattern, opts = {}) =>
  await userModel.findOne(pattern).select(opts).exec()

const fetch = async (userId) => await userModel.findById(userId).exec()

const remove = async (userId) => await userModel.findByIdAndRemove(userId)

module.exports = {
  create,
  update,
  remove,
  fetch,
  find,
  findOne,
  list,
}
