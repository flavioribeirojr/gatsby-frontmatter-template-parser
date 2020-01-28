const { getMappedFrontmatter } = require('./src');
const yaml = require('yaml');

module.exports = ({ yamlModelsDirectory }) => ({
  stringfy: yaml.parse.bind(yaml),
  parse: async function (str, options) {
    const frontMatter = yaml.parse(str, options);

    return await getMappedFrontmatter({
      frontMatter,
      yamlModelsDirectory
    });
  }
});