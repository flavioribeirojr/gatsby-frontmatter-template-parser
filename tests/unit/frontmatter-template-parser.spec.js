const assert = require('assert');
const { FrontMatterTemplateParser } = require('../../src/frontmatter-template-parser');

describe('FrontMatterTemplateParser', function () {
  describe('#performMapping', function () {
    it('Must perform a correct replacement when given a template input', function () {
      const frontMatterTemplateParser = getFrontMatterInstance(buildFrontMatterAsBlogPosts());
  
      const frontmatterMaped = frontMatterTemplateParser.performMapping();
  
      assert.equal(typeof frontmatterMaped.author, 'object');
    });

    it('Must be capable of replace template strings deeply on a frontmatter object', function () {
      const frontMatterTemplateParser = getFrontMatterInstance(buildFrontMatterWithTemplateValueDeeplyOnObject());

      const frontmatterMaped = frontMatterTemplateParser.performMapping();

      assert.equal(typeof frontmatterMaped.team.creator, 'object')
    });

    it('Must be capable of replace template strings inside arrays', function () {
      const frontMatterTemplateParser = getFrontMatterInstance(
        buildFrontMatterWithArrayTemplate()
      );

      const frontmatterMaped = frontMatterTemplateParser.performMapping();

      assert.equal(typeof frontmatterMaped.team[0], 'object');
    });

    it('Must be capable of parsing frontmatter as an array', function () {
      const frontMatterTemplateParser = getFrontMatterArrayInstance(buildFrontMatterAsBlogPosts());
  
      const frontmatterMaped = frontMatterTemplateParser.performMapping();
  
      assert.equal(typeof frontmatterMaped[0].author, 'object');
    });
  })
});

function getFrontMatterInstance(frontMatterData) {
  const fakeTemplateParser = {
    data: buildParserData()
  };

  return FrontMatterTemplateParser({
    TemplateParser: fakeTemplateParser,
    frontMatter: frontMatterData[0],
    ObjectAcessorTranslator: {
      translate: () => ({})
    }
  });
}

function buildParserData() {
  return {
    authors: {
      johnDoe: {
        name: 'John Doe',
        title: 'A tyne space on this program memory'
      }
    }
  };
}

function buildFrontMatterAsBlogPosts() {
  return [
    {
      title: 'Testing Software',
      author: '{{authors.johnDoe}}'
    }
  ];
}

function buildFrontMatterWithTemplateValueDeeplyOnObject() {
  return [
    {
      title: 'Testing Somemore',
      team: {
        name: 'Super Team',
        creator: '{{authors.johnDoe}}'
      }
    }
  ];
}

function buildFrontMatterWithArrayTemplate() {
  return [
    {
      title: 'Testing Multiple',
      team: [
        '{{authors.johnDoe}}'
      ]
    }
  ];
}

function getFrontMatterArrayInstance(frontMatterData) {
  const fakeTemplateParser = {
    data: buildParserData()
  };

  return FrontMatterTemplateParser({
    TemplateParser: fakeTemplateParser,
    frontMatter: frontMatterData,
    ObjectAcessorTranslator: {
      translate: () => ({})
    }
  });
}