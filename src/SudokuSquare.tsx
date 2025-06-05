interface SudokuSquareProps {
    value: number;
    predefined: boolean;
    row: number;
    col: number;
    onChange: (value: number) => void;
}

export const SudokuSquare = ({ value, predefined, row, col, onChange }: SudokuSquareProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        // Allow single digit numbers 1-9 or empty
        if (/^[1-9]$/.test(input) || input === '') {
            onChange(input === '' ? 0 : parseInt(input));
        }
    };

    return (
        <input
            className={`sudoku-square ${predefined ? 'predefined' : ''} row-${row} col-${col}`}
            value={value || ''}
            onChange={handleChange}
            maxLength={1}
            disabled={predefined}
        />
    );
};
