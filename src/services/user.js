'use strict'

const mysqlConnection = require('../connection')

const createUser = (file, callback) => {
  const sql = 'INSERT INTO users SET ?'
  mysqlConnection.query(sql, file, (err, result) => {
    callback(err, result)
  })
}

const updateUser = (file, id, callback) => {
  const sql = `UPDATE users SET ? WHERE id = '${id}'`
  mysqlConnection.query(sql, file, (err, result) => {
    callback(err, result)
  })
}

const findUserById = (id, callback) => {
  const sql = `SELECT * FROM users WHERE id = '${id}'`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

const findByUsername = (username, callback) => {
  const sql = `SELECT * FROM users WHERE name = '${username}'`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

const findByEmail = (email, callback) => {
  const sql = `SELECT * FROM users WHERE email = '${email}'`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

const deleteUserById = (id, callback) => {
  const sql = `DELETE FROM users WHERE id = '${id}'`
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result)
  })
}

module.exports = {
  createUser,
  updateUser,
  findUserById,
  findByUsername,
  findByEmail,
  deleteUserById
}
