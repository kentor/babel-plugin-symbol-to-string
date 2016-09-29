# Symbol to String [![Build Status](https://travis-ci.org/kentor/babel-plugin-symbol-to-string.svg)](https://travis-ci.org/kentor/babel-plugin-symbol-to-string) [![npm](https://img.shields.io/npm/v/babel-plugin-symbol-to-string.svg)](https://www.npmjs.com/package/babel-plugin-symbol-to-string)

A [Babel][b] plugin to convert assigned symbols to strings.

**Note:** Babel 6 only.

## Use Cases

### Redux
Very useful for reducing boilerplate when creating action type constants.

In:

```js
// TodoActions.js
export const CREATE = Symbol();
export const CREATE_SUCCESS = Symbol();
export const CREATE_FAILURE = Symbol();
```

Out (something like this):

```js
// TodoActions.js
export const CREATE = 'TodoActions.CREATE';
export const CREATE_SUCCESS = 'TodoActions.CREATE_SUCCESS';
export const CREATE_FAILURE = 'TodoActions.CREATE_FAILURE';
```

Then use these constants in a reducer:

```js
// TodoReducer.js
import * as TodoActions from '../actions/TodoActions';

export function TodoReducer(state, action) {
  switch (action) {
  case TodoActions.CREATE:
    // Handle create
    break;
  case TodoActions.CREATE_SUCCESS:
    // Handle create success
    break;
  case TodoActions.CREATE_FAILURE:
    // Handle create failure
    break;
  default:
    return state;
  }
}
```

## Installation

```
npm install -D babel-plugin-symbol-to-string
```

.babelrc:
```
{
  "plugins": ["symbol-to-string"]
}
```

[b]: http://babeljs.io/
[s]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
