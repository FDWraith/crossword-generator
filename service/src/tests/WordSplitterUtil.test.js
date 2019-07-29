var WordSplitterUtil = require("../utils/WordSplitterUtil");
describe("WordSplitterUtil test", function () {
    describe("When split is called", function () {
        console.log(WordSplitterUtil);
        var word = "helloworld";
        var results;
        describe("When the searchTerm is at beginning", function () {
            beforeEach(function () {
                var searchTerm = "hello";
                results = WordSplitterUtil.split(word, searchTerm);
            });
            test("should split into tuple with empty string as first index", function () {
                expect(results).toEqual(["", "world"]);
            });
        });
        describe("When the searchTerm is at the end", function () {
            beforeEach(function () {
                var searchTerm = "world";
                results = WordSplitterUtil.split(word, searchTerm);
            });
            test("should split into tuple with empty string as last index", function () {
                expect(results).toEqual(["", "world"]);
            });
        });
        describe("when the searchTerm shows up once", function () {
            beforeEach(function () {
                var searchTerm = "lowo";
                results = WordSplitterUtil.split(word, searchTerm);
            });
            test("should split into tuple as expected", function () {
                expect(results).toEqual(["hel", "rld"]);
            });
        });
        describe("when the searchTerm shows up more than once", function () {
            beforeEach(function () {
                var searchTerm = "l";
                results = WordSplitterUtil.split(word, searchTerm);
            });
            test("should only split on the first instance", function () {
                expect(results).toEqual(["he", "loworld"]);
            });
        });
    });
});
