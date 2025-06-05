import { SudokuBoard } from './SudokuBoard'
import './App.css'

function App() {
  return (
    <div className="sudoku-app">
      <h1>Sudoku</h1>
      <button 
        className="new-game-button" 
        onClick={() => { /* Functionality to be added later */ }}
      >
        New Game
      </button>
      <SudokuBoard />
    </div>
  )
}

export default App
