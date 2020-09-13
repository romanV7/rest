const mysqlConnection = require('../connection')

module.exports.createToken = (token, callback) => {
  const sql = 'INSERT INTO tokens SET ?'
  mysqlConnection.query(sql, token, (err, result) => {
    callback(err, result)
  })
}

module.exports.findTokenByUserId = (id, callback) => {
  const sql = `SELECT * FROM tokens WHERE refresh = '${id}'`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

module.exports.findTokenByPayload = (token, callback) => {
  const sql = `SELECT * FROM tokens WHERE payload = '${token}'`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

module.exports.deleteToken = (token, callback) => {
  const sql = `DELETE FROM tokens WHERE payload = '${token}'`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

module.exports.findAll = (param, callback) => {
  const sql = `SELECT * FROM tokens`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}
