const express = require('express')
const multer = require('multer')
const fs = require('fs')
const util = require('util');
const mysqlConnection = require('../connection')
const {deleteFile} = require('../shared/remove')

const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

const Router = express.Router()

const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5},
})

Router.get('/:id', async (req, res) => {
  const sql = `SELECT * FROM files WHERE id = ${req.params.id}`
  const result = mysqlConnection.query(sql, (err, result) => {
    if (err) console.log(err)
    console.log({result})
    res.send(result)
  })
})

Router.get('/delete/:id', (req, res) => {
  const sql1 = `SELECT * FROM files WHERE id = ${req.params.id}`
  mysqlConnection.query(sql1, (err, result) => {
    if (err) console.log(err)
    const filePath = result[0].filePath
    deleteFile(filePath, err => {
      if (err) console.log(err)
      console.log('deleted from local folder')
    })
  })
  const sql = `DELETE FROM files WHERE id = ${req.params.id}`
  mysqlConnection.query(sql, (err, result) => {
    if (err) console.log(err)
    console.log(result)
    res.send(result)
  })
})

Router.put('/update/:id', upload.single('image'), (req, res) => {
  console.log(req.params.id)
  const sql = `UPDATE files SET ? WHERE id = ${req.params.id}`
  const file = {
    name: req.file.originalname,
    extention: req.file.originalname.split('.')[1],
    mimetype: req.file.mimetype,
    size: req.file.size,
    filePath: req.file.path,
    data: new Date()
  }
  mysqlConnection.query(sql, file, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

Router.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file)
  const sql = 'INSERT INTO files SET ?'
  const file = {
    name: req.file.originalname,
    extention: req.file.originalname.split('.')[1],
    mimetype: req.file.mimetype,
    size: req.file.size,
    filePath: req.file.path,
    data: new Date()
  }
  mysqlConnection.query(sql, file, (err, rows, fields) => {
    if (err) console.log(err)
    res.send(rows)
  })
})

Router.post('/list', (req, res) => {
  mysqlConnection.query("select * from files", (err, rows, fields) => {
    if (err) console.log(err)
    res.send(rows)
  })
})

module.exports = Router
