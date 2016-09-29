const path = require('path');

function generateStringNode(name, file) {
  const description = generateDescription(name, file);
  return {
    raw: `"${description}"`,
    type: 'StringLiteral',
    value: description,
  };
}

function generateDescription(name, file) {
  if (file && file.opts && file.opts.filename &&
      file.opts.filename !== 'unknown') {
    const basename = path.basename(file.log.filename).split('.')[0];
    return `${basename}.${name}`;
  } else {
    return name;
  }
}

function isSymbol(node, t) {
  return t.isCallExpression(node) &&
    t.isIdentifier(node.callee, { name: 'Symbol' });
}

module.exports = function({ types: t }) {
  return {
    visitor: {
      AssignmentExpression({ node }, { file }) {
        if (node.operator === '=') {
          const left = node.left;
          const right = node.right;

          if (isSymbol(right, t) && t.isIdentifier(left)) {
            node.right = generateStringNode(left.name, file);
          }
        }
      },

      VariableDeclaration({ node }, { file }) {
        node.declarations.forEach(declaration => {
          const init = declaration.init;
          if (init && isSymbol(init, t)) {
            declaration.init = generateStringNode(declaration.id.name, file);
          }
        });
      },
    },
  };
};
