import WordSplitterUtil from "utils/WordSplitterUtil";
import Grid from "classes/Grid";
import WordSearch from "classes/WordSearch";
import Direction from "classes/Direction";

function generate(words: Array<string>): any {
    words = words.map(word => "_" + word + "_");

    let initialWord = words[0];
    let grid = new Grid();
    grid.addHorizontal("", initialWord, 0, 0);
    let remainingWords = new WordSearch(words.slice(1));
    
    let queue = [];
    for (let i = 0; i < initialWord.length; i+= 1) {
        queue.push(grid.letterAt(1 + i, 0));
    }
    
    while (queue.length !== 0 && remainingWords.size() > 0) {
        let letter = queue.shift();
        if (letter && letter.getValue() !== "_") {
            const xCor = letter.getXCor();
            const yCor = letter.getYCor();
            let searchTerm;
            let newDirection;
            if (!letter.getDirections().includes(Direction.Vertical)) {
                searchTerm = grid.getVerticalSearchTerm(xCor, yCor);
                newDirection = Direction.Vertical;
            }

            if (!letter.getDirections().includes(Direction.Horizontal)) {
                searchTerm = grid.getHorizontalSearchTerm(xCor, yCor);
                newDirection = Direction.Horizontal;
            }
            
            if (searchTerm) {
                let possibilities = remainingWords.search(searchTerm);
                if (possibilities !== []) {
                    let word = possibilities[0];
                    remainingWords.remove(word);
                    let [prefix, postfix] = WordSplitterUtil.split(word, searchTerm);

                    if (newDirection === "vertical") {
                        grid.addVertical(prefix, postfix, xCor, yCor);
                        for (let pre = 1; pre < prefix.length; pre += 1) {
                            queue.push(grid.letterAt(xCor, yCor - pre));
                        }
                        for (let post = 1; post < postfix.length; post += 1 ) {
                            queue.push(grid.letterAt(xCor, yCor + post));
                        }
                    } else {
                        grid.addHorizontal(prefix, postfix, xCor, yCor);
                        for (let pre = 1; pre < prefix.length; pre += 1) {
                            queue.push(grid.letterAt(xCor - pre, yCor));
                        }
                        for (let post = 1; post < postfix.length; post += 1 ) {
                            queue.push(grid.letterAt(xCor + post, yCor));
                        }
                    }
                }
            }
        }        
    }

    return grid.flatten();
}

export default { generate }; 
