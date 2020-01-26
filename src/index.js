const { FrontMatterTemplateParser } = require('./frontmatter-template-parser');
const { ObjectAcessorTranslator } = require('./object-acessor-translator');
const { YamlParser } = require('./utils/yaml-parser');
const { YamlContentReader } = require('./utils/yaml-content-reader');

function getMappedFrontmatter({ yamlModelsDirectory, frontmatter }) {
  const yamlContents = YamlContentReader({ templatesPath: yamlModelsDirectory }).getYamlContent();
  const yamlParser = YamlParser({ templateContents: yamlContents });
  const objectAcessorTranslator = ObjectAcessorTranslator({ targetObject: yamlParser.data });

  const frontmatterTemplateParser = FrontMatterTemplateParser({
    TemplateParser: yamlParser,
    ObjectAcessorTranslator: objectAcessorTranslator,
    frontmatter
  });

  return frontmatterTemplateParser.performMapping();
}

module.exports = {
  getMappedFrontmatter
}