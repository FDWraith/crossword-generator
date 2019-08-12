import Letter from "./Letter";
import Direction from "./Direction";

export default class Grid {
    grid: object;
    
    constructor() {
        this.grid = {};
        this.setLetter(0, 0, "", Direction.Horizontal);
    }
    
    insertAt(xCor: number, yCor: number, value: string): void {
        let letter = new Letter(xCor, yCor, value);
        if (!this.grid[xCor]) {
            this.grid[xCor] = {};
        }
        this.grid[xCor][yCor] = letter;
    }
    
    letterAt(xCor: number, yCor: number): Letter | null { 
        if (this.grid[xCor]) {
            return this.grid[xCor][yCor];
        } else {
            return;
        }
    }

    // TODO Merge insertAt and setLetter (functionally, they behave the same)

    setLetter(xCor: number, yCor: number, value: string, direction: Direction): void {
        let letter = this.letterAt(xCor, yCor);
        if (letter) {
            letter.setValue(value);
        } else {
            this.insertAt(xCor, yCor, value);
            letter = this.letterAt(xCor, yCor);
        }
        letter.addDirection(direction);
    }


    // TODO Optimize implementations for addHorizontal + adddVertical
    //      - Split on string is not very time efficient
    addHorizontal(prefix: string, postfix: string, xCor: number, yCor: number): void {
        const prefixLetters = prefix.split("");
        const postfixLetters = postfix.split("");
        const direction = Direction.Horizontal;

        // Implementation
        for (let pre = 1; pre <= prefix.length; pre += 1) {
            let value = prefixLetters.pop();
            this.setLetter(xCor - pre, yCor, value, direction);
        }

        for (let post = 1; post <= postfix.length; post += 1) {
            let value = postfixLetters.shift();
            this.setLetter(xCor + post, yCor, value, direction);
        }        
        
        const center = this.letterAt(xCor, yCor);
        center.addDirection(direction);
    }

    addVertical(prefix: string, postfix: string, xCor: number, yCor: number): void {
        const prefixLetters = prefix.split("");
        const postfixLetters = postfix.split("");
        const direction = Direction.Vertical;

        // Implementation
        for (let pre = 1; pre <= prefix.length; pre += 1) {
            let value = prefixLetters.pop();
            this.setLetter(xCor, yCor - pre, value, direction);
        }

        for (let post = 1; post <= postfix.length; post += 1) {
            let value = postfixLetters.shift();
            this.setLetter(xCor, yCor + post, value, direction);
        }

        const center = this.letterAt(xCor, yCor);
        center.addDirection(direction);
    }

    getVerticalSearchTerm(xCor: number, yCor: number): string {
        if (!this.letterAt(xCor, yCor)) {
            return "";
        }

        let prefix = "";
        let center = this.letterAt(xCor, yCor).getValue();
        let postfix = "";

        let currYCor = yCor - 1;
        while (this.letterAt(xCor, currYCor)) {
            prefix = this.letterAt(xCor, currYCor).getValue() + prefix;
            currYCor -= 1;
        }

        currYCor = yCor + 1;
        while (this.letterAt(xCor, currYCor)) {
            postfix += this.letterAt(xCor, currYCor).getValue();
            currYCor += 1;
        }

        return prefix + center + postfix;
    }

    getHorizontalSearchTerm(xCor: number, yCor: number): string {
        if (!this.letterAt(xCor, yCor)) {
            return "";
        }

        let prefix = "";
        let center = this.letterAt(xCor, yCor).getValue();
        let postfix = "";


        let currXCor = xCor - 1;
        while (this.letterAt(currXCor, yCor)) {
            prefix = this.letterAt(currXCor, yCor).getValue() + prefix;
            currXCor -= 1;
        }

        currXCor = xCor + 1;
        while (this.letterAt(currXCor, yCor)) {
            postfix += this.letterAt(currXCor, yCor).getValue();
            currXCor += 1;
        }

        return prefix + center + postfix;
    }
    
    // TODO Clean this up
    flatten(): any {
        const xCors = Object.keys(this.grid).map((key) => parseInt(key));
        const yCorsMap = {};
        xCors.forEach((xCor) => {
            Object.keys(this.grid[xCor]).forEach((yCor) => { yCorsMap[yCor] = 1; });
        })
        const yCors = Object.keys(yCorsMap).map((key) => parseInt(key));

        const minXCor = xCors.reduce((minSoFar, value) => (minSoFar < value ? minSoFar : value));
        const maxXCor = xCors.reduce((maxSoFar, value) => (maxSoFar > value ? maxSoFar : value));

        const minYCor = yCors.reduce((minSoFar, value) => (minSoFar < value ? minSoFar : value));
        const maxYCor = yCors.reduce((maxSoFar, value) => (maxSoFar > value ? maxSoFar : value));

        const result = [];        
        for (let x = minXCor; x <= maxXCor; x += 1) {
            let yRow = [];
            for (let y = minYCor; y <= maxYCor; y += 1) {
                let value = (this.grid[x][y] && this.grid[x][y].getValue()) || "";
                yRow.push(value);
            }
            result.push(yRow);
        }
        
        return result;
    }

}
