const { getMappedFrontmatter } = require('../../../src');
const assert = require('assert');
const path = require('path');

describe('Plugin integration Test', function () {
  it('When given valids parameters, must return the mapped frontmatter', function () {
    const frontmatterMapped = getMappedFrontmatter({
      yamlModelsDirectory: path.join(__dirname),
      frontMatter: [
        {
          title: 'How to test software',
          author: '{{authors.johnDoe}}'
        }
      ]
    });

    assert.equal(typeof frontmatterMapped[0].author, 'object');
  });
})