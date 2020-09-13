const mysqlConnection = require('../connection')

const findAll = (page = 1, callback) => {
  const numPerPage = 10
  const skip = (page - 1) * numPerPage
  const limit = skip + ',' + numPerPage
  const sql = `SELECT * FROM files LIMIT ` + limit
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

const createFile = (file, callback) => {
  const sql = 'INSERT INTO files SET ?'
  mysqlConnection.query(sql, file, (err, result) => {
    callback(err, result)
  })
}

const updateFile = (file, id, callback) => {
  const sql = `UPDATE files SET ? WHERE id = ${id}`
  mysqlConnection.query(sql, file, (err, result) => {
    callback(err, result)
  })
}

const findById = (id, callback) => {
  const sql = `SELECT * FROM files WHERE id = ${id}`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

const deleteById = (id, callback) => {
  const sql = `DELETE FROM files WHERE id = ${id}`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

module.exports = {
  findAll,
  createFile,
  updateFile,
  findById,
  deleteById
}
