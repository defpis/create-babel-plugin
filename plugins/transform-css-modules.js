const { extname } = require("path");

/*
> import 'index.scss'

{
  "type": "ImportDeclaration",
  "start": 0,
  "end": 19,
  "specifiers": [],
  "source": {
    "type": "Literal",
    "start": 7,
    "end": 19,
    "value": "index.scss",
    "raw": "'index.scss'"
  }
}

> import style from 'index.scss'

{
  "type": "ImportDeclaration",
  "start": 21,
  "end": 51,
  "specifiers": [
    {
      "type": "ImportDefaultSpecifier",
      "start": 28,
      "end": 33,
      "local": {
        "type": "Identifier",
        "start": 28,
        "end": 33,
        "name": "style"
      }
    }
  ],
  "source": {
    "type": "Literal",
    "start": 39,
    "end": 51,
    "value": "index.scss",
    "raw": "'index.scss'"
  }
}
 */

const CSS_EXTNAMES = [".css", ".less", ".scss"];

module.exports = function () {
  return {
    visitor: {
      ImportDeclaration(path) {
        const { specifiers, source } = path.node;
        const { value } = source;
        if (specifiers.length && CSS_EXTNAMES.includes(extname(value))) {
          source.value = `${value}?module`;
        }
      },
    },
  };
};
