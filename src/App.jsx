import React from 'react';
import Table from './components/Table'
import Button from './components/Button'
import Info from './components/Info'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cells: Array(9).fill(null),
      count: 1,
      info: 'Ход: X',
    }

    this.update = this.update.bind(this);
    this.restart = this.restart.bind(this);
    this._winCombination = this._winCombination();
  }

  _winCombination() {
    return [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
  }

  update({ index }) {
    const { cells, count } = this.state

    if (cells[index] !== null) {
      return
    }

    if (count % 2 === 0) {
      cells[index] = "O"


      this.setState({
        cells,
        count: count + 1,
        info: 'Ход: X',
      })

    } else if (count % 2 === 1) {
      cells[index] = "X"

      this.setState({
        cells,
        count: count + 1,
        info: 'Ход: O'
      })
    }

    for (let combo of this._winCombination) {
      const [a, b, c] = combo;

      if (
        cells[a] !== null &&
        cells[a] === cells[b] &&
        cells[b] === cells[c]
      ) {

        return this.setState({
          info: "Победил: " + cells[a],
          count: undefined,
        })

      } else if (count === 9) {
        this.setState({
          info: 'Ничья',
          count: undefined,
        })
      }
    }
  }

  restart() {
    return this.setState({
      cells: Array(9).fill(null),
      count: 1,
      info: 'Ход: X'
    })
  }

  render() {
    return (
      <div className="game">
        <Info info={this.state.info} />
        <Table update={this.update} cells={this.state.cells} />
        <Button restart={this.restart} />
      </div>
    )
  }
}

export default App;
