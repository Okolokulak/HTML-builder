const fs = require('fs');
const path = require('path');
const {stdout} = process;

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, { withFileTypes: true }, (err, files) => {
  if (err) {
    stdout.write(err);
  } else {
    files.forEach((file) => {
      if (file.isDirectory()) return;
      else {
        fs.stat(path.join(folder, file.name), (err, stats) => {
            if (err) {
                stdout.write(err);
            } else { stdout.write(
            `${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${Math.ceil((stats.size / 1024))}kb \n`
          );}
        });
      }
    });
  }
});
