import Direction from "classes/Direction";


class Letter {
    directions: array<Direction>;
    readonly xCor: number;
    readonly yCor: number;
    value: string;

    constructor(xCor: number, yCor: number, value?: string) {
        this.xCor = xCor;
        this.yCor = yCor;
        this.directions = [];
        this.value = value || "";
    }

    getValue(): string {
        return this.value;
    }

    getXCor(): number {
        return this.xCor;
    }

    getYCor(): number {
        return this.yCor;
    }

    getDirections(): array<Direction> {
        return this.directions;
    }

    setValue(value: string): void {
        this.value = value;
    }

    addDirection(direction: Direction): void {
        this.directions.push(direction);
    }
}


export default { Letter, Direction }
