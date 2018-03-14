<img alt="Bunny rabbit waving magic wand in parenthesis" src="magic-params.png" align="right">

# Magic Params

> Magically pass function parameters in any order. Because you're worth it.

[![Build Status](https://travis-ci.org/F1LT3R/magic-params.svg?branch=master)](https://travis-ci.org/F1LT3R/magic-params)
[![Coverage Status](https://coveralls.io/repos/github/F1LT3R/magic-params/badge.svg?branch=master)](https://coveralls.io/github/F1LT3R/magic-params?branch=master)
[![Npm Version](https://img.shields.io/npm/v/magic-params.svg)](https://www.npmjs.com/package/magic-params)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Magic-Params is a small Node modules that lets you re-order of the params in your functions, without chaging their value. Magic-Params was designed to support a simplified plugin architecure.

For example: the following function...

```javascript
const fn = (args, in, any, order) => {}
```

... will work exactly the same if you re-order the arguments:

```javascript
const fn = (any, order, in, args) => {}
```

Just pass your params object and function to Magic-Params:

```javascript
const magicParams = require('magic-params')

const fn = (a, b) => {
	return a + b
}

const params = {
	a: 2,
	b: 2
}

const result = magicParms.pass(params, fn) 
// Result = 4
```

## Passing Arguments

```javascript
const magicParams = require('magic-params')

const params = {
	a: 'Hello,',
	b: ' world!'
}

// You can switch the order of the arguments

const display1 = (a, b) {
	console.log(a + b)
}

const display2 = (b, a) {
	console.log(a + b)
}

// The values stay mapped to param names

magicParams.pass(params, display1)
// 'Hello, world!'

magicParams.pass(params, display2)
// 'Hello, world!'
```

## Passing Context

You can pass context with magic params by using the `magicParams.apply()` method:

```javascript
const magicParams = require('magic-params')

const params = {
	a: 'Hello,'
}

const context = {
	b: ' world!'
}

// The context is available on `this`

const display = function (a) {
	console.log(a + this.b)
}

magicParams.apply(params, display, context)
// 'Hello, world!'
```

## Listing Params

You can also list params with the `magicParams.list()` method:

```javascript
const magicParams = require('magic-params')

const display = function (a, b) {
	...
}

magicParams.list(display)
// Returns array: ['a', 'b']
```

## Installation

```shell
yarn add magic-params
```

## Testing

```shell
yarn test
```

## Credits

Thanks to Ben Iconator and Anbileru Adaleru from NounProject for the rabbit and magic wand vectors.


