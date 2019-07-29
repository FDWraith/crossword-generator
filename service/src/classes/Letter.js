"use strict";
exports.__esModule = true;
var Letter = /** @class */ (function () {
    function Letter(xCor, yCor, value) {
        this.xCor = xCor;
        this.yCor = yCor;
        this.directions = [];
        this.value = value || "";
    }
    Letter.prototype.getValue = function () {
        return this.value;
    };
    Letter.prototype.getXCor = function () {
        return this.xCor;
    };
    Letter.prototype.getYCor = function () {
        return this.yCor;
    };
    Letter.prototype.getDirections = function () {
        return this.directions;
    };
    Letter.prototype.setValue = function (value) {
        this.value = value;
    };
    Letter.prototype.addDirection = function (direction) {
        this.directions.push(direction);
    };
    return Letter;
}());
exports["default"] = Letter;
