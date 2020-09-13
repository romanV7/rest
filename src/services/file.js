const mysqlConnection = require('../connection')

module.exports.findAll = (param, callback) => {
  const sql = `SELECT * FROM files`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

module.exports.createFile = (file, callback) => {
  const sql = 'INSERT INTO files SET ?'
  mysqlConnection.query(sql, file, (err, result) => {
    callback(err, result)
  })
}

module.exports.updateFile = (file, id, callback) => {
  const sql = `UPDATE files SET ? WHERE id = ${id}`
  mysqlConnection.query(sql, file, (err, result) => {
    callback(err, result)
  })
}

module.exports.findById = (id, callback) => {
  const sql = `SELECT * FROM files WHERE id = ${id}`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

module.exports.deleteById = (id, callback) => {
  const sql = `DELETE FROM files WHERE id = ${id}`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}
