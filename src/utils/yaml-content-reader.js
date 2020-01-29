const fs = require('fs');
const path = require('path');

const FILE_EXTENSIONS_REGEX= /^(.*\.yaml|.*\.yml)$/;

function YamlContentReader({ templatesPath }) {
  function getYamlContent() {
    const files = readTemplatesDir();
    const contents = files.map(getFileContents);

    return contents;
  }

  function readTemplatesDir() {
    const files = fs.readdirSync(templatesPath);
    
    const yamlFiles = files
      .filter(file => FILE_EXTENSIONS_REGEX.test(file));

    return yamlFiles;
  }

  function getFileContents(fileName) {
    const contentsBuffer = fs.readFileSync(path.join(templatesPath, fileName));

    return contentsBuffer.toString();
  }

  return {
    getYamlContent
  }
}

module.exports = {
  YamlContentReader 
}