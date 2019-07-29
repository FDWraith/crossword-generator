"use strict";
exports.__esModule = true;
// Splits a given string s in half along the searchTerm,
// Returns the prefix and postfix in a tuple
function split(s, searchTerm) {
    var results = s.split(searchTerm);
    return [results[0], results.slice(1).join(searchTerm)];
}
exports["default"] = {
    split: split
};
