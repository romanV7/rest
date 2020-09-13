const mysqlConnection = require('../connection')

const createToken = (token, callback) => {
  const sql = 'INSERT INTO tokens SET ?'
  mysqlConnection.query(sql, token, (err, result) => {
    callback(err, result)
  })
}

const findTokenByUserId = (id, callback) => {
  const sql = `SELECT * FROM tokens WHERE refresh = '${id}'`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

const findTokenByPayload = (token, callback) => {
  const sql = `SELECT * FROM tokens WHERE payload = '${token}'`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

const deleteToken = (token, callback) => {
  const sql = `DELETE FROM tokens WHERE payload = '${token}'`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

const findAll = (param, callback) => {
  const sql = `SELECT * FROM tokens`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

module.exports = {
  createToken,
  findTokenByUserId,
  findTokenByPayload,
  deleteToken,
  findAll
}
