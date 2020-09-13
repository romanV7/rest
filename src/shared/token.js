require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports.generateAccessToken = (user, callback) => {
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.EXPIRES_IN}, (err, result) => {
    callback(err, result)
 })
}

module.exports.generateRefreshToken = (user, callback) => {
  jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, (err, result) => {
    callback(err, result)
  })
}

module.exports.checkToken = (payload, callback) => {
  jwt.verify(payload, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    callback(err, user)
  })
}
