import { useState } from 'react';
import { SudokuSquare } from './SudokuSquare';
import { SudokuDLX } from './SudokuDLX';

export const SudokuBoard = () => {
    const initialBoard = SudokuDLX.generateSudoku();
    const [board, setBoard] = useState(initialBoard);

    const handleSquareChange = (row: number, col: number, value: number) => {
        const newBoard = [...board];
        newBoard[row][col] = value;
        setBoard(newBoard);
    };

    return (
        <div className="sudoku-board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="sudoku-row">
                    {row.map((value, colIndex) => (
                        <SudokuSquare
                            key={`${rowIndex}-${colIndex}`}
                            value={value}
                            predefined={initialBoard[rowIndex][colIndex] !== 0}
                            row={rowIndex}
                            col={colIndex}
                            onChange={(value) => handleSquareChange(rowIndex, colIndex, value)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};
