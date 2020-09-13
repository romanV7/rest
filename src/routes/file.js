const express = require('express')
const multer = require('multer')
const fs = require('fs')
const {deleteFile} = require('../shared/remove')
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
    if (result.length) {
      const filePath = result[0].filePath
      deleteFile(filePath, err => {
        if (err) console.log(err)
        console.log('deleted from local folder')
      })
      File.deleteById(req.params.id, (err, result) => {
        if (err) console.log(err)
        console.log(result)
        res.send(result)
      })
    } else {
      return res.status(400).json({message: 'no file to delete'})
    }
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
  File.findById(req.params.id, (err, result) => {
    if (err) console.log(err)
    if (result.length) {
      const filePath = result[0].filePath
      deleteFile(filePath, err => {
        if (err) console.log(err)
        console.log('deleted from local folder')
      })
      File.updateFile(file, req.params.id, (err, result) => {
        if (err) console.log(err)
        res.send(result)
      })
    } else {
      return res.status(400).json({message: 'no file to update'})
    }
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

Router.get('/', (req, res) => {
  File.findAll(req.query.list_size, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

Router.get('/download/:id', (req, res) => {
  File.findById(req.params.id, (err, result) => {
    if (err) console.log(err)
    const filePath = result[0].filePath
    let readStream;
    try {
      if (fs.existsSync(filePath)) {
        readStream = fs.createReadStream(filePath);
        readStream.on('open', () => {
          res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${filePath}"`,
          });
          readStream.pipe(res);
        });
        readStream.on('end', () => {
          console.log('file downloaded successfully!')
        });
        readStream.on('error', err => {
          res.end(err);
        });
      } else {
        console.log(`File "${filePath}" not found`)
        return
        }
     } catch (err) {
       console.log(err)
     }
  })
})

module.exports = Router
