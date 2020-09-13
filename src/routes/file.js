const express = require('express')
const multer = require('multer')
const {deleteFile} = require('../shared/remove')
const {downloadFile} = require('../shared/upload')
const File = require('../services/file')

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

Router.get('/:id', (req, res) => {
  File.findById(req.params.id, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

Router.get('/delete/:id', (req, res) => {
  File.findById(req.params.id, (err, result) => {
    if (err) console.log(err)
    const filePath = result[0].filePath
    deleteFile(filePath, err => {
      if (err) console.log(err)
      console.log('deleted from local folder')
    })
  })
  File.deleteById(req.params.id, (err, result) => {
    if (err) console.log(err)
    console.log(result)
    res.send(result)
  })
})

Router.put('/update/:id', upload.single('image'), (req, res) => {
  const file = {
    name: req.file.originalname,
    extention: req.file.originalname.split('.')[1],
    mimetype: req.file.mimetype,
    size: req.file.size,
    filePath: req.file.path,
    data: new Date()
  }
  File.updateFile(file, req.params.id, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

Router.post('/upload', upload.single('image'), (req, res) => {
  const file = {
    name: req.file.originalname,
    extention: req.file.originalname.split('.')[1],
    mimetype: req.file.mimetype,
    size: req.file.size,
    filePath: req.file.path,
    data: new Date()
  }
  File.createFile(file, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

Router.post('/list', (req, res) => {
  File.findAll(null, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

Router.get('/download/:id', (req, res) => {
  File.findById(req.params.id, (err, result) => {
    if (err) console.log(err)
    const filePath = result[0].filePath
    downloadFile(res, filePath)
  })
})

module.exports = Router
