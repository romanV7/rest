const express = require('express')
const mysqlConnection = require('../connection')

const Router = express.Router()

Router.get('/', (req, res) => {
  mysqlConnection.query("select * from user", (err, rows, fields) => {
    if (err) console.log(err)
    res.send(rows)
  })
})

module.exports = Router
