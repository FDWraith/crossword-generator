import WordSplitterUtil from "utils/WordSplitterUtil";
import Word from "classes/Word";
import WordSearch from "classes/WordSearch";

function generate(words: Array<string>): void {
    let initialWord = words[0];
    let word = new Word(intialWord);
    let remainingWords = new WordSearch(words.slice(1));
    
    let queue = word.getAllLetters();
    
    while (queue.length !== 0 && remainingWords.size() > 0) {
        let letter = queue.shift();
        if (letter.getRemainingDirections().includes("vertical")) {
            let searchTerm = letter.getVertical();
            let newDirection = "vertical";
        }

        if (letter.getRemainingDirections().includes("horizontal")) {
            let searchTerm = letter.getHorizontal();
            let newDirection = "horizontal";
        }
        
        if (searchTerm) {
            let possibilities = remainingWords.search(searchTerm);
            if (possibilities !== []) {
                let word = possibilities[0];
                remainingWords.remove(word);
                let [prefix, suffix] = WordSplitterUtil.split(word, searchTerm);
                if (newDirection === "vertical") {
                    letter.addVertical(prefix, suffix);
                } else {
                    letter.addHorizontal(prefix, suffix);
                }
            }
        }
    }
}

export default { generate }; 
