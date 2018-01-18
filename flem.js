const remLast = x => {
	if (x == null || x === 0) return null

	const s = `${x}`
	return parseInt(s.substr(0, s.length - 1), 10)
}
const add = x => y => x + y
const sub = x => y => x - y
const mul = x => y => x * y
const neg = x => -x

const mul3 = mul(3)
const sub9 = add(-9)

const applyOp = (op, x, opIndex) => {
	const value = op(x.value)
	return value != null ? { steps: [...x.steps, opIndex], value } : { ...x, value }
}

const INP = 1
const OUT = -21
const STEPS = 3

const sub6 = sub(6)
const mul5 = mul(5)
const add9 = add(9)

const ops = [sub6, mul5, add9]
const xs = [{ steps: [], value: INP }]

const steps = []
steps.length = STEPS
const calculations = steps.fill(0).reduce(xs => {
	return xs.reduce((acc, x) => {
		const results = ops.map((op, opIndex) => applyOp(op, x, opIndex)).filter(x => !isNaN(x.value) && x.value != null)

		return [...acc, ...results]
	}, [])
}, xs)

console.log(calculations.filter(x => x.value === OUT))
