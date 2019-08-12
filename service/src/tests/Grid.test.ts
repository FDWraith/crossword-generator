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

    describe("When addHorizontal is called", () => {
        let letter;
        beforeEach(() => {
            grid.insertAt(1,1,"h");
            letter = grid.letterAt(1,1);
            letter.addDirection(Direction.Vertical);
        });
        
        describe("When called with a prefix", () => {
            beforeEach(() => {
                grid.addHorizontal("ab", "", 1, 1);
            });

            test("Should add letters along the x-axis before passed in coords", () => {
                expect(grid.letterAt(0,1)).toBeDefined();
                expect(grid.letterAt(0,1).getValue()).toEqual("b");
                expect(grid.letterAt(-1,1)).toBeDefined();
                expect(grid.letterAt(-1,1).getValue()).toEqual("a");
                expect(grid.letterAt(2,1)).not.toBeDefined();
            });

            test("Should add Horizontal direction to each letter", () => {
                expect(grid.letterAt(0,1)).toBeDefined();
                expect(grid.letterAt(0,1).getDirections()).toEqual([Direction.Horizontal]);
                expect(grid.letterAt(-1,1)).toBeDefined();
                expect(grid.letterAt(-1,1).getDirections()).toEqual([Direction.Horizontal]);
                expect(letter.getDirections()).toEqual([Direction.Vertical, Direction.Horizontal]);
            });
        });

        describe("When called with a postfix", () => {
            beforeEach(() => {
                grid.addHorizontal("", "ab", 1, 1);
            });

            test("Should add letters along the x-axis after passed in coords", () => {
                expect(grid.letterAt(3,1)).toBeDefined();
                expect(grid.letterAt(3,1).getValue()).toEqual("b");
                expect(grid.letterAt(2,1)).toBeDefined();
                expect(grid.letterAt(2,1).getValue()).toEqual("a");
                expect(grid.letterAt(0,1)).not.toBeDefined();
            });

            test("Should add Horizontal direction to each letter", () => {
                expect(grid.letterAt(3,1)).toBeDefined();
                expect(grid.letterAt(3,1).getDirections()).toEqual([Direction.Horizontal]);
                expect(grid.letterAt(2,1)).toBeDefined();
                expect(grid.letterAt(2,1).getDirections()).toEqual([Direction.Horizontal]);
                expect(letter.getDirections()).toEqual([Direction.Vertical, Direction.Horizontal]);
            });
        });
    });

    describe("When addVertical is called", () => {
        let letter;
        beforeEach(() => {
            grid.insertAt(1,1,"h");
            letter = grid.letterAt(1,1);
            letter.addDirection(Direction.Horizontal);
        });
        
        describe("When called with a prefix", () => {
            beforeEach(() => {
                grid.addVertical("ab", "", 1, 1);
            });

            test("Should add letters along the y-axis before passed in coords", () => {
                expect(grid.letterAt(1,0)).toBeDefined();
                expect(grid.letterAt(1,0).getValue()).toEqual("b");
                expect(grid.letterAt(1,-1)).toBeDefined();
                expect(grid.letterAt(1,-1).getValue()).toEqual("a");
                expect(grid.letterAt(1,2)).not.toBeDefined();
            });

            test("Should add Vertical direction to each letter", () => {
                expect(grid.letterAt(1,0)).toBeDefined();
                expect(grid.letterAt(1,0).getDirections()).toEqual([Direction.Vertical]);
                expect(grid.letterAt(1,-1)).toBeDefined();
                expect(grid.letterAt(1,-1).getDirections()).toEqual([Direction.Vertical]);
                expect(letter.getDirections()).toEqual([Direction.Horizontal, Direction.Vertical]);
            });
        });

        describe("When called with a postfix", () => {
            beforeEach(() => {
                grid.addVertical("", "ab", 1, 1);
            });

            test("Should add letters along the x-axis after passed in coords", () => {
                expect(grid.letterAt(1,3)).toBeDefined();
                expect(grid.letterAt(1,3).getValue()).toEqual("b");
                expect(grid.letterAt(1,2)).toBeDefined();
                expect(grid.letterAt(1,2).getValue()).toEqual("a");
                expect(grid.letterAt(1,0)).not.toBeDefined();
            });

            test("Should add Vertical direction to each letter", () => {
                expect(grid.letterAt(1,3)).toBeDefined();
                expect(grid.letterAt(1,3).getDirections()).toEqual([Direction.Vertical]);
                expect(grid.letterAt(1,2)).toBeDefined();
                expect(grid.letterAt(1,2).getDirections()).toEqual([Direction.Vertical]);
                expect(letter.getDirections()).toEqual([Direction.Horizontal, Direction.Vertical]);
            });
        });
    });

    describe("When getVerticalSearchTerm is called", () => {
        let result;
        describe("When there is no letter at the given coordinates", () => {
            beforeEach(() => {
                result = grid.getVerticalSearchTerm(50, 50);
            });
            
            test("Should return empty string", () => {
                expect(result).toEqual("");
            });
        });

        describe("When there is a letter at the given coordinates", () => {
            beforeEach(() => {
                grid.insertAt(50, 50, "a");
            }); 
            
            describe("When there are no letters around the letter", () => {
                beforeEach(() => {
                    result = grid.getVerticalSearchTerm(50, 50);
                });

                test("Should return the letter", () => {
                    expect(result).toEqual("a");
                });
            });

            describe("When there are letters before the letter", () => {
                beforeEach(() => {
                    grid.insertAt(50, 49, "b");
                    grid.insertAt(50, 48, "c");
                    result = grid.getVerticalSearchTerm(50, 50);
                });

                test("Should combine letters to create searchTerm", () => {
                    expect(result).toEqual("cba");
                });
            });

            describe("When there are letters after the letter", () => {
                beforeEach(() => {
                    grid.insertAt(50, 51, "b");
                    grid.insertAt(50, 52, "c");
                    result = grid.getVerticalSearchTerm(50, 50);
                });

                test("Should combine letters to create searchTerm", () => {
                    expect(result).toEqual("abc");
                });
            });
        });
    });

    describe("When getHorizontalSearchTerm is called", () => {
        let result;
        describe("When there is no letter at the given coordinates", () => {
            beforeEach(() => {
                result = grid.getHorizontalSearchTerm(50, 50);
            });
            
            test("Should return empty string", () => {
                expect(result).toEqual("");
            });
        });

        describe("When there is a letter at the given coordinates", () => {
            beforeEach(() => {
                grid.insertAt(50, 50, "a");
            }); 
            
            describe("When there are no letters around the letter", () => {
                beforeEach(() => {
                    result = grid.getHorizontalSearchTerm(50, 50);
                });

                test("Should return the letter", () => {
                    expect(result).toEqual("a");
                });
            });

            describe("When there are letters before the letter", () => {
                beforeEach(() => {
                    grid.insertAt(49, 50, "b");
                    grid.insertAt(48, 50, "c");
                    result = grid.getHorizontalSearchTerm(50, 50);
                });

                test("Should combine letters to create searchTerm", () => {
                    expect(result).toEqual("cba");
                });
            });

            describe("When there are letters after the letter", () => {
                beforeEach(() => {
                    grid.insertAt(51, 50, "b");
                    grid.insertAt(52, 50, "c");
                    result = grid.getHorizontalSearchTerm(50, 50);
                });

                test("Should combine letters to create searchTerm", () => {
                    expect(result).toEqual("abc");
                });
            });
        });
    });
});
