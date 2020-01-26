# Gatsby Frontmatter Template Parser

This plugin will allow you to write template strings on the frontmatter of your markdown files.

This plugin was developed to be used on Gatsby projects.

## How to Use

Install it  with

```sh
$ npm install --save gatsby-frontmatter-template-parser
```

Then on your `gatsby-config.js`:

```javascript
const gatsbyFrontMatterTemplateParser = require('gatsby-frontmatter-template-parser');
const path = require('path');
const yamlModelsDirectory = path.join(__dirname, 'yaml-models');

module.exports = {
    ...
    plugins: [
        ...
        {
            "resolve": `gatsby-transformer-remark`,
            "options": {
                engines: {
                    yaml: gatsbyFrontMatterTemplateParser({
                        yamlModelsDirectory
                    })
                }
            }
        }
    ]
}
```

At this point you have already completed the setup for this plugin. Check below to see the usage for your `YAML` models:

```yaml
namespace: authors # This is required. When you access this yaml model you'll access using this namespace. e.g: "{{authors.johnDoe}}"

johnDoe:
    name: John Doe
    age: 26
```

On your frontmatter, you'll simply need to use the `{{}}` notation. See below:

```
---
author: "{{authors.johnDoe}}"
---
```

The plugin will make sure that `{{authors.johnDoe}}` will be translated to the matching object.