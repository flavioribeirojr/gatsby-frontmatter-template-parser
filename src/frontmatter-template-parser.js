const TEMPLATE_REGEX = /^{{.+}}$/;

function FrontMatterTemplateParser({ TemplateParser, frontMatter }) {
  function performMapping() {
    return Object
      .keys(frontMatter)
      .reduce((frontMatterTransformed, frontMatterProp) => {
        const frontMatterValue = frontMatter[frontMatterProp];

        if (typeof frontMatterValue === 'object') {
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
    const frontMatterTemplateParser = FrontMatterTemplateParser({ TemplateParser, frontMatter: subFrontMatter });

    return frontMatterTemplateParser.performMapping();
  }

  function valueHasTemplateString(key) {
    return TEMPLATE_REGEX.test(frontMatter[key]);
  }

  function transformTemplatePathToValue(template) {
    const acessor = template.replace(/[{}\s]*/g, '');

    return translateObjectAcessor(acessor);
  }

  function translateObjectAcessor(acessor) {
    const acessorList = acessor.split('.');
    let templateValues = TemplateParser.data;

    while (acessorList.length) {
      templateValues = templateValues[acessorList.shift()];
    }

    return templateValues;
  }

  return {
    performMapping
  }
}

module.exports = {
  FrontMatterTemplateParser
}