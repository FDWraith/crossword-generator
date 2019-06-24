
function generate(words) {
    let initialWord = words[0];
    let word = new Word(intialWord);
    let remainingWords = new WordSearch(words.slice(1));
    
    let queue = word.getAllLetters();
    
    while (remainingWords.size() > 0) {
        let letter = queue.shift();
        if (letter.getRemainingDirections().includes("vertical")) {
            let searchTerm = letter.getVertical();
        }

        if (letter.getRemainingDirections().includes("horizontal")) {
            let searchTerm = letter.getHorizontal();
        }
        
        if (searchTerm) {
            let possibilities = remainingWords.search(searchTerm);
            if (possibilities != []) {
                let word = possibilities[0];
                remainingWords.remove(word);
                
            }
        }
    }
}
