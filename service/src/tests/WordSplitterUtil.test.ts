const WordSplitterUtil = require("../utils/WordSplitterUtil");

describe("WordSplitterUtil test", () => {
    describe("When split is called", () => {
        console.log(WordSplitterUtil);
        const word = "helloworld";
        let results;
        describe("When the searchTerm is at beginning", () => {
            beforeEach(() => {
                const searchTerm = "hello";
                results = WordSplitterUtil.split(word, searchTerm);
            });

            test("should split into tuple with empty string as first index", () => {
                expect(results).toEqual(["", "world"]);
            });
        });

        describe("When the searchTerm is at the end", () => {
            beforeEach(() => {
                const searchTerm = "world";
                results = WordSplitterUtil.split(word, searchTerm);
            });
            
            test("should split into tuple with empty string as last index", () => {
                expect(results).toEqual(["", "world"]);
            });
        });

        describe("when the searchTerm shows up once", () => {
            beforeEach(() => {
                const searchTerm = "lowo";
                results = WordSplitterUtil.split(word, searchTerm);
            });

            test("should split into tuple as expected" ,() => {
                expect(results).toEqual(["hel", "rld"]);
            });
        });

        describe("when the searchTerm shows up more than once", () => {
            beforeEach(() => {
                const searchTerm = "l";
                results = WordSplitterUtil.split(word, searchTerm);
            });
            
            test("should only split on the first instance", () => {
                expect(results).toEqual(["he", "loworld"]);
            });
        });
    });
});
