import { FixedLengthArray, Modules } from "./module/turing_complete";

function i8ToBoolArray(i8: number): FixedLengthArray<boolean, 8> {
    // Convert an 8-bit integer to a boolean[8] array
    const boolArray = Array.from({ length: 8 }, (_, index) => (i8 & (1 << index)) !== 0);
    return boolArray as FixedLengthArray<boolean, 8>;
}

function boolArrayToI8(boolArray: FixedLengthArray<boolean, 8>): number {
    // Convert a boolean[8] array to an 8-bit integer
    return boolArray.reduce((acc, bit, index) => acc | (bit ? 1 << index : 0), 0);
}

it("should correctly convert between i8 and boolean[8]", () => {
    for (let i = 0; i < 256; i++) {
        const boolArray = i8ToBoolArray(i);
        const resultI8 = boolArrayToI8(boolArray);
        expect(resultI8).toBe(i);
    }
});

function testBitwiseOperation(operationName: string, operand: [boolean, boolean, boolean], bitwiseFunc: (a: number, b: number) => number) {
    it(operationName, () => {
        for (let i = 0; i < 256; i++) {
            for (let j = 0; j < 256; j++) {
                const input1 = i8ToBoolArray(i); // Convert i to boolean[8]
                const input2 = i8ToBoolArray(j); // Convert j to boolean[8]
                const expectedI8 = bitwiseFunc(i, j); // Perform the bitwise operation on integers
                const expected = i8ToBoolArray(expectedI8); // Convert result to boolean[8]
                expect(Modules["ALU"].func(...operand, ...input1, ...input2)).toEqual(expected);
            }
        }
    });
}

describe("ALU", () => {
    const operand: [boolean, boolean, boolean][] = [
        [false, false, false],
        [true, false, false],
        [false, true, false],
        [true, true, false],
        [false, false, true],
        [true, false, true],
    ];

    testBitwiseOperation("OR", operand[0], (a, b) => a | b);
    testBitwiseOperation("NAND", operand[1], (a, b) => ~(a & b));
    testBitwiseOperation("NOR", operand[2], (a, b) => ~(a | b));
    testBitwiseOperation("AND", operand[3], (a, b) => a & b);
    testBitwiseOperation("ADD", operand[4], (a, b) => a + b);
    testBitwiseOperation("SUB", operand[5], (a, b) => a - b);

});