const paramsFromParens = parenStr => {
	const start = parenStr.indexOf('(')
	const end = parenStr.indexOf(')')
	const paramStr = parenStr.substr(start + 1, end - start - 1)
	const params = paramStr.split(',').map(paren => paren.trim())
	return params
}

const paramFromSingleArgArrow = singleArgStr => {
	const param = singleArgStr.trim()
	return [param]
}

const indexOfInfinity = (str, term) => {
	const index = str.indexOf(term)

	if (index === -1) {
		return Infinity
	}

	return index
}

const list = fn => {
	const fnStr = String(fn)

	const firstCurly = indexOfInfinity(fnStr, '{')
	const firstArrow = indexOfInfinity(fnStr, '=>')
	const blockStart = firstCurly < firstArrow ? firstCurly : firstArrow
	const untilBlock = fnStr.substr(0, blockStart)

	let params

	if (untilBlock.includes('(', ')')) {
		params = paramsFromParens(untilBlock)
	} else {
		params = paramFromSingleArgArrow(untilBlock)
	}

	return params
}

const orderParams = (params, fn) => {
	if (!params || typeof params !== 'object') {
		throw new Error('Incorrect or missing params object. Eg: {param1: val1, param2: val2, ...}')
	}

	if (!fn || typeof fn !== 'function') {
		throw new Error('Incorrect or missing fn. Eg: function (a, b) { ... }')
	}

	const paramsList = list(fn)
	const paramsAry = []

	paramsList.forEach(name => {
		if (Reflect.has(params, name)) {
			paramsAry.push(params[name])
		} else {
			paramsAry.push(undefined)
		}
	})

	return paramsAry
}

const pass = (params, fn) => {
	const paramsAry = orderParams(params, fn)
	return fn.apply(null, paramsAry)
}

const apply = (params, fn, context) => {
	if (!context) {
		throw new Error('Incorrect or missing context. Eg: function () { return this.a }')
	}

	const paramsAry = orderParams(params, fn)
	return fn.apply(context, paramsAry)
}

module.exports = {
	list,
	pass,
	apply
}
