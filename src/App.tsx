import { useState } from 'react'
import { SudokuBoard } from './SudokuBoard'
import './App.css'

function App() {
  const [boardKey, setBoardKey] = useState(0);

  return (
    <div className="sudoku-app">
      <h1>Sudoku</h1>
      <button 
        className="new-game-button" 
        onClick={() => setBoardKey(prev => prev + 1)}
      >
        New Game
      </button>
      <SudokuBoard key={boardKey} />
    </div>
  )
}

export default App
