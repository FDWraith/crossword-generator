"use strict";
exports.__esModule = true;
var WordSearch = /** @class */ (function () {
    function WordSearch(words) {
        this.words = words;
    }
    WordSearch.prototype.search = function (searchTerm) {
        return this.words.filter(function (word) {
            return word.indexOf(searchTerm) !== -1;
        });
    };
    WordSearch.prototype.size = function () {
        return this.words.length;
    };
    WordSearch.prototype.remove = function (word) {
        var index = this.words.indexOf(word);
        this.words.splice(index, index + 1);
    };
    return WordSearch;
}());
exports["default"] = WordSearch;
