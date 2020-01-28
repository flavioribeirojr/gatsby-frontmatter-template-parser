const { FrontMatterTemplateParser } = require('./frontmatter-template-parser');
const { ObjectAcessorTranslator } = require('./object-acessor-translator');
const { YamlParser } = require('./utils/yaml-parser');
const { YamlContentReader } = require('./utils/yaml-content-reader');

async function getMappedFrontmatter({ yamlModelsDirectory, frontMatter }) {
  const yamlContents = await YamlContentReader({ templatesPath: yamlModelsDirectory }).getYamlContent();

  const yamlParser = YamlParser({ templateContents: yamlContents });
  const objectAcessorTranslator = ObjectAcessorTranslator({ targetObject: yamlParser.data });

  const frontmatterTemplateParser = FrontMatterTemplateParser({
    TemplateParser: yamlParser,
    ObjectAcessorTranslator: objectAcessorTranslator,
    frontMatter
  });

  return frontmatterTemplateParser.performMapping();
}

module.exports = {
  getMappedFrontmatter
}