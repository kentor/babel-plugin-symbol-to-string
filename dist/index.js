'use strict';

var path = require('path');

function generateStringNode(name, file) {
  var description = generateDescription(name, file);
  return {
    raw: '"' + description + '"',
    type: 'StringLiteral',
    value: description
  };
}

function generateDescription(name, file) {
  if (file && file.opts && file.opts.filename && file.opts.filename !== 'unknown') {
    var basename = path.basename(file.log.filename).split('.')[0];
    return basename + '.' + name;
  } else {
    return name;
  }
}

function isSymbol(node, t) {
  return t.isCallExpression(node) && t.isIdentifier(node.callee, { name: 'Symbol' });
}

module.exports = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      AssignmentExpression: function AssignmentExpression(_ref2, _ref3) {
        var node = _ref2.node;
        var file = _ref3.file;

        if (node.operator === '=') {
          var left = node.left;
          var right = node.right;

          if (isSymbol(right, t) && t.isIdentifier(left)) {
            node.right = generateStringNode(left.name, file);
          }
        }
      },
      VariableDeclaration: function VariableDeclaration(_ref4, _ref5) {
        var node = _ref4.node;
        var file = _ref5.file;

        node.declarations.forEach(function (declaration) {
          var init = declaration.init;
          if (init && isSymbol(init, t)) {
            declaration.init = generateStringNode(declaration.id.name, file);
          }
        });
      }
    }
  };
};