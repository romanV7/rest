'use strict'

const mysql = require('mysql')
const config = require('./config')
const mysqlConnection = mysql.createConnection(config)

mysqlConnection.connect(err => {
  if (err) throw err
  console.log('connected to database')
})

module.exports = mysqlConnection
