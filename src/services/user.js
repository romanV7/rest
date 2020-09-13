const mysqlConnection = require('../connection')

module.exports.findAll = (param, callback) => {
  const sql = `SELECT * FROM users`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

module.exports.createUser = (file, callback) => {
  const sql = 'INSERT INTO users SET ?'
  mysqlConnection.query(sql, file, (err, result) => {
    callback(err, result)
  })
}

module.exports.updateUser = (file, id, callback) => {
  const sql = `UPDATE users SET ? WHERE id = '${id}'`
  mysqlConnection.query(sql, file, (err, result) => {
    callback(err, result)
  })
}

module.exports.findUserById = (id, callback) => {
  const sql = `SELECT * FROM users WHERE id = '${id}'`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

module.exports.findByUsername = (username, callback) => {
  const sql = `SELECT * FROM users WHERE name = '${username}'`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

module.exports.findByEmail = (email, callback) => {
  const sql = `SELECT * FROM users WHERE email = '${email}'`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

module.exports.deleteUserById = (id, callback) => {
  const sql = `DELETE FROM users WHERE id = '${id}'`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}
