export default class WordSearch {
    // Implementation is Temporary to test other functionality
    // Optimization by storing words with Tries.

    words: Array<string>;
    
    constructor(words: Array<string>) {
        this.words = words;
    }

    search(searchTerm: string): Array<string> {
        return this.words.filter((word: string) => {
            return word.indexOf(searchTerm) !== -1;
        })
    }

    size(): number {
        return this.words.length;
    }

    remove(word: string): void {
        let index = this.words.indexOf(word);
        this.words.splice(index, index + 1);
    }
}
