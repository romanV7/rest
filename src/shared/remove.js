const fs = require('fs')

const deleteFile = (filePath, callback) => {
  fs.unlink(filePath, (error) => {
    if (!error) {
      callback(false)
    } else {
      callback('Error deleting the file')
    }
  })
}

module.exports = {
  deleteFile
}
