<img alt="Bunny rabbit waving magic wand in parenthesis" src="magic-params.png" align="right">

# Magic Params

> Magically pass function parameters in any order. Because you're worth it.

## About

Magic-Params is a small Node modules that lets you re-order of the params in your functions, without chaging their value. Magic-Params was designed to support a simplified plugin architecure.

For example:

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




