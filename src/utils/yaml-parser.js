const yaml = require('yaml');

function YamlParser({ templateContents }) {
  const data = {};

  function parse() {
    templateContents.forEach(transformContentToData);
  }

  function transformContentToData(content) {
    const contentParsed = yaml.parse(content);

    data[contentParsed.namespace] = contentParsed;
  }

  return {
    data,
    parse
  };
}

module.exports = {
  YamlParser
}