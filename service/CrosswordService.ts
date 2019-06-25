import WordSplitterUtil from "utils/WordSplitterUtil";
import Grid from "classes/Grid";
import WordSearch from "classes/WordSearch";

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
        if (letter && letter.value() !== "_") {
            const xCor = letter.getX();
            const yCor = letter.getY();
            let searchTerm = undefined;
            if (!letter.getDirections().includes("vertical")) {
                searchTerm = grid.getVerticalSearchTerm(xCor, yCor);
                let newDirection = "vertical";
            }

            if (!letter.getDirections().includes("horizontal")) {
                searchTerm = grid.getHorizontalSearchTerm(xCor, yCor);
                let newDirection = "horizontal";
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
