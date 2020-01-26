const { FrontMatterTemplateParser } = require('./frontmatter-template-parser');
const { YamlParser } = require('./utils/yaml-parser');
const { YamlContentReader } = require('./utils/yaml-content-reader');

function getMappedFrontmatter({ yamlModelsDirectory, frontmatter }) {
  const yamlContents = YamlContentReader({ templatesPath: yamlModelsDirectory }).getYamlContent();
  const yamlParser = YamlParser({ templateContents: yamlContents });

  const frontmatterTemplateParser = FrontMatterTemplateParser({
    TemplateParser: yamlParser,
    frontmatter
  });

  return frontmatterTemplateParser.performMapping();
}

module.exports = {
  getMappedFrontmatter
}