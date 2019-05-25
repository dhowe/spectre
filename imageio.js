const fs = require('fs');
const zlib = require('zlib');
const archiver = require('archiver');

/**
 * @param {String} source
 * @param {String} out
 * @returns {Promise}
 */
export function zipAll(dir, out) {

  if (typeof dir === 'undefined') throw Error('no directory');

  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive
      .directory(dir, false)
      .on('error', err => reject(err))
      .pipe(stream)
    ;
    stream.on('close', () => resolve());
    archive.finalize();
  });
}

export function zipEach(dir, cb) {

  console.log('ZIP: ' + dir);
  if (typeof dir === 'undefined') throw Error('no directory');

  //console.log('Reading...');
  fs.readdir(dir, (err, files) => {
    // On error, show it and return
    if (err) return console.error(err);
    Promise.all(files.map(filename => {
        return new Promise((resolve, reject) => {
          const fileContents = fs.createReadStream(filename);
          const writeStream = fs.createWriteStream('/tmp/'+filename+'.gz');
          const zip = zlib.createGzip();
          fileContents.pipe(zip).pipe(writeStream).on('finish', (err) => {
            if (err) return reject(err);
            else resolve();
          })
        })
      }))
      .then(cb());
  });
}

export function unzipEach(dir, cb) {

  if (typeof dir === 'undefined') throw Error('no directory');

  const directoryFiles = fs.readdirSync(dir);

  Promise.all(directoryFiles.map(filename => {
      return new Promise((resolve, reject) => {
        const fileContents = fs.createReadStream(`./data/${filename}`);
        const writeStream = fs.createWriteStream(`./data/${filename.slice(0, -3)}`);
        const unzip = zlib.createGunzip();
        fileContents.pipe(unzip).pipe(writeStream).on('finish', (err) => {
          if (err) return reject(err);
          else resolve();
        })
      })
    }))
    .then(cb());
}
