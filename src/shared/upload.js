const fs = require('fs')

module.exports.downloadFile = (res, path) => {
    let readStream;
    try {
      if (fs.existsSync(path)) {
        readStream = fs.createReadStream(path);
        readStream.on('open', () => {
          res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${path}"`,
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
        console.log(`File "${path}" not found`)
        return
        }
     } catch (err) {
       console.log(err)
     }
  }
