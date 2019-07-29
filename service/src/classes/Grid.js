"use strict";
exports.__esModule = true;
var Letter_1 = require("./Letter");
var Direction_1 = require("./Direction");
var Grid = /** @class */ (function () {
    function Grid() {
        this.grid = {};
        var initialLetter = new Letter_1["default"](0, 0);
        initialLetter.addDirection(Direction_1["default"].Horizontal);
        this.insertAt(0, 0, initialLetter);
    }
    Grid.prototype.insertAt = function (xCor, yCor, letter) {
        if (!this.grid[xCor]) {
            this.grid[xCor] = {};
        }
        this.grid[xCor][yCor] = letter;
    };
    Grid.prototype.letterAt = function (xCor, yCor) {
        if (this.grid[xCor]) {
            return this.grid[xCor][yCor];
        }
        else {
            return null;
        }
    };
    Grid.prototype.setLetter = function (xCor, yCor, value, direction) {
        var letter = this.letterAt(xCor, yCor);
        if (letter) {
            letter.setValue(value);
        }
        else {
            letter = new Letter_1["default"](xCor, yCor, value);
            this.insertAt(xCor, yCor, letter);
        }
        letter.addDirection(direction);
    };
    Grid.prototype.addHorizontal = function (prefix, postfix, xCor, yCor) {
        var prefixLetters = prefix.split("");
        var postfixLetter = postfix.split("");
        var direction = Direction_1["default"].Horizontal;
        // Implementation
        for (var pre = 1; pre < prefix.length; pre += 1) {
            var value = prefixLetters.pop();
            this.setLetter(xCor - pre, yCor, value, direction);
        }
        for (var post = 1; post < postfix.length; post += 1) {
            var value = prefixLetters.shift();
            this.setLetter(xCor + post, yCor, value, direction);
        }
    };
    Grid.prototype.addVertical = function (prefix, postfix, xCor, yCor) {
        var prefixLetters = prefix.split("");
        var postfixLetter = postfix.split("");
        var direction = Direction_1["default"].Vertical;
        // Implementation
        for (var pre = 1; pre < prefix.length; pre += 1) {
            var value = prefixLetters.pop();
            this.setLetter(xCor, yCor - pre, value, direction);
        }
        for (var post = 1; post < postfix.length; post += 1) {
            var value = prefixLetters.shift();
            this.setLetter(xCor, yCor + post, value, direction);
        }
    };
    Grid.prototype.getVerticalSearchTerm = function (xCor, yCor) {
        // Implementation
        if (!this.letterAt(xCor, yCor)) {
            return "";
        }
        var prefix = "";
        var suffix = "";
        var currYCor = yCor;
        while (this.letterAt(xCor, currYCor)) {
            prefix = this.letterAt(xCor, currYCor) + prefix;
        }
        currYCor = yCor + 1;
        while (this.letterAt(xCor, currYCor)) {
            suffix += this.letterAt(xCor, currYCor);
        }
        return prefix + suffix;
    };
    Grid.prototype.getHorizontalSearchTerm = function (xCor, yCor) {
        // Implementation
        if (!this.letterAt(xCor, yCor)) {
            return "";
        }
        var prefix = "";
        var suffix = "";
        var currXCor = xCor;
        while (this.letterAt(currXCor, yCor)) {
            prefix = this.letterAt(currXCor, yCor) + prefix;
        }
        currXCor = xCor + 1;
        while (this.letterAt(currXCor, yCor)) {
            suffix += this.letterAt(currXCor, yCor);
        }
        return prefix + suffix;
    };
    Grid.prototype.flatten = function () {
        // Implementation details TBD
        return this.grid;
    };
    return Grid;
}());
exports["default"] = Grid;
