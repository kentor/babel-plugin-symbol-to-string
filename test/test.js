const babel = require('babel-core');
const path = require('path');
const plugin = require('../index');

describe('babel-plugin-symbol-to-string', () => {
  function expectTransform(source, transformed) {
    const { code } = babel.transform(source, { plugins: [plugin] });
    expect(code).toBe(transformed);
  }

  function expectNoTransform(source) {
    expectTransform(source, source);
  }

  describe('assignment', () => {
    it('converts symbol to string of identifier', () => {
      expectTransform('s1 = Symbol();', 's1 = "s1";');
      expectTransform('s1 = Symbol("a");', 's1 = "s1";');
    });

    it('only works with = operator', () => {
      expectNoTransform('s1 += Symbol();');
    });
  });

  describe('variable declaration', () => {
    it('converts symbol to string of identifier', () => {
      expectTransform('var s1 = Symbol();', 'var s1 = "s1";');
      expectTransform(
        'var s1 = Symbol(), s2 = Symbol("s2");',
        'var s1 = "s1",\n    s2 = "s2";'
      );
    });
  });

  it('prepends description with filename', () => {
    const { code } = babel.transformFileSync(
      path.join(__dirname, 'fixtures', 'TodoActions.js'),
      { plugins: [plugin] }
    );
    expect(code).toBe(
      '"use strict";\n\nvar CREATE = "TodoActions.CREATE";'
    );
  });
});
