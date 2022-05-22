const fs = require("fs");
const path = require("path");

const dirCopy = path.join(__dirname, "files-copy")

function copyDir(dir) {
  fs.mkdir(dirCopy, { recursive: true }, () => {
    fs.readdir(dir, (err, files) => {
      files.forEach((file) => {
        const origin = path.join(dir, file);
        const destination = path.join(dirCopy, file);
        fs.copyFile(origin, destination, () => {});
      });
    });
  });
}


  fs.rm(dirCopy, { recursive: true }, () => {
    copyDir(path.join(__dirname, "files"));
  });


