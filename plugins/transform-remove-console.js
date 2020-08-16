/*
https://astexplorer.net/

> console.log('Hello World!')

{
  "type": "ExpressionStatement",
  "start": 0,
  "end": 27,
  "expression": {
    "type": "CallExpression",
    "start": 0,
    "end": 27,
    "callee": {
      "type": "MemberExpression",
      "start": 0,
      "end": 11,
      "object": {
        "type": "Identifier",
        "start": 0,
        "end": 7,
        "name": "console"
      },
      "property": {
        "type": "Identifier",
        "start": 8,
        "end": 11,
        "name": "log"
      },
      "computed": false
    },
    "arguments": [
      {
        "type": "Literal",
        "start": 12,
        "end": 26,
        "value": "Hello World!",
        "raw": "'Hello World!'"
      }
    ]
  }
}
*/

module.exports = function () {
  return {
    name: "transform-remove-console",
    visitor: {
      CallExpression(path, { opts }) {
        const calleePath = path.get("callee");

        if (opts && opts.exclude) {
          let exclude = opts.exclude;
          if (!Array.isArray(exclude)) {
            exclude = [exclude];
          }
          const isExclude = exclude.some((type) =>
            calleePath.matchesPattern(`console.${type}`)
          );
          if (isExclude) {
            return;
          }
        }
        if (calleePath.matchesPattern("console", true)) {
          path.remove();
        }
      },
    },
  };
};
