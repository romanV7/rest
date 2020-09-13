const fs = require('fs');

module.exports.deleteFile = (filePath, callback) => {
  fs.unlink(filePath, (error) => {
    if (!error) {
      callback(false);
    } else {
      callback('Error deleting the file');
    }
  })
};
