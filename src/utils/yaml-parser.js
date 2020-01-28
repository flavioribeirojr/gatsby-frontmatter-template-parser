const yaml = require('yaml');

function YamlParser({ templateContents }) {
  const data = {};

  function parse() {
    return templateContents
      .reduce((parsedData, content) => {
        return {
          ...parsedData,
          ...transformContentToData(content)
        }
      }, {});
  }

  function transformContentToData(content) {
    const contentParsed = yaml.parse(content);

    return {
      [contentParsed.namespace]: contentParsed
    };
  }

  return {
    data: parse()
  };
}

module.exports = {
  YamlParser
}