'use strict'

require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateAccessToken = (user, callback) => {
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.EXPIRES_IN}, (err, result) => {
    callback(err, result)
 })
}

const generateRefreshToken = (user, callback) => {
  jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, (err, result) => {
    callback(err, result)
  })
}

const checkToken = (payload, callback) => {
  jwt.verify(payload, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    callback(err, user)
  })
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  checkToken
}
