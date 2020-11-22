'use strict'

const http = require('http')
const app = require('./src/app')
const mysqlConnection = require('./src/connection')

const port = process.env.PORT || 3000

const server = http.createServer(app)

server.listen(port)
