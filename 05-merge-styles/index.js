const fs = require('fs');
const path = require('path');


fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
      files.forEach((file) => {
        if (path.extname(file) === '.css') {
          const css = fs.createReadStream(path.join(__dirname, 'styles', file));
          const styles = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
          css.on('data', (chunk) => styles.write(chunk + '\n'));
        }
      });
  });