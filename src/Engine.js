import { shuffleArray, randomInt } from './Utils'
import ops from './Operators'

const OPERATOR_LEVEL = 4
const NUMBER_RANGE = [1, 10]

function pickOperators() {
  // Shuffle and pick 4 operators
  return shuffleArray(ops)
    .filter((_, index) => index < OPERATOR_LEVEL)
    .map(op => op(randomInt(...NUMBER_RANGE)))
}

function calculateGoal(initResult, ops, steps) {
  const i = []
  i.length = steps
  i.fill(0)

  return i.reduce((result, _, index) => {
    const { func, label } = ops[index % ops.length]
    console.log(result, label, func(result))
    return func(result)
  }, initResult)
}

export const applyOp = (result, op) => op.func(result)

export const isGameEnded = currentSteps => currentSteps === 0

export const isWon = (game, currentSteps, currentResult) => isGameEnded(currentSteps) && game.goal === currentResult

export function newGame(initResult = randomInt(1, 9)) {
  // Get possile operators
  const operators = pickOperators()

  // Pick a step
  const steps = operators.length + 1

  // Generate goal
  const goal = calculateGoal(initResult, operators, steps)

  return { goal, steps, operators: shuffleArray(operators), initResult }
}
