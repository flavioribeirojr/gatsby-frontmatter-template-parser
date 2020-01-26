const TEMPLATE_REGEX = /^{{.+}}$/;

function FrontMatterTemplateParser({ TemplateParser, ObjectAcessorTranslator, frontMatter }) {
  function performMapping() {
    return Object
      .keys(frontMatter)
      .reduce((frontMatterTransformed, frontMatterProp) => {
        const frontMatterValue = frontMatter[frontMatterProp];

        if (typeof frontMatterValue === 'object' && frontMatterValue !== null) {
          frontMatterTransformed[frontMatterProp] = getSubFrontMatterParsed(frontMatterValue);
          return frontMatterTransformed;
        }

        if (!valueHasTemplateString(frontMatterProp)) {
          return frontMatterTransformed;
        }

        frontMatterTransformed[frontMatterProp] = transformTemplatePathToValue(frontMatterValue);
        return frontMatterTransformed;
      }, frontMatter);
  }

  function getSubFrontMatterParsed(subFrontMatter) {
    const frontMatterTemplateParser = FrontMatterTemplateParser({
      frontMatter: subFrontMatter,
      TemplateParser,
      ObjectAcessorTranslator
    });

    return frontMatterTemplateParser.performMapping();
  }

  function valueHasTemplateString(key) {
    return TEMPLATE_REGEX.test(frontMatter[key]);
  }

  function transformTemplatePathToValue(template) {
    const acessor = template.replace(/[{}\s]*/g, '');

    return ObjectAcessorTranslator.translate(acessor);
  }

  return {
    performMapping
  }
}

module.exports = {
  FrontMatterTemplateParser
}