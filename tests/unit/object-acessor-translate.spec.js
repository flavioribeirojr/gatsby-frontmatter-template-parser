const assert = require('assert');
const { ObjectAcessorTranslator } = require('../../src/object-acessor-translator');
const UnknownProperty = require('../../src/errors/UnknownProperty');

describe('ObjectAcessorTranslator', function () {
  describe('#translate', function () {
    it('Must be capable of navigate through an object using the dot notation', function () {
      const target = { name: 'John Doe' };

      const name = ObjectAcessorTranslator({
        targetObject: target
      }).translate('name');

      assert.equal(name, 'John Doe');
    });

    it('Must be capable of finding a deeply property using the dot notation', function () {
      const target = {
        contact: {
          email: 'john@doe.com'
        }
      };

      const email = ObjectAcessorTranslator({
        targetObject: target
      }).translate('contact.email');

      assert.equal(email, 'john@doe.com');
    });

    it('Must be capable of use dot notation for Arrays inside objects', function () {
      const target = {
        favoriteShows: [
          'The Office',
          'Parks & Recriation'
        ]
      };

      const theOffice = ObjectAcessorTranslator({
        targetObject: target
      }).translate('favoriteShows.0');

      assert.equal(theOffice, 'The Office');
    });

    it ('Must be capable of use dot notation for Arrays', function () {
      const target = [
        'Instagram',
        'Linkedin',
        'Github'
      ];

      const github = ObjectAcessorTranslator({
        targetObject: target
      }).translate('2');

      assert.equal(github, 'Github');
    });

    it('Must be capable of navigate though ana array of objects', function () {
      const target = [
        {
          name: 'John Doe',
          age: 24
        }
      ];

      const age = ObjectAcessorTranslator({
        targetObject: target
      }).translate('0.age');

      assert.equal(age, 24);
    });

    it('Must throw UnknownProperty error for non existing property', function () {
      const target = {
        name: 'John Doe'
      };

      const objectAcessorTranslator = ObjectAcessorTranslator({ targetObject: target });

      assert.throws(
        () => objectAcessorTranslator.translate('age'),
        UnknownProperty
      );
    });
  });
})