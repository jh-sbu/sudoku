class Node {
    public left: Node;
    public right: Node;
    public up: Node;
    public down: Node;
    public column: ColumnNode;
    public row: number;

    constructor() {
        this.left = this;
        this.right = this;
        this.up = this;
        this.down = this;
        this.column = null!;
        this.row = -1;
    }
}

class ColumnNode extends Node {
    public size: number;
    public name: string;

    constructor(name: string) {
        super();
        this.size = 0;
        this.name = name;
        this.column = this;
    }
}

export class SudokuDLX {
    private header: ColumnNode;
    private solution: number[][];

    constructor() {
        this.header = this.createDLXStructure();
        this.solution = [];
    }

    private createDLXStructure(): ColumnNode {
        const header = new ColumnNode("header");
        
        // Create column nodes for all 324 constraints
        const columns: ColumnNode[] = [];
        for (let i = 0; i < 324; i++) {
            const col = new ColumnNode(i.toString());
            col.right = header;
            col.left = header.left;
            header.left.right = col;
            header.left = col;
            columns.push(col);
        }

        // Create rows for all possible number placements
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                for (let num = 1; num <= 9; num++) {
                    const cellConstraint = row * 9 + col;
                    const rowConstraint = 81 + row * 9 + (num - 1);
                    const colConstraint = 162 + col * 9 + (num - 1);
                    const boxConstraint = 243 + (Math.floor(row / 3) * 3 + Math.floor(col / 3)) * 9 + (num - 1);
                    
                    const newNode = new Node();
                    const nodes = [
                        this.getNode(columns[cellConstraint]),
                        this.getNode(columns[rowConstraint]),
                        this.getNode(columns[colConstraint]),
                        this.getNode(columns[boxConstraint])
                    ];

                    for (const column of nodes) {
                        newNode.left = nodes[nodes.length - 1];
                        newNode.right = nodes[0];
                        
                        newNode.up = column.up;
                        newNode.down = column;
                        column.up.down = newNode;
                        column.up = newNode;
                        
                        newNode.column = column;
                        newNode.row = row * 81 + col * 9 + (num - 1);
                        column.size++;
                    }
                }
            }
        }

        return header;
    }

    private getNode(column: ColumnNode): Node {
        const node = new Node();
        node.column = column;
        node.up = column.up;
        node.down = column;
        column.up.down = node;
        column.up = node;
        column.size++;
        return node;
    }

    private cover(column: ColumnNode) {
        column.right.left = column.left;
        column.left.right = column.right;

        for (let row = column.down; row !== column; row = row.down) {
            for (let node = row.right; node !== row; node = node.right) {
                node.down.up = node.up;
                node.up.down = node.down;
                node.column.size--;
            }
        }
    }

    private uncover(column: ColumnNode) {
        for (let row = column.up; row !== column; row = row.up) {
            for (let node = row.left; node !== row; node = node.left) {
                node.column.size++;
                node.down.up = node;
                node.up.down = node;
            }
        }

        column.right.left = column;
        column.left.right = column;
    }

    private search(k: number): boolean {
        if (this.header.right === this.header) {
            return true;
        }

        let column = this.header.right as ColumnNode;
        for (let c = this.header.right as ColumnNode; c !== this.header; c = c.right as ColumnNode) {
            if (c.size < column.size) {
                column = c;
            }
        }

        this.cover(column);

        for (let row = column.down; row !== column; row = row.down) {
            this.solution.push([row.row]);
            
            for (let node = row.right; node !== row; node = node.right) {
                this.cover(node.column);
            }

            if (this.search(k + 1)) {
                return true;
            }

            this.solution.pop();

            for (let node = row.left; node !== row; node = node.left) {
                this.uncover(node.column);
            }
        }

        this.uncover(column);
        return false;
    }

    public solve(): number[][] | null {
        this.solution = [];
        if (!this.search(0)) {
            return null;
        }

        const solutionGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
        for (const row of this.solution) {
            const value = row[0];
            const num = (value % 9) + 1;
            const cell = Math.floor(value / 9);
            const r = Math.floor(cell / 9);
            const c = cell % 9;
            solutionGrid[r][c] = num;
        }

        return solutionGrid;
    }

    public static generateSudoku(): number[][] {
        const dlx = new SudokuDLX();
        const solution = dlx.solve();
        if (!solution) {
            throw new Error("Failed to generate Sudoku solution");
        }
        return solution;
    }
}
