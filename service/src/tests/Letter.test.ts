import Letter from "../classes/Letter";
import Direction from "../classes/Direction";

describe("Letter Method tests", () => {
    let letter;
    const xCor = 20;
    const yCor = 30;
    const value = "a";

    describe("When Letter is constructed without value", () => {
        beforeEach(() => {
            letter = new Letter(xCor, yCor);
        });
        
        test("Should set default value to \"\"", () => {
            expect(letter.getValue()).toEqual("");
        });

        test("Should set xCor properly", () => {
            expect(letter.getXCor()).toEqual(xCor);
        });

        test("Should set yCor properly", () => {
            expect(letter.getYCor()).toEqual(yCor);
        });

        test("Should set initial directions properly", () => {
            expect(letter.getDirections()).toEqual([]);
        });
    });

    describe("When Letter is constructed with value", () => {
        beforeEach(() => {
            letter = new Letter(xCor, yCor, value);
        });

        test("Should set value properly", () => {
            expect(letter.getValue()).toEqual(value);
        });

        test("Should set xCor properly", () => {
            expect(letter.getXCor()).toEqual(xCor);
        });

        test("Should set yCor properly", () => {
            expect(letter.getYCor()).toEqual(yCor);
        });

        test("Should set initial directions properly", () => {
            expect(letter.getDirections()).toEqual([]);
        });
    });

    describe("When addDirection is called", () => {
        beforeEach(() => {
            letter = new Letter(xCor, yCor, value);
            letter.addDirection(Direction.Horizontal);
        });        

        test("Should update directions property", () => {
            expect(letter.getDirections()).toEqual([Direction.Horizontal]);
        });
    });

    describe("When setValue is called", () => {
        beforeEach(() => {
            letter = new Letter(xCor, yCor, value);
            letter.setValue("s");
        });

        test("Should update value property", () => {
            expect(letter.getValue()).toEqual("s");
        });
    });
});
