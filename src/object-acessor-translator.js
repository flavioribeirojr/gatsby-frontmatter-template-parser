const UnknownProperty = require('./errors/UnknownProperty');

function ObjectAcessorTranslator({ targetObject }) {
  function translate(acessor) {
    const acessorList = acessor.split('.');

    while (acessorList.length) {
      targetObject = targetObject[acessorList.shift()];
    }

    if (!targetObject) {
      throw new UnknownProperty();
    }

    return targetObject;
  }

  return {
    translate
  };
}

module.exports = {
  ObjectAcessorTranslator
}