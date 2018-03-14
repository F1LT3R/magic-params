import test from 'ava'
import magicParams from '.'

test('List 3 params from arrow function', t => {
	const fn = (a, b, c) => {
		return a + b + c
	}

	const params = magicParams.list(fn)

	t.true(Array.isArray(params))
	t.deepEqual(params, ['a', 'b', 'c'])
})

test('List 1 param from arrow function', t => {
	// eslint-disable-next-line arrow-parens
	const fn = (a) => {
		return a
	}

	const params = magicParams.list(fn)

	t.true(Array.isArray(params))
	t.deepEqual(params, ['a'])
})

test('List 1 param from arrow function w/o parens', t => {
	const fn = a => {
		return a
	}

	const params = magicParams.list(fn)

	t.true(Array.isArray(params))
	t.deepEqual(params, ['a'])
})

test('List 1 param from regular function', t => {
	const fn = function (a) {
		return a
	}

	const params = magicParams.list(fn)

	t.true(Array.isArray(params))
	t.deepEqual(params, ['a'])
})

test('List 2 params from regular function', t => {
	const fn = function (a, b) {
		return a + b
	}

	const params = magicParams.list(fn)

	t.true(Array.isArray(params))
	t.deepEqual(params, ['a', 'b'])
})

test('List 1 param from mixed arrow w/o parens combined w. reg. fn', t => {
	const fn = a => function (b) {
		return a + b
	}

	const params = magicParams.list(fn)

	t.true(Array.isArray(params))
	t.deepEqual(params, ['a'])
})

test('List 2 param from mixed arrow w/ parens combined w. reg. fn', t => {
	const fn = (a, b) => function (c) {
		return a + b + c
	}

	const params = magicParams.list(fn)

	t.true(Array.isArray(params))
	t.deepEqual(params, ['a', 'b'])
})

test('Pass w/o params throws', t => {
	const error = t.throws(() => {
		magicParams.pass()
	})

	t.is(error.message, 'Incorrect or missing params object. Eg: {param1: val1, param2: val2, ...}')
})

test('Pass with non-object params throws', t => {
	const fn = (a, b) => {
		return a + b
	}

	const error = t.throws(() => {
		magicParams.pass(123, fn)
	})

	t.is(error.message, 'Incorrect or missing params object. Eg: {param1: val1, param2: val2, ...}')
})

test('Pass with non-fn fn throws', t => {
	const fn = false

	const params = {
		a: 2,
		b: 2
	}

	const error = t.throws(() => {
		magicParams.pass(params, fn)
	})

	t.is(error.message, 'Incorrect or missing fn. Eg: function (a, b) { ... }')
})

test('Pass with omitted fn throws', t => {
	const params = {
		a: 2,
		b: 2
	}

	const error = t.throws(() => {
		magicParams.pass(params)
	})

	t.is(error.message, 'Incorrect or missing fn. Eg: function (a, b) { ... }')
})

test('Pass works', t => {
	const fn = (a, b) => {
		return a + b
	}

	const params = {
		a: 2,
		b: 2
	}

	const result = magicParams.pass(params, fn)

	t.is(typeof result, 'number')
	t.is(result, 4)
})

test('Apply works', t => {
	const fn = function (a) {
		return a + this.b
	}

	const params = {
		a: 2
	}

	const context = {
		b: 2
	}

	const result = magicParams.apply(params, fn, context)

	t.is(typeof result, 'number')
	t.is(result, 4)
})

test('Apply fails when no context is passed', t => {
	const fn = function () {
		return this.a
	}

	const params = {
		a: 2
	}

	const error = t.throws(() => {
		magicParams.apply(params, fn)
	})

	t.is(error.message, 'Incorrect or missing context. Eg: function () { return this.a }')
})
