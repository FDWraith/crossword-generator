import { Letter, Direction } from "classes/Letter";

export default class Grid {
    grid: object;
    
    constructor() {
        this.grid = {};
        let intialLetter = new Letter(0, 0);
        initialLetter.addDirection("horizontal");
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

    setLetter(xCor: number, yCor: number, value: string, direction: Direction): void {
        let letter = this.letterAt(xCor, yCor);
        if (letter) {
            letter.setValue(value);
        } else {
            letter = new Letter(xCor, yCor, value);
            this.insertAt(xCor, yCor, letter);
        }
        letter.addDirection(direction);
    }

    addHorizontal(prefix: string, postfix: string, xCor: number, yCor: number): void {
        const prefixLetters = prefix.split("");
        const postfixLetter = postfix.split("");
        const direction = Direction.Horizontal;
        // Implementation
        for (let pre = 1; pre < prefix.length; pre += 1) {
            let value = prefixLetters.pop();
            this.setLetter(xCor - pre, yCor, value, direction);
        }

        for (let post = 1; pre < postfix.length; post += 1) {
            let value = prefixLetters.shift();
            this.setLetter(xCor + post, yCor, value, direction);
        }        
    }

    addVertical(prefix: string, postfix: string, xCor: number, yCor: number): void {
        const prefixLetters = prefix.split("");
        const postfixLetter = postfix.split("");
        const direction = Direction.Vertical;
        // Implementation
        for (let pre = 1; pre < prefix.length; pre += 1) {
            let value = prefixLetters.pop();
            this.setLetter(xCor, yCor - pre, value, direction);
        }

        for (let post = 1; pre < postfix.length; post += 1) {
            let value = prefixLetters.shift();
            this.setLetter(xCor, yCor + post, value, direction);
        }
    }

    getVerticalSearchTerm(xCor: number, yCor: number): string {
        // Implementation
    }

    getHorizontalSearchTerm(xCor: number, yCor: number): string {
        // Implementation
    }
    
}
