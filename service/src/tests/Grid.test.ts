import Grid from "../classes/Grid";
import Letter from "../classes/Letter";
import Direction from "../classes/Direction";

describe("Grid Tests", () => {
    let grid;
    beforeEach(() => {
        grid = new Grid();
    });

    describe("When Grid is constructed", () => {
        test("should create initial letter with empty string", () => {
            expect(grid.flatten()).toEqual([[""]]);
        });
    });

    describe("When insertAt is called", () => {
        beforeEach(() => {
            grid.insertAt(0,1, "h");
        });

        test("should set value at the given coordinates", () => {
            expect(grid.letterAt(0,1)).toEqual(new Letter(0, 1, "h"));
        });
    });

    describe("When letterAt is called", () => {
        describe("When there is a letter at the given coordinates", () => {
            let result;
            beforeEach(() => {
                grid.insertAt(0, 1, "h");
                result = grid.letterAt(0,1);
            });

            test("should return the letter", () => {
                expect(result.getValue(0)).toEqual("h");
            });
        });

        describe("When there is no letter at the given coordinates", () => {
            let result;
            beforeEach(() => {
                result = grid.letterAt(1,0);
            });

            test("should return undefined", () => {
                expect(result).toBeUndefined();
            });
        });
    });

    describe("When setLetter is called", () => {
        let letter;
        describe("When there is a letter at the given coordinates", () => {
            let letter;
            beforeEach(() => {
                grid.insertAt(1,1,"h");
                letter = grid.letterAt(1,1);
                grid.setLetter(1,1,"b", Direction.Horizontal);
            });
            
            test("Should update letter", () => {
                expect(letter.getValue()).toEqual("b");
                expect(letter.getDirections()).toEqual([Direction.Horizontal]);
            });
        });

        describe("When there is no letter at the given coordinates", () => {
            beforeEach(() => {
                grid.setLetter(1,1,"b", Direction.Vertical);
            });

            test("Should insert a letter", () => {
                let letter = grid.letterAt(1,1);
                expect(letter).toBeDefined();
                expect(letter.getValue()).toEqual('b');
                expect(letter.getDirections()).toEqual([Direction.Vertical]);
            })
        })
    });

   
    
});
