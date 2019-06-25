import Letter from "classes/Letter";

export default class Grid {
    grid: object;
    
    constructor() {
        this.grid = {};
        let intialLetter = new Letter(0, 0);
        this.insertAt(0, 0, initialLetter);
    }
    
    insertAt(xCor: number, yCor: number, letter: Letter): void {
        if (!this.grid[xCor]) {
            this.grid[xCor] = {};
        }
        this.grid[xCor][yCor] = letter;
    }
    
    letterAt(xCor: number, yCor: number): Letter | null { 
        if (this.grid[xCor]) {
            return this.grid[xCor][yCor];
        } else {
            return null;
        }
    }
    
}
