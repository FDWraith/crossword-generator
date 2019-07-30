class WordSplitterUtil {
    constructor() {
        // does nothing
    }

    // Splits a given string s in half along the searchTerm,
    // Returns the prefix and postfix in a tuple
    split(s: string, searchTerm: string): [string, string] {
        let results = s.split(searchTerm);
        return [ results[0], results.slice(1).join(searchTerm) ];
    }    
}


export default new WordSplitterUtil();
