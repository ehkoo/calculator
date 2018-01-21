import React, { Component } from 'react'
import classnames from 'classnames'
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

  doMakeNewGame = e => {
    e.preventDefault()
    this.game = Engine.newGame()
    this.initState()
  }

  renderMessage = () => {
    const classes = classnames('mb-0 alert', {
      'alert-info': !this.state.isGameEnded,
      'alert-success': this.state.isGameEnded && this.state.isWon,
      'alert-danger': this.state.isGameEnded && !this.state.isWon
    })
    const message = !this.state.isGameEnded ? (
      <span>
        <strong>Instruction:</strong> With initial result, try to reach the goal within allowed moves.
      </span>
    ) : (
      <strong>{this.state.isWon ? 'You won. Press NEW for a new game.' : 'You lost. Press CLR to try again.'}</strong>
    )

    return (
      <div className={classes}>
        <p className="mb-0">{message}</p>
      </div>
    )
  }

  render() {
    const { operators, goal } = this.game

    return (
      <div className="container mt-2">
        <div className="d-flex justify-content-between">
          <div className="px-2 text-center">
            <h4>Goal</h4>
            <h2 className="display-4">
              <span className="badge badge-light">{goal}</span>
            </h2>
          </div>

          <div className="px-2 text-center">
            <h4>Moves</h4>
            <h2 className="display-4">
              <span className="badge badge-light">{this.state.currentSteps}</span>
            </h2>
          </div>

          <div className="px-2 text-center">
            <h4>Result</h4>
            <h2 className="display-4">
              <span className="badge badge-primary">{this.state.currentResult}</span>
            </h2>
          </div>
        </div>

        {this.renderMessage()}

        <div className="mt-2 row">
          {operators.map(op => (
            <div className="col-6 col-md-3" key={op.label}>
              <Button onClick={this.doClickButton(op)}>{op.label}</Button>
            </div>
          ))}
          <div className="col-6 col-md-3">
            {this.state.isGameEnded ? (
              <Button onClick={this.doMakeNewGame}>NEW</Button>
            ) : (
              <Button onClick={this.doReset}>CLR</Button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
