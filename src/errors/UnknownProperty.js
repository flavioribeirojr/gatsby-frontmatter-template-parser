class UnknownProperty extends Error {
  constructor(templatePath) {
    super(`Gatsby Frontmatter Template Parser could not parse ${templatePath}`);
  }
}

module.exports = UnknownProperty;