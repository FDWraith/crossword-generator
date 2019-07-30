import WordSearch from "../classes/WordSearch"

describe("WordSearch test", () => {
    const words = ["hello", "world"];
    let ws, results;

    beforeEach(() => {
        ws = new WordSearch(words);
    })

    describe("When search is called", () => {
        describe("When called with common search term", () => {
            beforeEach(() => {
                results = ws.search("l");
            });

            test("should return multiple results", () => {
                expect(results.length).toBe(2);
                expect(results.includes("hello")).toBe(true);
                expect(results.includes("world")).toBe(true);
            });
        });

        describe("When called with search term with single result", () => {
            beforeEach(() => {
                results = ws.search("llo");
            });

            test("should return the one result", () => {
                expect(results.length).toBe(1);
                expect(results.includes("hello")).toBe(true);
            });
        });

        describe("When called with non-appearing search term", () => {
            beforeEach(() => {
                results = ws.search("okay");
            });

            test("should return empty results", () => {
                expect(results).toEqual([]);
            });
        });
    });

    describe("When size is called", () => {
        describe("When called with empty word list", () => {
            beforeEach(() => {
                ws = new WordSearch([]);
                results = ws.size();
            });

            test("Should return 0", () => {
                expect(results).toBe(0);
            });
        });

        describe("When called with words in word list", () => {
            beforeEach(() => {
                results = ws.size();
            });

            test("Should return appropriate size", () => {
                expect(results).toBe(2);
            });
        });
    });

    describe("When remove is called", () => {
        describe("When the word shows up once", () => {
            beforeEach(() => {
                ws.remove("hello");
            });

            test("Should not remove the word", () => {
                expect(ws.search("hello").includes("hello")).toBe(false);
                expect(ws.size()).toBe(1);
            });
        });

        describe("When the word shows up more than once", () => {
            beforeEach(() => {
                ws = new WordSearch(["hello", "hello", "world"]);
                ws.remove("hello");
            });

            test("Should only remove the first instance", () => {
                expect(ws.search("hello").includes("hello")).toBe(true);
                expect(ws.size()).toBe(2);
            });
        });

        describe("When the word is not in the word list", () => {
            beforeEach(() => {
                ws = new WordSearch(["world"]);
                ws.remove("hello");
            });

            test("Should not change anything.", () => {
                expect(ws.search("world").includes("world")).toBe(true);
                expect(ws.search("hello")).toEqual([]);
                expect(ws.size()).toBe(1);
            });            
        });
    });
});
