import React, { Component } from 'react'
import Button from './Button.jsx'
import * as Engine from './Engine'

class App extends Component {
  state = {}
  game = Engine.newGame()

  componentDidMount() {
    this.initState()
  }

  initState = () => {
    this.setState({
      currentResult: this.game.initResult,
      currentSteps: this.game.steps,
      isGameEnded: false,
      isWon: false
    })
  }

  doReset = e => {
    e.preventDefault()
    this.initState()
  }

  doClickButton = op => e => {
    e.preventDefault()

    if (this.state.isGameEnded) return console.log('end')

    const currentResult = Engine.applyOp(this.state.currentResult, op)
    const currentSteps = this.state.currentSteps - 1
    const isGameEnded = Engine.isGameEnded(currentSteps)
    const isWon = Engine.isWon(this.game, currentSteps, currentResult)

    this.setState({ currentResult, currentSteps, isGameEnded, isWon })
  }

  getMessage = () => {
    if (!this.state.isGameEnded)
      return (
        <p className="mb-0">
          <strong>Instruction:</strong> Try to reach the goal within allowed moves.
        </p>
      )

    return <strong>{this.state.isWon ? 'You won' : 'You lost. Press CLR to try again.'}</strong>
  }

  render() {
    const { operators, goal } = this.game

    return (
      <div className="container mt-2">
        <div className="d-flex justify-content-between f-iceberg">
          <div className="px-2 text-center">
            <h3>Goal</h3>
            <h2 className="display-4">
              <span className="badge badge-light">{goal}</span>
            </h2>
          </div>

          <div className="px-2 text-center">
            <h3>Moves</h3>
            <h2 className="display-4">
              <span className="badge badge-light">{this.state.currentSteps}</span>
            </h2>
          </div>

          <div className="px-2 text-center">
            <h3>Result</h3>
            <h2 className="display-4">
              <span className="badge badge-primary">{this.state.currentResult}</span>
            </h2>
          </div>
        </div>

        <div className="alert alert-info">{this.getMessage()}</div>

        <div className="row f-iceberg">
          {operators.map(op => (
            <div className="col-6 col-md-3" key={op.label}>
              <Button onClick={this.doClickButton(op)}>{op.label}</Button>
            </div>
          ))}
          <div className="col-6 col-md-3">
            <Button onClick={this.doReset}>CLR</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
