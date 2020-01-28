const fs = require('fs');
const path = require('path');

const FILE_EXTENSIONS_REGEX= /^(.*\.yaml|.*\.yml)$/;

function YamlContentReader({ templatesPath }) {
  async function getYamlContent() {
    const files = await readTemplatesDir();
    const contents = await Promise.all(files.map(getFileContents));

    return contents;
  }

  function readTemplatesDir() {
    return new Promise((resolve, reject) => {
      fs.readdir(templatesPath, (err, files) => {
        if (err) {
          return reject(err);
        }

        const yamlFiles = files
          .filter(file => FILE_EXTENSIONS_REGEX.test(file));

        return resolve(yamlFiles);
      });
    });
  }

  function getFileContents(fileName) {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(templatesPath, fileName), (err, contents) => {
        if (err) {
          return reject(err);
        }

        return resolve(contents.toString());
      });
    });
  }

  return {
    getYamlContent
  }
}

module.exports = {
  YamlContentReader 
}