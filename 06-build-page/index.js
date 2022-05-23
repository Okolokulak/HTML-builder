const fs = require("fs");
const path = require("path");

let dist = path.join(__dirname, "project-dist");
let styles = fs.createWriteStream(path.join(dist, "style.css"));

function copyAssets(from, to) {
  fs.mkdir(to, { recursive: true }, () => {
    fs.readdir(from, { withFileTypes: true }, (err, files) => {
      files.forEach((elem) => {
        let origin = from + "\\" + elem.name;
        let destination = to + "\\" + elem.name;
        if (elem.isDirectory()) {
          copyAssets(origin, destination);
        } else {
          fs.copyFile(origin, destination, () => {});
        }
      });
    });
  });
};

fs.mkdir(dist, { recursive: true }, () => {});
fs.readFile(path.join(__dirname, "template.html"), (err, file) => {
  let template = file.toString();
  let components = path.join(__dirname, "components");
  let index = path.join(dist, "index.html");

  fs.readdir(components, (err, file) => {
    file.forEach((el) => {
      if (path.basename(el).split(".")[1] === "html") {
        let fileName = "{{" + path.parse(path.join(components, el)).name + "}}";
        fs.readFile(path.join(components, el), (err, file) => {
          template = template.replace(fileName, file.toString());
          fs.rm(index, { recursive: true, force: true }, () => {
            fs.writeFile(index, template, () => {});
          });
        });
      }
    });
  });
});

fs.readdir(path.join(__dirname, "styles"), (err, files) => {
  files.forEach((file) => {
    if (path.extname(file) === ".css") {
      const css = fs.createReadStream(path.join(__dirname, "styles", file));
      css.on("data", (chunk) => styles.write(chunk + "\n"));
    }
  });
});

fs.rm(path.join(dist, "assets"), { recursive: true }, () => {
  copyAssets(path.join(__dirname, "assets"), path.join(dist, "assets"));
});



