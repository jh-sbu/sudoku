import { useState } from 'react';
import { SudokuSquare } from './SudokuSquare';

export const SudokuBoard = () => {
    const initialBoard = [
        [1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 4, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 5, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 6, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 7, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 8, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 9],
    ];

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
